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

        console.log(fechas);
        console.log(fechaone);

        if (fechas) {
            console.log(fechas);
            eventos = await axios.post("http://localhost:8069/evento/buscar", {
                fecha_inicio: fechas.fecha_inicio,
                fecha_final: fechas.fecha_final,
            })
            eventos = eventos.data;
        } else if (fechaone) {
            eventos = await axios.get(`http://localhost:8069/evento/fecha/${fechaone}`);
            if(eventos.data===""){
                eventos=[];
            }else{
                eventos = [eventos.data];
            }
        }else{
            eventos = await axios.get("http://localhost:8069/evento/listar");
            eventos = eventos.data;
        }

        if(eventos===null){
            eventos = [];
        }

        console.log(eventos);
        return eventos;
    },
});
