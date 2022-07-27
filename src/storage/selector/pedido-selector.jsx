import axios from "axios";
import { selector, useRecoilState } from "recoil";
import { FechaState } from "../atom/pedido-atom/fecha.atom";
import { NroPedidoState } from "../atom/pedido-atom/nro-pedido.atom";
import { PedidoEstadoState } from "../atom/pedido-atom/pedido-estado.atom";
import { dniPedidoState } from "../atom/pedido-atom/dni.atom";
import { estadoPedidoState } from "../atom/pedido-atom/estado.atom";

export const PedidoSelector = selector({
  key: "pedidoSelector",
  get: async ({ get }) => {
    const nroPedido = get(NroPedidoState);
    const fecha = get(FechaState);
    const pedidoEstado = get(PedidoEstadoState);
    const dniPedido = get(dniPedidoState);
    const estadoPedido = get(estadoPedidoState);

    let pedidos = [];

    if (pedidoEstado.codigo !== 0) {
        console.log("estoy actualizando")
      await axios.put(
        "http://localhost:8069/pedido/estado/" + pedidoEstado.codigo,
        {
          codigo: pedidoEstado.estado.codigo,
          nombre: pedidoEstado.estado.nombre,
        }
      );
      return;
    }

    if (nroPedido) {
      pedidos = await axios.get(
        `http://localhost:8069/pedido/buscar/${nroPedido}`
      );
      pedidos = pedidos.data;
    } else if (fecha) {
      pedidos = await axios.post("http://localhost:8069/pedido/fechas", {
        fecha_inicio: fecha.fecha_inicio,
        fecha_final: fecha.fecha_final,
      })
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
