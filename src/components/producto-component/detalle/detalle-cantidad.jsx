import {useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { carritoState } from "../../../storage/atom/carrito.atom";
import "./detalle.css"


export const DetalleCantidad = ({producto}) => {
  const [contador, setContador] = useState(1);
  const [carrito, setCarrito] = useRecoilState(carritoState);

  useEffect(() => {
    const nuevoCarrito = carrito.map(p => p.codigo === producto.codigo ? {...p, cantidad: contador} : p);
    setCarrito(nuevoCarrito );
  }, [contador]);

  const findProductInLocalStorage = () => {
    return carrito.find(
      (item) => item.codigo === producto.codigo
    );
  }

  const decrement = () => {
    if (contador === 1) return;
    setContador(contador-1);
  }

  const increment = () => {
    if(contador === 100) return;
    setContador(contador + 1);
  }

  return (
    <>
      <div className="font-semibold w-full mt-0 flex font-['Roboto'] h-14">
        <div className="flex bg-[#97BF04] rounded-[1.2rem] justify-between items-center flex-row w-[60%] text-white text-3xl px-5 h-full">
          <button onClick={decrement}> - </button>
          <label >{contador}</label>
          <button onClick={increment}> + </button>
        </div>
      </div>
    </>
  );
};
