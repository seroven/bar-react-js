import axios from "axios";
import { selector, useRecoilState } from "recoil";
import { FechaEveState } from "../atom/evento-atom/fechaeve.atom";
import { FechaOneState } from "../atom/evento-atom/fechauno.atom";

export const eventoSelector = selector({
    key: "eventSelector",
    get: async ({ get }) => {
        const fechas = get(FechaEveState);
        const fechaone = get(FechaOneState);

        let eventos = [];

        

        if (fechas) {
            eventos = await axios.post("http://localhost:8069/evento/buscar", {
                fecha_inicio: fechas.fecha_inicio,
                fecha_final: fechas.fecha_final,
            })
            eventos = eventos.data;
        } else if (fechaone) {
            eventos = await axios.get(`http://localhost:8069/evento/fecha/${fechaone}`);
            eventos = eventos.data;
        }
        eventos = await axios.get("http://localhost:8069/evento/listar");
        eventos = eventos.data;

        console.log(eventos);
        return eventos;
    },
});
