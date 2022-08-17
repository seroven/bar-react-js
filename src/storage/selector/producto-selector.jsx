import axios from "axios";
import { selector, useRecoilValue } from "recoil";
import { allProductsState } from "../atom/all-products";
import { buscarState } from "../atom/buscar.atom";
import { categoriaIdState } from "../atom/categoria.atom";
import { ClienteState } from "../atom/cliente.atom";
import { marcaIdState } from "../atom/marca.atom";
import { precioState } from "../atom/precio.atom";

export const productoSelector = selector({
  key: "productSelector",
  get: async ({ get }) => {
    const buscar = get(buscarState);
    const categoria = get(categoriaIdState);
    const marca = get(marcaIdState);
    const precio = get(precioState);
    const isAll = get(allProductsState);
    const cliente = get(ClienteState);

    let productos = [];

    if (buscar !== "") {
      productos = await axios.get(
        `http://localhost:8069/producto/nombre/${buscar}`
      );
      productos = productos.data;
    } else if (marca !== "") {
      productos = await axios.get(
        `http://localhost:8069/producto/marca/${marca}`
      );
      productos = productos.data;
    } else if (isAll !== true) {
      productos = await axios.get(`http://localhost:8069/producto/estado/1`);
      productos = productos.data;
    } else if (categoria !== "") {
      productos = await axios.get(
        `http://localhost:8069/producto/categoria/${categoria}`
      );
      productos = productos.data;
    } else if ((precio[0] !== 0, precio[1] !== 100)) {
      productos = await axios.post(`http://localhost:8069/producto/precio`, {
        min: precio[0],
        max: precio[1],
      });
      productos = productos.data;
    } else {
      if (cliente){
        productos = await axios.get("http://localhost:8069/producto/all/"+cliente.codigo);
      } else{
        productos = await axios.get("http://localhost:8069/producto/all/");
      }
      
      productos = productos.data;
    }
    return productos;
  },
});
