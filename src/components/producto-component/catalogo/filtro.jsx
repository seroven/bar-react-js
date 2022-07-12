import axios from "axios";
import "./filtro.css";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { buscarState } from "../../../storage/atom/buscar.atom";
import { categoriaState } from "../../../storage/atom/categoria.atom";

export const Filtro = () => {
  const setCategoria = useSetRecoilState(categoriaState);
  const setBuscar = useSetRecoilState(buscarState);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8069/categoria/all").then((res) => {
      setCategorias(res.data);
    });
  }, []);

  const onCategoriaSelected = (e, id) => {
    if (e.target.checked == true) {
      setCategoria(id);
    } else {
      setCategoria("");
    }
    setBuscar("");
  };

  return (
    <div className="filtro">
      <div className="text-3xl font-medium text-slate-600 mb-3">Precios</div>
      <div className="flex flex-row flex-wrap justify-between">
        <input
          className="w-32 rounded-md border-2 px-4 py-1 my-2 text-center border-green-700 outline-none"
          placeholder="desde"
        />
        <span className="text-2xl font-medium text-slate-600 mx-3">-</span>
        <input
          className="w-32 rounded-md border-2 px-4 py-1 my-2 text-center border-green-700 outline-none"
          placeholder="hasta"
        />
      </div>

      <br />

      <div className="text-3xl font-medium text-slate-600 mb-3">Categorías</div>
      {categorias.map((categoria) => (
        <div key={categoria.codigo} className="flex items-center mb-1">
          <input
            id=""
            type="checkbox"
            value=""
            className="w-4 h-4"
            onChange={(event) => onCategoriaSelected(event, categoria.codigo)}
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-xl text-gray-900"
          >
            {categoria.nombre}
          </label>
        </div>
      ))}

      <div className="text-3xl mt-4 font-medium text-slate-600 mb-3">
        Marcas
      </div>
      <div className="flex items-center mb-1">
        <input id="" type="checkbox" value="" className="w-4 h-4" />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-xl text-gray-900"
        >
          Categoria
        </label>
      </div>
    </div>
  );
};
