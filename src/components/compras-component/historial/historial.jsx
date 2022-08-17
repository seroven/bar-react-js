import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClienteState } from "../../../storage/atom/cliente.atom";
import { PedidosClienteState } from "../../../storage/atom/pedidos-cliente.atom";
import { UserState } from "../../../storage/atom/usuario.atom";
import "./historial.css";

export const Historial = () => {
  const cliente = useRecoilValue(ClienteState);
  const [pedidos, setPedidos] = useRecoilState(PedidosClienteState);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8069/pedido/all/" + cliente?.codigo)
      .then((response) => {
        setPedidos(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <img
        src="../../../../src/public/mispedidos-banner.jpeg"
        className="object-cover object-center h-[32rem] w-full"
      />

      <div className="p-8 container mx-auto mt-5">
        <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
          Mis Pedidos
        </h1>

        <div className="tabla-listado-user ">
          <div className="orden-tabla-user tabla-encabezado-user">
            <div className="border-r-2">N° de Pedido</div>
            <div className="border-r-2">Fecha de Recojo</div>
            <div className="border-r-2">Costo Total</div>
            <div className="border-r-2">Cantidad de <br/> Productos</div>
            <div>Detalle</div>
          </div>
          <div className="h-[60vh] overflow-auto">
            {
              pedidos.map(p => {
              return <div className="orden-tabla-user item-contenido-user">
                <div className="border-r-2">N° {p.cod_pedido}</div>
                <div className="border-r-2">{p.fecha_envio}</div>
                <div className="border-r-2">S/. {p.precio_total}</div>
                <div className="border-r-2">{p.productos.length}</div>
                <Link to={"/pedido/detalle/"+p.cod_pedido}>
                  <div>
                    <button className="boton-detalle-user">
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
              })
            }
          </div>
        </div>

      </div>
    </>
  );
};
