import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { carritoState } from "../../../storage/atom/carrito.atom";
import "./detalle.css";

export const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState({});
  const [carrito, setCarrito] = useRecoilState(carritoState);
  const [modal, setModal] = useState(false);

  const onModalClick = (producto) => () => {
    const productoEncontrado = carrito.find(
      (item) => item.codigo === producto.codigo
    );

    if (productoEncontrado) {
      const nuevoCarrito = carrito.map((item) => {
        const nuevoItem = Object.assign({}, item);
        if (item.codigo == productoEncontrado.codigo) {
          nuevoItem.cantidad += cantidad;
        }
        return nuevoItem;
      });
      setCarrito([...nuevoCarrito]);
    } else {
      const itemProducto = {
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        categoria: producto.marca.categoria.nombre,
        marca: producto.marca.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        estadoProducto: true,
      };
      setCarrito([...carrito, itemProducto]);
    }
    setModal(true);
    console.log(carrito);
  };

  const onCantidadChange = (e) => {
    setCantidad(e.target.valueAsNumber);
  };

  const onSeguirComprandoClick = () => {
    navigate("/producto");
    setModal(false);
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      const result = await axios.get("http://localhost:8069/producto/" + id);
      setProducto(result.data);
      result.data.estado ? null : navigate("/notfound");
    };
    obtenerProducto();
  }, []);

  return (
    <>
      <div className={"relative md:mt-10 " + (modal ? "blur-md" : null)}>
        <div className="container p-4 lg:p-8 lg:px-10  lg:max-w-7xl align-middle mx-auto flex flex-col gap-20 lg:gap-10 items-center bg-white shadow-md md:flex-row  ">
          <img className="img" src={producto?.imagen} alt="" />
          <div className="flex flex-col  justify-between space-y-4 lg:pl-10 leading-normal">
            <h5 className="mb-2 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 ">
              {producto?.descripcion}
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              Marca: {producto?.marca?.nombre}
            </p>
            <input
              type="number"
              autoFocus
              className=" p-2 border-2 border-gray-300 w-1/3 md:w-2/6 lg:w-1/5 rounded"
              min="1"
              defaultValue={cantidad}
              onChange={onCantidadChange}
            />
            <p className="precio">S/. {producto?.precio}</p>
            <button className="cantidad" onClick={onModalClick(producto)}>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      <div
        id="popup-modal"
        className={
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex " +
          (modal ? "block" : "hidden")
        }
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
            <div className="p-6 text-center">
              <h3 className="text-[#036300] text-lg font-bold">
                El producto se añadio correctamente
              </h3>
              <br></br>
              <button
                onClick={onSeguirComprandoClick}
                data-modal-toggle="popup-modal"
                type="button"
                className="p-2 px-6 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              >
                Seguir Comprando
              </button>
              <button
                onClick={onSeguirComprandoClick}
                data-modal-toggle="popup-modal"
                type="button"
                className="ml-5 p-2 px-6 rounded-md hover:text-green-900 text-white bg-[#97BF04]"
              >
                Ir Al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
