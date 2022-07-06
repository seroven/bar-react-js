import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Filtro } from "./filtro";
import { ListaProductos } from "./lista-productos";
import { CatalagoSkeleton } from "./skeleton";

export const Catalago = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const obtenerProductos = async () => {
      await axios.get("http://localhost:8069/producto/all");
      setIsLoading(false);
    };
    obtenerProductos();
  }, []);

  if (isLoading) {
    return <CatalagoSkeleton />;
  }
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-medium text-4xl text-center md:text-left">
            {user ? "Listado de Productos" : "Catalogo de Productos"}
          </h1>
          {user ? (
            <Link to="/producto/registro">
              <div className="buttons-yellow py-2 px-8">Registrar</div>
            </Link>
          ) : null}
        </div>
        <div className="flex gap-5 container mx-auto mt-5">
          <Filtro />
          <ListaProductos />
        </div>
      </div>
    </div>
  );
};
