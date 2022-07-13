import axios from "axios";
import { selector, useRecoilValue } from "recoil";
import { buscarState } from "../atom/buscar.atom";
import { categoriaIdState } from "../atom/categoria.atom";
import { marcaIdState } from "../atom/marca.atom";

export const productoSelector = selector({
  key: "productoSelector",
  get: async ({ get }) => {
    const buscar = get(buscarState);
    const categoria = get(categoriaIdState);
    const marca = get(marcaIdState);
    
    let productos = [];
    
    
    if (buscar !== "") {
      productos = await axios.get(
        `http://localhost:8069/producto/nombre/${buscar}`
      );
      productos = productos.data;
    } else if (marca !== ""){
      productos = await axios.get(
        `http://localhost:8069/producto/marca/${marca}`
      );
      
      productos = productos.data;
      
    }else if (categoria !== "") {
      productos = await axios.get(
        `http://localhost:8069/producto/categoria/${categoria}`
      );
      productos = productos.data;
    } 
    else {
      console.log(marca);
      productos = await axios.get("http://localhost:8069/producto/all");
      productos = productos.data;
    }

    return productos;
  },
});
