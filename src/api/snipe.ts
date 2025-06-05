function isUndefined(x: any): x is undefined {
    return x === undefined || typeof x === "undefined";
}

/**
 * Remove an element at a given index from an array (and optionally replace it).
 * @param array the original array.
 * @param index the index within the array at which to remove an element.
 * @param replacement a new element to replace the removed item.
 * @returns the array with the element at the specified index removed (and possibly replaced).
 */
export function snipe<T>(
    array: T[],
    targetIndex: number,
    replacement?: T
): T[] {
    if (targetIndex < 0 || targetIndex >= array.length) {
        return array.slice();
    }
    if (isUndefined(replacement)) {
        if (targetIndex === array.length - 1) {
            return array.slice(0, targetIndex);
        }
        return [
            ...array.slice(0, targetIndex),
            ...array.slice(targetIndex + 1),
        ];
    }
    if (targetIndex === array.length - 1) {
        return [...array.slice(0, targetIndex), replacement];
    }
    return [
        ...array.slice(0, targetIndex),
        replacement,
        ...array.slice(targetIndex + 1),
    ];
}
