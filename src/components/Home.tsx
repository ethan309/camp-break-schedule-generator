import {
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Groups } from "../state/groups";
import GroupRow from "./GroupRow";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [groups, setGroups] = useRecoilState(Groups);

    const [inputLine, setInputLine] = useState("");
    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ target: { value } }) => setInputLine(value),
        [setInputLine]
    );

    const onAddName = useCallback(() => {
        setGroups((gs) => {
            const gIndex = gs.length - 1;
            const newName = inputLine.trim();
            return [
                ...gs.slice(0, gIndex),
                [...(gs.at(gIndex) ?? []), newName],
            ];
        });
        setInputLine("");
    }, [inputLine, setGroups]);

    const onAddGroup = useCallback(() => {
        setGroups((gs) => [...gs, []]);
        setInputLine("");
    }, [setGroups]);

    const isNameConflicting = useMemo(
        () =>
            inputLine.trim().length > 0 &&
            groups.length > 0 &&
            groups.some((names) =>
                names
                    .map((n) => n.toLowerCase().trim())
                    .includes(inputLine.toLowerCase().trim())
            ),
        [groups, inputLine]
    );

    const isGroupEmpty = useMemo(
        () => groups.length > 0 && groups[groups.length - 1].length === 0,
        [groups]
    );

    const navigate = useNavigate();
    const onGenerateSchedule = useCallback(
        () => navigate("/schedule", { replace: true }),
        [navigate]
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const onKeydown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
        (target) => {
            if (target.code === "Enter" && !isNameConflicting) {
                if (
                    target.shiftKey &&
                    inputLine.trim().length === 0 &&
                    !isGroupEmpty
                ) {
                    onAddGroup();
                    inputRef.current?.focus();
                } else if (inputLine.trim().length > 0) {
                    onAddName();
                }
            }
        },
        [inputLine, isNameConflicting, isGroupEmpty, onAddName, onAddGroup]
    );

    return (
        <Stack>
            <HStack justifyContent="space-between" alignItems="start">
                <Heading textAlign="left">Create Break Schedule</Heading>
                <ColorModeSwitcher />
            </HStack>
            <Text textAlign="left" mb={4}>
                Enter names below one at a time.
            </Text>
            <HStack spacing={6} mb={2} mx={2}>
                <InputGroup>
                    <Input
                        value={inputLine}
                        onChange={onChange}
                        onKeyDown={onKeydown}
                        ref={inputRef}
                    />
                    <InputRightElement width="auto">
                        <Tooltip fontSize="x-small" label="or press Enter">
                            <Button
                                size="sm"
                                variant="outline"
                                isDisabled={
                                    inputLine.trim().length === 0 ||
                                    isNameConflicting
                                }
                                onClick={onAddName}
                                mr={1}
                            >
                                New Name
                            </Button>
                        </Tooltip>
                    </InputRightElement>
                </InputGroup>
                <Tooltip fontSize="x-small" label="or press Shift + Enter">
                    <Button
                        variant="outline"
                        isDisabled={
                            inputLine.trim().length > 0 ||
                            isNameConflicting ||
                            isGroupEmpty
                        }
                        onClick={onAddGroup}
                    >
                        New Group
                    </Button>
                </Tooltip>
            </HStack>
            <Stack>
                {groups.map((_, index) => (
                    <GroupRow key={index} groupIndex={index} />
                ))}
            </Stack>
            <Button
                mt="auto"
                mx={1}
                mb={2}
                isDisabled={groups.length === 0 || isGroupEmpty}
                onClick={onGenerateSchedule}
            >
                Generate Schedule
            </Button>
            <Link
                fontSize="sm"
                href="https://github.com/ethan309/camp-break-schedule-generator"
                textDecor="underline"
                color="teal"
            >
                v1.0.0
            </Link>
        </Stack>
    );
};

export default Home;
