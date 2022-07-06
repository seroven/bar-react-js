import "./lista-productos.css";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { productoSelector } from "../../../storage/selector/producto-selector";
import { useState } from "react";

export const ListaProductos = () => {
  const productos = useRecoilValue(productoSelector);
  const [user, setUser] = useState(true);

  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {productos.map((producto) => (
        <>
          <div
            className={"card-producto " + (!user ? "hover:brightness-95" : "")}
          >
            <Link to={"/" + producto.codigo} key={producto.codigo}>
              <img
                className="rounded-t-lg h-64 object-cover w-full border-b-2"
                src={producto.imagen}
                alt=""
              />
            </Link>
            <div className="p-4">
              <Link to={"/" + producto.codigo}>
                <h5 className="mb-2 font-semibold text-xl truncate tracking-tight text-gray-900 ">
                  {producto.descripcion}
                </h5>
              </Link>
              <p className="mb-1 font-normal text-gray-700 ">
                <b>Precio:</b> {producto.precio.toFixed(2)}
              </p>
            </div>
            {user ? (
              <div className="w-full px-2 mb-2 justify-center object-center">
                <button
                  className={
                    "w-full " + (producto.estado ? "buttons-red" : "buttons")
                  }
                >
                  {producto.estado ? "Inhabilitar" : "Habilitar"}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ))}
    </div>
  );
};
