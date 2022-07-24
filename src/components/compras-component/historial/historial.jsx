import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ClienteState } from "../../../storage/atom/cliente.atom";
import { UserState } from "../../../storage/atom/usuario.atom";
import "./historial.css";

export const Historial = () => {
  const cliente = useRecoilValue(ClienteState);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get("http://localhost:8069/pedido/all/" + cliente?.codigo)
      .then((response) => setPedidos(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex gap-5">
      <div className="relative md:mt-10 ">
        <h1 className="font-medium text-4xl text-center md:text-left text-[#022601]">
          Mis Pedidos
        </h1>
        {pedidos.map((pedido) => (
          <div
            key={pedido.cod_pedido}
            className="border-2 border-[#97BF04] p-2 my-5"
          >
            <div className="grid gap-x-20 grid-cols-3 px-20 my-5 h-[50%]">
              <div className="col-span-2 border-2 border-[#97BF04]">
                <h2 className="font-medium text-xl p-2 px-8 text-[#97BF04] text-center">
                  N° Pedido: {pedido.cod_pedido}
                </h2>
              </div>
              <Link to={"/pedido/detalle/" + pedido.cod_pedido}>
                <button
                  type="submit"
                  className="font-medium text-xl p-2 px-8 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
                >
                  Ver Detalle
                </button>
              </Link>
            </div>
            <div className="grid gap-x-20 grid-cols-3 px-20 my-5 h-[50%]">
              <div className="relative mt-2 rounded">
                <p className="py-2 pr-3 pl-10 w-full ">
                  <b>Fecha de Solicitud:</b> {pedido.fecha_solicitud}
                </p>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" h-6 w-6 mx-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-2 rounded">
                <p className="py-2 pr-3 pl-10 w-full">
                  <b>Fecha de Envío:</b> {pedido.fecha_envio}
                </p>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" h-6 w-6 mx-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-2 rounded">
                <p className="py-2 pr-3 pl-10 w-full">
                  <b>Precio Total: s/.</b> {pedido.precio_total}
                </p>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
