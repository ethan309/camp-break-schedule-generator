import { atom } from "recoil";

const initialValue: string[][] = [[]];

export const Groups = atom({
    key: "Groups",
    default: initialValue,
});
