import "./lista-productos.css";
import { Link } from "react-router-dom";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { productoSelector } from "../../../storage/selector/producto-selector";
import { useEffect } from "react";
import { UserState } from "../../../storage/atom/usuario.atom";
import { NotFoundProducts } from "./not-found-products";
import { ClienteState } from "../../../storage/atom/cliente.atom";
import axios from "axios";
import { useState } from "react";

export const ListaProductos = ({ admin }) => {
  const productosIniciales = useRecoilValue(productoSelector);
  const [productos, setProds] = useState(productosIniciales);
  const refresh = useRecoilRefresher_UNSTABLE(productoSelector);
  // const [usuario, setUsuario] = useRecoilState(UserState);
  // const [cliente, setCliente] = useRecoilState(ClienteState);
  // console.info("Soy el átomo usuario -> :");
  // console.info(usuario);
  // console.info("Soy el átomo de cliente -> ")
  // console.info(cliente);

  

  const onStatusChangeClick = (data) => {
    axios
      .put("http://localhost:8069/producto/estado/" + data.codigo)
      .then(() => {
        setProds(
          productos.map((prod) =>
            prod.codigo === data.codigo
              ? { ...data, estado: !data.estado }
              : prod
          )
        );
      });
    //TODO: Si retorna un error, no setear prods
  };


  return (
    <>
      {productosIniciales.length === 0 ? (
        <div className="pl-60 justify-self-center text-center">
          <h1 className="text-3xl font-extrabold mb-20 text-[#97BF04]">
            No Se Encontraron Productos
          </h1>
          <NotFoundProducts width={430} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {productos.map(
            (producto) =>
              (admin ? true : producto.estado) && (
                <div key={producto.codigo}>
                  <div
                    className={
                      "card-producto " + (admin ? "" : "hover:brightness-95")
                    }
                  >
                    <Link
                      to={
                        admin
                          ? "/admin/producto/" + producto.codigo
                          : "/producto/" + producto.codigo
                      }
                    >
                      <img
                        className="rounded-t-lg h-64 object-cover w-full border-b-2"
                        src={producto.imagen}
                        alt=""
                      />
                    </Link>
                    <div className="p-4">
                      <Link
                        to={
                          admin
                            ? "/admin/producto/" + producto.codigo
                            : "/producto/" + producto.codigo
                        }
                      >
                        <h5 className="mb-2 font-semibold text-xl truncate tracking-tight text-gray-900 ">
                          {producto.descripcion}
                        </h5>
                      </Link>
                      <p className="mb-1 font-normal text-gray-700 ">
                        <b>Precio:</b> {producto.precio.toFixed(2)}
                      </p>
                    </div>
                    {admin ? (
                      <div className="w-full px-2 mb-2 justify-center object-center">
                        <button
                          className={
                            "w-full " +
                            (producto.estado ? "buttons-red" : "buttons")
                          }
                          onClick={() => onStatusChangeClick(producto)}
                        >
                          {producto.estado ? "Inhabilitar" : "Habilitar"}
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};
