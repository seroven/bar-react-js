import axios from "axios";
import { selector, useRecoilValue } from "recoil";
import { buscarState } from "../atom/buscar.atom";
import { categoriaState } from "../atom/categoria.atom";

export const productoSelector = selector({
  key: "productoSelector",
  get: async ({ get }) => {
    const buscar = get(buscarState);
    const categoria = get(categoriaState);

    let productos = [];

    if (buscar !== "") {
      productos = await axios.get(
        `http://localhost:8069/producto/nombre/${buscar}`
      );
      productos = productos.data;
    } else if (categoria == "") {
      productos = await axios.get("http://localhost:8069/producto/all");
      productos = productos.data;
    } else {
      productos = await axios.get(
        `http://localhost:8069/producto/categoria/${categoria}`
      );
      productos = productos.data;
    }

    return productos;
  },
});
