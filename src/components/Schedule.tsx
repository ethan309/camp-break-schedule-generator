import { Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Groups } from "../state/groups";
import { useCallback, useEffect, useMemo } from "react";
import { createSchedule } from "../api/create-schedule";
import { useNavigate } from "react-router-dom";

const totalShifts = 8;

const Schedule = () => {
    const groups = useRecoilValue(Groups);
    const resetGroups = useResetRecoilState(Groups);
    const leaderCount = useMemo(
        () =>
            groups.reduce<number>(
                (total, currentGroup) => total + currentGroup.length,
                0
            ),
        [groups]
    );

    const [scheduleShifts, unassigned] = useMemo(
        () => createSchedule(groups, totalShifts),
        [groups]
    );

    const navigate = useNavigate();
    const onReset = useCallback(() => {
        resetGroups();
        navigate("/", { replace: true });
    }, [resetGroups, navigate]);

    useEffect(() => {
        if (groups.length === 0 || groups[0].length === 0) {
            onReset();
        }
    }, [groups, onReset]);

    return (
        <Stack>
            <Heading>Break Schedule</Heading>
            <Text>
                Generated schedule for {leaderCount} leaders with {totalShifts}{" "}
                overlapping shifts starting every 15 minutes...
            </Text>

            <Heading size="md">Break Schedule</Heading>
            {scheduleShifts.map((shift, index) => (
                <Text key={index}>
                    Shift {index + 1}: {shift.join(" | ")}
                </Text>
            ))}

            {unassigned.length > 0 && (
                <>
                    <Heading size="md">Unassigned</Heading>
                    {unassigned.map((u) => (
                        <Text key={u}>{u}</Text>
                    ))}
                </>
            )}

            <Button mt="auto" mx={1} mb={2} onClick={onReset}>
                Reset
            </Button>
            <Link
                fontSize="sm"
                href="https://master.d2fa7ppq7csc40.amplifyapp.com"
                textDecor="underline"
                color="teal"
            >
                Want more Camp Vertical? Check out the "which activity group are
                you?" quiz.
            </Link>
        </Stack>
    );
};

export default Schedule;
