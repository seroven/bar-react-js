import React from "react";
import "./carrito.css";
import { DetalleCantidad } from "../../producto-component/detalle/detalle-cantidad";
import { useState } from "react";
import { PedidoModalRegistro } from "./modal-pedido";
import { ModalConfirmacionPedido } from "./modal-conf-pedido";
import { ModalInformacionPedido } from "./modal-info-pedido";
import { useRecoilState, useRecoilValue } from "recoil";
import { carritoState } from "../../../storage/atom/carrito.atom";
import { UserState } from "../../../storage/atom/usuario.atom";
import { Link, useNavigate } from "react-router-dom";

export const CarritoCompras = () => {
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
  const [modalInformativo, setModalInformativo] = useState(false); // Mensaje informativo sobre dirección del bar
  const [modalConfirmacion, setModalConfirmacion] = useState(false); // En caso sea la primera vez que el cliente ingresa sus datos
  const [carrito, setCarrito] = useRecoilState(carritoState);
  const usuario = useRecoilValue(UserState);
  const navigate = useNavigate();

  const actualizarCarrito = (codigo_producto, cant) => {
    const nuevoCarrito = carrito.map(p => p.codigo === codigo_producto ? {...p, cantidad: cant} : p);
    setCarrito(nuevoCarrito );
  }

  const increment = (codigo, cantidad) => {
    if (cantidad === 100) return;
    console.log(codigo);
    actualizarCarrito(codigo, cantidad +1);
  }

  const decrement = (codigo, cantidad) => {
    if (cantidad === 1) return;
    console.log(codigo);
    actualizarCarrito(codigo, cantidad-1);
  }

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach((item) => (total += item.cantidad * item.precio));
    return total;
  };

  const quitarProducto = (codigo) => {
    setCarrito(carrito.filter(item => item.codigo != codigo));
  }

  return (
    <>
      <div
        className={
          modalRegistroVisible || modalInformativo || modalConfirmacion
            ? "blur-md"
            : ""
        }
      >
        <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
          Carrito de Compras
        </h1>
        <br />
        <div className="carrito">
          <div className="items">
            {carrito.map((item) => {
              return (
                <>
                  <div className="item-carrito">
                    <div className="h-full overflow-hidden rounded-xl">
                      <Link to = {"/producto/" + item.codigo}>
                        <img className="w-full object-cover" src={item.imagen} />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-xl">
                        {item.descripcion}
                      </span>
                    </div>
                    <div className="flex flex-col justify-around h-[70%] self-center">
                      <div className="flex flex-row justify-between">
                        <span className="font-medium text-xl">Precio: </span>
                        <span className="text-xl">S/. {item.precio}</span>
                      </div>
                      <div className="flex flex-row justify-between">
                        <span className="font-medium text-xl">Cantidad: </span>
                        <div className="flex font-mono font-semibold bg-[#97BF04] rounded-[1.2rem] justify-between items-center flex-row w-[40%] text-white text-xl px-3 h-8">
                          <button onClick={e => decrement(item.codigo, item.cantidad)}> - </button>
                          <label>{item.cantidad}</label>
                          <button onClick={e => increment(item.codigo, item.cantidad)}> + </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-around items-center ">
                      <div className="text-2xl">
                        <div className="text-center">
                          <span className="font-bold">Total: </span>
                          <span>S/. {item.precio * item.cantidad}</span>
                        </div>
                        <span className="text-xl my-3 block text-center text-[#618C03] underline">
                          Mover para Después
                        </span>
                      </div>
                    </div>

                    {/* Botón para quitar el item  */}
                    <div className="absolute right-0 top-0">
                      <button onClick={e => quitarProducto(item.codigo)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#D04444"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="border-l border-black h-full flex flex-col justify-center items-center text-center">
            <span className=" font-semibold tracking-widest">
              COSTO
              <br />
              TOTAL
            </span>
            <span className="font-semibold text-5xl mt-2 mb-6">
              S/. {calcularTotal()}
            </span>
            <button
              className="bg-[#618C03] py-3 px-9 text-white font-semibold text-2xl rounded-xl shadow-md shadow-gray-400"
              onClick={(e) => {usuario.codigo === 0 ? navigate("/acceso/login") :setModalRegistroVisible(true)}}
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>
      <PedidoModalRegistro
        modalVisible={modalRegistroVisible}
        setModalVisible={setModalRegistroVisible}
        setModalInformativo={setModalInformativo}
        setModalConfirmacion={setModalConfirmacion}
      />
      <ModalConfirmacionPedido
        modalVisible={modalConfirmacion}
        setModalVisible={setModalConfirmacion}
        setModalInformativo={setModalInformativo}
      />
      <ModalInformacionPedido
        modalVisible={modalInformativo}
        setModalVisible={setModalInformativo}
      />
    </>
  );
};
