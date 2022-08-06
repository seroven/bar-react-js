import axios from "axios";
import { selector } from "recoil";

export const eventoSelector = selector({
  key: "eventSelector",
  get: async () => {
    let eventos = [];

    eventos = await axios.get("http://localhost:8069/evento/listar");
    eventos = eventos.data;

    console.log(eventos);
    return eventos;
  },
});
