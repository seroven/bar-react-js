import { atom } from "recoil";

export const VideosGuiasState =  atom({
    key: "videosGuiasState",
    default: [],
    // está compuesto por objetos con este formato:
    // {
    //     titulo: "¿Cómo puedo registrar un producto?",
    //     url: "[link de youtube]"
    // }
});