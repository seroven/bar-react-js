import axios from "axios";
import "./filtro.css";
import { useEffect, useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { buscarState } from "../../../storage/atom/buscar.atom";
import { marcaIdState, marcaState } from "../../../storage/atom/marca.atom";
import { Box, Slider } from "@mui/material";
import {
  categoriaIdState,
  categoriaState,
} from "../../../storage/atom/categoria.atom";
import { precioState } from "../../../storage/atom/precio.atom";
import { UserState } from "../../../storage/atom/usuario.atom";
import { productoSelector } from "../../../storage/selector/producto-selector";

export const Filtro = () => {
  const setIdCategoria = useSetRecoilState(categoriaIdState);
  const setIdMarca = useSetRecoilState(marcaIdState);
  const setBuscar = useSetRecoilState(buscarState);
  const refresh = useRecoilRefresher_UNSTABLE(productoSelector);
  const user = useRecoilValue(UserState);
  const [categorias, setCategorias] = useRecoilState(categoriaState);
  const [marcas, setMarcas] = useRecoilState(marcaState);
  const [precio, setPrecio] = useRecoilState(precioState);

  const [value, setValue] = useState([0, 100]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const onPrecioClick = () => {
    setPrecio([value[0], value[1]]);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const minDistance = 10;

  useEffect(() => {
    axios.get("http://localhost:8069/categoria/all").then((res) => {
      setCategorias(
        res.data.map((c) => {
          return { ...c, visible: true };
        })
      );
    });
  }, []);

  const getBrandsByCategories = (id) => {
    axios.get(`http://localhost:8069/marca/byCategory/${id}`).then((res) => {
      setMarcas(
        res.data.map((m) => {
          return { ...m, visible: true };
        })
      );
    });
  };

  const onCategoriaSelected = (e, id) => {
    if (e.target.checked) {
      setIdCategoria(id);
      setCategorias(
        categorias.map((c) => (c.codigo == id ? c : { ...c, visible: false }))
      );
      getBrandsByCategories(id);
    } else {
      setIdCategoria("");
      setCategorias(
        categorias.map((c) => {
          return { ...c, visible: true };
        })
      );
      setMarcas([]);
      setIdMarca("");
    }
    setBuscar("");
  };

  const onMarcaSelected = (e, id) => {
    if (e.target.checked) {
      setIdCategoria("");
      setIdMarca(id);
      setMarcas(
        marcas.map((m) => (m.codigo == id ? m : { ...m, visible: false }))
      );
    } else {
      setIdMarca("");
      setMarcas(
        marcas.map((m) => {
          return { ...m, visible: true };
        })
      );
      setIdCategoria(categorias.find((c) => c.visible == true).codigo);
    }
    setBuscar("");
  };

  return (
    <div className="filtro">
      <h1 className="text-3xl font-medium text-slate-600 mb-3">Precios</h1>
      <div className="px-1 py-2">
        <Box>
          <Slider
            getAriaLabel={() => "Distancia minima"}
            value={value}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            sx={{
              width: "100%",
              color: "#97BF04",
            }}
          />
        </Box>
        <button className="buttons w-full my-5" onClick={onPrecioClick}>
          FILTRAR
        </button>
      </div>
      <div className="text-3xl font-medium text-slate-600 mb-3">Categorías</div>
      <div id="listCategorias">
        {categorias.map(
          (categoria) =>
            categoria.visible && (
              <div key={categoria.codigo} className="flex items-center mb-1">
                <input
                  id={categoria.codigo}
                  type="checkbox"
                  value=""
                  className="w-4 h-4"
                  onChange={(event) => {
                    onCategoriaSelected(event, categoria.codigo);
                    setValue([0, 100]);
                    setPrecio([0, 100]);
                    refresh();
                  }}
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-xl text-gray-900"
                >
                  {categoria.nombre}
                </label>
              </div>
            )
        )}
      </div>

      {marcas.filter((m) => m.visible == true).length > 0 && (
        <div className="text-3xl mt-4 font-medium text-slate-600 mb-3">
          Marcas
        </div>
      )}

      {marcas.map(
        (marca) =>
          marca.visible && (
            <div key={marca.codigo} className="flex items-center mb-1">
              <input
                id=""
                type="checkbox"
                value=""
                className="w-4 h-4"
                onChange={(event) => onMarcaSelected(event, marca.codigo)}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-xl text-gray-900"
              >
                {marca.nombre}
              </label>
            </div>
          )
      )}

      {user.rol.codigo == 1 && (
        <div>
          <div className="text-3xl mt-4 font-medium text-slate-600 mb-3">
            Mostrar
          </div>
          <input
            type="checkbox"
            className="w-4 h-4"
            id="default-checkbox"
            defaultChecked
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-xl text-gray-900"
          >
            Todos
          </label>
        </div>
      )}
    </div>
  );
};
