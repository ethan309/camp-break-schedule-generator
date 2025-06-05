export function prepareGroup(array: string[], skips: number = 1) {
    if (array.length < 2) {
        return array.slice();
    }

    if (array.length === 3) {
        if (skips % 2 === 0) {
            return [array[1], array[0], array[2]];
        }
        return [array[1], array[2], array[0]];
    }

    if (array.length === 4) {
        if (skips % 2 === 0) {
            return [array[1], array[3], array[0], array[2]];
        }
        return [array[1], array[2], array[3], array[0]];
    }

    if (array.length === 5) {
        if (skips % 2 === 0) {
            return [array[1], array[3], array[4], array[0], array[2]];
        }
        return [array[1], array[2], array[3], array[4], array[0]];
    }

    return array.slice().reverse();
}
