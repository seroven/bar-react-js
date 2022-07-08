import { atom } from "recoil";

export const TempUserState = atom({
    key: "tempUserState",
    default: {
        email: "",
        password: ""
    }
})


