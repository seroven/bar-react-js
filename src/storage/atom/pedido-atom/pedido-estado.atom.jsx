import { atom } from "recoil";

export const PedidoEstadoState = atom({
    key: "pedidoEstadoState",
    default: {
        codigo: 0,
        estado: {
            codigo: 0,
            nombre: ""
        }
    }
})