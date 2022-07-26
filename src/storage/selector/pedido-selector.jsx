import axios from "axios";
import { selector, useRecoilState } from "recoil";
import { NroPedidoState } from "../atom/pedido-atom/nro-pedido.atom";
import { PedidoState } from "../atom/pedido-atom/pedido.atom";

export const PedidoSelector = selector({
  key: "pedidoSelector",
  get: async ({ get }) => {
    const nroPedido = get(NroPedidoState);
    const listPedidos = get(PedidoState);
    
    
    let pedidos = [];
    // null === false
    if (nroPedido) {
        console.log(listPedidos);
        pedidos = await axios.get(`http://localhost:8069/pedido/buscar/${nroPedido}`);
        pedidos = pedidos.data;
    } else {
        pedidos = listPedidos;
    }
    return pedidos;
  },
});
