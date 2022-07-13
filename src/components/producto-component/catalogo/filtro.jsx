import axios from "axios";
import "./filtro.css";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { buscarState } from "../../../storage/atom/buscar.atom";
import { categoriaIdState, categoriaState} from "../../../storage/atom/categoria.atom";
import { marcaIdState, marcaState } from "../../../storage/atom/marca.atom";

export const Filtro = () => {
  const setIdCategoria = useSetRecoilState(categoriaIdState);
  const setIdMarca = useSetRecoilState(marcaIdState);
  const setBuscar = useSetRecoilState(buscarState);
  const [categorias, setCategorias] = useRecoilState(categoriaState);
  const [marcas, setMarcas] = useRecoilState(marcaState);

  useEffect(() => {
    axios.get("http://localhost:8069/categoria/all").then((res) => {
      setCategorias(res.data.map(c => {return {...c, visible: true }}));
    });
  }, []);

  const getBrandsByCategories = (id) => {
    axios.get(`http://localhost:8069/marca/byCategory/${id}`)
    .then((res) => {
      setMarcas(res.data.map(m => {return {...m, visible: true}}));
    })
  }

  const onCategoriaSelected = (e, id) => {
    if (e.target.checked) {
      setIdCategoria(id);
      setCategorias(categorias.map(c => c.codigo == id ? c : {...c, visible: false}));
      getBrandsByCategories(id);
    } else {
      setIdCategoria("");
      setCategorias(categorias.map(c => {return {...c, visible: true}}));
      setMarcas([]);
      setIdMarca("");
    }
    setBuscar("");
  };

  const onMarcaSelected = (e, id) => {

    if (e.target.checked){
      setIdCategoria("");
      setIdMarca(id);
      setMarcas(marcas.map(m => m.codigo == id ? m : {...m, visible: false}));
      
    } else{
      setIdMarca("");
      setMarcas(marcas.map(m => {return {...m, visible: true}}));
      setIdCategoria(categorias.find(c => c.visible == true).codigo);
    }
    setBuscar("");
  }


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
      <div id = "listCategorias">

        {categorias.map((categoria) => (
          categoria.visible &&
          <div key={categoria.codigo} className="flex items-center mb-1">
            <input
              id={categoria.codigo}
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
      </div>

        {
          marcas.filter(m => m.visible == true).length > 0 &&
          <div className="text-3xl mt-4 font-medium text-slate-600 mb-3">
          Marcas
        </div>
        }
      
        {
          marcas.map((marca) => (
            marca.visible &&
            <div key={marca.codigo} className="flex items-center mb-1">
              <input id="" type="checkbox" value="" className="w-4 h-4" onChange={(event) => onMarcaSelected(event, marca.codigo)}/>
              <label
                htmlFor="default-checkbox"  
                className="ml-2 text-xl text-gray-900"
              >
                {marca.nombre}
              </label>
            </div>
                

          ))
        }
    </div>
  );
};
