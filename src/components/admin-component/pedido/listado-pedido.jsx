import "./listado.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiltroPedido } from "./filtro-pedido";
import { useRecoilState, useRecoilValue } from "recoil";
import { PedidoEstadoState } from "../../../storage/atom/pedido-atom/pedido-estado.atom";
import { PedidoSelector } from "../../../storage/selector/pedido-selector";
import { NroPedidoState } from "../../../storage/atom/pedido-atom/nro-pedido.atom";

export const ListadoPedido = () => {
  const pedidoSelector = useRecoilValue(PedidoSelector);
  const [pedidoEstado, setPedidoEstado] = useRecoilState(PedidoEstadoState);
  const [estados, setEstados] = useState([]);

  const onActualizarChange = async (e, p) => {

    setPedidoEstado({
      codigo: p.cod_pedido,
      estado: {
        codigo: parseInt(e.target.value),
        nombre: e.target.selectedOptions[0].innerText,
      }
    })
  };

  useEffect(() => {

    const obtenerEstados = async () => {
      const est = "http://localhost:8069/estado/all";
      const res = await axios.get(est);
      setEstados(res.data);
      console.log(res.data);
    };
    obtenerEstados();
    
  }, []);

  const getClassColor = (estado) => {
    switch (estado) {
      case 1:
        return "color-pendiente";
      case 2:
        return "color-postergado";
      case 3:
        return "color-entregado";
      case 4:
        return "color-anulado";
    }
  };

  return (
    <>
      <div className="tabla-listado ">
        <div className="orden-tabla tabla-encabezado">
          <div className="border-r-2">N° de Pedido</div>
          <div className="border-r-2">Cliente</div>
          <div className="border-r-2">Dni del Cliente</div>
          <div className="border-r-2">Dni del Encargado de Recoger</div>
          <div className="border-r-2">Costo Total</div>
          <div className="border-r-2">Fecha de Recojo</div>
          <div className="border-r-2">Estado</div>
          <div>Detalle</div>
        </div>
        <div className="h-[60vh] overflow-auto">
          {pedidoSelector?.map((p) => {
            return (
              <div className="orden-tabla item-contenido">
                <div className="border-r-2">N° {p.cod_pedido}</div>
                <div className="border-r-2">
                  {p.cliente.nombre} {p.cliente.apPaterno}
                </div>
                <div className="border-r-2">{p.cliente.dni}</div>
                <div className="border-r-2">{p.dni_recibidor}</div>
                <div className="border-r-2">S/. {p.precio_total}</div>
                <div className="border-r-2">{p.fecha_envio}</div>
                <div className="border-r-2">
                  <select
                    className={"lista-estado " + getClassColor(p.estado.codigo)}
                    onChange={(e) => onActualizarChange(e, p)}
                  >
                    {estados.map((estado) => (
                      <option
                        key={estado.codigo}
                        value={estado.codigo}
                        selected={p.estado.codigo === estado.codigo}
                      >
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                  <Link to = {"detalle/" + p.cod_pedido}>
                    <div>
                      <button className="boton-detalle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </Link>
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
