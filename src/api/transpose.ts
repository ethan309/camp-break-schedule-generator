export function transpose(arrayOfArrays: string[][]) {
    const original = arrayOfArrays.slice();

    const result = original.reduce<string[][]>((r, a, i, { length }) => {
        const r2 = r.slice();
        a.forEach((v, j) => {
            r2[j] = r2[j] ?? new Array(length).fill(null);
            r2[j][i] = v;
        });
        console.log({ r, r2 });
        return r2;
    }, []);

    return result;
}
