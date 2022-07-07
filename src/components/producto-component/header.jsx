import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { HCliente } from "./h-cliente";
import "./header.css";

export const Header = ({admin}) => {
  const [user, setUser] = useState(true);

  return (
    <nav className="nav">
      <div className="nav-position">
        <Link to="/">
          <div className="flex items-center space-x-5">
            <img
              src="https://placekitten.com/1200/1200"
              className="mr-3 w-16 h-16 sm:h-16 rounded-full"
            />
            <span className="self-center font-mono text-3xl font-semibold whitespace-nowrap dark:text-white">
              Bar La China
            </span>
          </div>
        </Link>
        {!admin ? (
          <HCliente />
        ) : (
          <>
            <ul className="flex flex-col text-white mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-md md:font-medium pr-2">
              <li className="buttons lg:px-10 px-5">
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 border-b border-gray-100  md:border-0 md:p-0 "
                >
                  Pedidos
                </Link>
              </li>
              <li className="buttons lg:px-10 px-5">
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 border-b border-gray-100  md:border-0 md:p-0 "
                >
                  Productos
                </Link>
              </li>
              <li className="buttons lg:px-10 px-5">
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 border-b border-gray-100  md:border-0 md:p-0"
                >
                  Eventos
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};
