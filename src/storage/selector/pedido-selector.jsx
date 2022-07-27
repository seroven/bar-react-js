import axios from "axios";
import { selector, useRecoilState } from "recoil";
import { NroPedidoState } from "../atom/pedido-atom/nro-pedido.atom";
import {
  PedidoEstadoState,
} from "../atom/pedido-atom/pedido-estado.atom";
import { dniPedidoState } from "../atom/pedido-atom/dni.atom";
import { estadoPedidoState } from "../atom/pedido-atom/estado.atom";

export const PedidoSelector = selector({
  key: "pedidoSelector",
  get: async ({ get }) => {
    const nroPedido = get(NroPedidoState);
    const pedidoEstado = get(PedidoEstadoState);
    const dniPedido = get(dniPedidoState);
    const estadoPedido = get(estadoPedidoState);

    let pedidos = [];

    if (pedidoEstado.codigo !== 0) {
      await axios.put("http://localhost:8069/pedido/estado/" + pedidoEstado.codigo, {
        codigo: pedidoEstado.estado.codigo,
        nombre: pedidoEstado.estado.nombre,
      });
    }

    if (nroPedido) {
      pedidos = await axios.get(
        `http://localhost:8069/pedido/buscar/${nroPedido}`
      );
      pedidos = pedidos.data;
    } else if(dniPedido){
      pedidos = await axios.get(
        `http://localhost:8069/pedido/dni/${dniPedido}`
      );
      pedidos = pedidos.data;

    // }else if(estadoPedido){
    //   pedidos = await axios.get(
    //     `http://localhost:8069/pedido/estadox/${estadoPedido}`
    //   );
    //   pedidos = pedidos.data;
    }else{
      pedidos = await axios.get("http://localhost:8069/pedido/all");
      pedidos = pedidos.data;
    }
    return pedidos;
  },
});
