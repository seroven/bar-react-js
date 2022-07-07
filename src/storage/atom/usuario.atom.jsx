import { atom } from "recoil";
import { localStorageEffects } from "./effects";

export const UserState = atom({
  key: "userState",
  default: null,
  effects: [localStorageEffects("usuario_bar")],
});
