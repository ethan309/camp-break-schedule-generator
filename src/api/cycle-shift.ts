export function cycleShift(array: string[], cycles: number = 0) {
    if (cycles <= 0) {
        return array.slice();
    }

    let c = cycles % array.length;

    const mutated = array.slice();

    for (let i = 0; i < c; i++) {
        const first = mutated.shift();

        if (first) {
            mutated.push(first);
        }
    }

    return mutated.slice();
}
