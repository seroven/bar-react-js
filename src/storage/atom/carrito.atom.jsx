import { atom } from "recoil";
import { localStorageEffects } from "./effects";

export const carritoState = atom({
  key: "carritoState",
  default: [],
  effects: [localStorageEffects("carrito")],
});
