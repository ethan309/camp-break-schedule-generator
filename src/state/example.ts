import { atom } from "recoil";

const initialValue = { value: "" };

export const Example = atom({
    key: "_",
    default: initialValue,
});
