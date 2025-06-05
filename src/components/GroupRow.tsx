import { CloseButton, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import NameTag from "./NameTag";
import { useRecoilState } from "recoil";
import { Groups } from "../state/groups";
import { snipe } from "../api/snipe";

interface IProps {
    groupIndex: number;
}

const GroupRow = (props: IProps) => {
    const { groupIndex } = props;

    const [groups, setGroups] = useRecoilState(Groups);
    const names = useMemo(() => groups[groupIndex], [groupIndex, groups]);

    const onRemoveName = useCallback(
        (name: string) =>
            setGroups((gs) => {
                const targetGroupIndex = gs.findIndex((names) =>
                    names.includes(name)
                );
                const targetNameIndex = gs[targetGroupIndex].findIndex(
                    (n) => n === name
                );
                const updatedGroup = snipe(
                    gs[targetGroupIndex],
                    targetNameIndex
                );
                const newGroups = snipe(gs, targetGroupIndex, updatedGroup);
                return newGroups;
            }),
        [setGroups]
    );

    const onRemoveGroup = useCallback(
        () => setGroups((gs) => snipe(gs, groupIndex)),
        [groupIndex, setGroups]
    );

    return (
        <Wrap spacing={3}>
            <CloseButton onClick={onRemoveGroup} />
            <Text>Group {groupIndex + 1}:</Text>
            {names.map((name) => (
                <WrapItem key={name}>
                    <NameTag name={name} onRemove={onRemoveName} />
                </WrapItem>
            ))}
        </Wrap>
    );
};

export default GroupRow;
