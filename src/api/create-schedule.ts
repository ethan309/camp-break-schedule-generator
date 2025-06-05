import { prepareGroup } from "./prepare-group";
import { transpose } from "./transpose";

export function createSchedule(
    groups: string[][],
    shiftCount: number
): [string[][], string[]] {
    const halfway = Math.floor(groups.length / 2);
    let aGroups = groups
        .slice(0, halfway)
        .map((g, index) => prepareGroup(g, index));
    let bGroups = groups
        .slice(halfway)
        .map((g, index) => prepareGroup(g, index));

    const breakShiftAssignments: string[][] = [];

    const evenRows = transpose(aGroups);
    const oddRows = transpose(bGroups);

    let shift = 0;
    while (shift < shiftCount && (evenRows.length > 0 || oddRows.length > 0)) {
        if (shift % 2 === 0) {
            const nextA = evenRows.shift();
            if (nextA && nextA.length > 0) {
                breakShiftAssignments.push(nextA.filter((a) => !!a));
            }
        } else {
            const nextB = oddRows.shift();
            if (nextB && nextB.length > 0) {
                breakShiftAssignments.push(nextB.filter((b) => !!b));
            }
        }
        shift++;
    }

    return [
        breakShiftAssignments,
        [
            ...evenRows.reduce<string[]>(
                (allRows, row) => [...allRows, ...row],
                []
            ),
            ...oddRows.reduce<string[]>(
                (allRows, row) => [...allRows, ...row],
                []
            ),
        ],
    ];
}
