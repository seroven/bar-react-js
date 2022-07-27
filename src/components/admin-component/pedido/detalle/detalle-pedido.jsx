import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detalle.css";
import { ModalConfActualizar } from "./moda-conf-actualizar";
import axios from "axios";

export const DetallePedidoAdmin = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState([]);
  const [productos, setProductos] = useState([]);
  const [updateProducts, setUpdateProducts] = useState(false);
  const [modalConfActualizar, setModalConfActualizar] = useState(false);
  

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    let detalle = await axios.get(`http://localhost:8069/pedido/buscar/${id}`);
    let productos = await axios.get(`http://localhost:8069/detalle/order/${id}`);
    detalle = detalle.data[0];
    productos = productos.data;
    setDetalle(detalle);
    setProductos(productos);
    joinProductos(detalle, productos);
    //console.log(detalle);
  };

  const joinProductos = (detalle, productos) => {
    const newDetalle = {
      ...detalle,
      productos: detalle.productos.map((item) => {
        const prod = productos.find((prod) => prod.idproducto === item.codigo);
        return {
          ...item,
          cantidad: prod.cantidad,
          subtotal: prod.subtotal,
        };
      }),
    }
    setDetalle(newDetalle);
  };

  const formaterDate = (date) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate() + 1;
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (<>
    <div className={modalConfActualizar ? "blur-md" : ""}>
      <div className="text-4xl text-center font-bold text-[#022601] flex flex-col justify-between md:flex-row">
        <span>Pedido N°{id} | {" "} {formaterDate(detalle.fecha_solicitud)} </span>
        <span>Total: {"S/." + detalle?.precio_total}</span>
      </div>
      <br />
      <div className="text-[2rem] text-[#7CA504] font-semibold">
        <span>{detalle?.cliente?.nombre} - {detalle?.cliente?.dni}</span>
      </div>
      <div className="container-data-client">
        <div>
          <label htmlFor="telefono">
            <b>Teléfono:</b>
          </label>
          {
            updateProducts
            ? <input id="telefono" className="input-update-order"/>
            : <span>{detalle?.cliente?.telefono}</span>
          }
        </div>
        <div>
          <label htmlFor="fecha">
            <b>Fecha de Entrega:</b>
          </label>
          {
            updateProducts 
            ? <input id="fecha" type = "date" className="input-update-order"/>
            : <span>{formaterDate(detalle?.fecha_envio)}</span>
          }
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-3 justify-self-center">

            {
                updateProducts
                ? <button className="buttons lg:px-10 px-5" onClick={(e) => setModalConfActualizar(true)}> Guardar </button>
                : <button className="buttons lg:px-10 px-5" onClick={(e) => setUpdateProducts(true)}> Editar </button>
            }
          
        </div>

        <div>
          <label htmlFor="dni_recoger">
            <b>
              Dni del Encargado <br />
              de Recoger el Pedido:
            </b>
          </label>
          {
            updateProducts 
            ? <input id="dni_recoger" className="input-update-order"/>
            : <span>{detalle?.dni_recibidor}</span>
          }
        </div>
        <div>
          <label htmlFor="estado">
            <b>Estado:</b>
          </label>
          {
            updateProducts 
            ? <select id = "estado" className="input-update-order">
              <option>Pendiente</option>
            </select>
            : <span>Pendiente</span>

          }
        </div>
        
        {
          updateProducts &&
          <div className="absolute right-0 top-2">
              <button onClick={e => setUpdateProducts(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#D04444"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

        }

      </div>

      <br />
      <div className="text-[2rem] text-[#022601] font-bold">
        <span>Productos</span>
      </div>
      <div> {detalle.productos?.map((producto) => (
          <div className="containter-data-products">
            <div key={producto?.codigo} className="item-order-product">
              <div className="h-full overflow-hidden rounded-xl row-start-1 row-end-3 mx-16">
                  <img className="object-cover" src={producto?.imagen}/>
              </div>
              <div className="font-bold text-[1.7rem] col-start-2 col-end-4">
              {producto?.descripcion}
              </div>
              <div className="grid grid-rows-2 gap-y-4">
                <div className="flex flex-row justify-between">
                    <span className="font-semibold">Cantidad:</span>
                    <span>{producto?.cantidad}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="font-semibold">Costo Unitario:</span>
                    <span>S/. {(producto?.precio).toFixed(2)}</span>
                </div>
              </div>
              <div className="justify-self-center text-center">
                <span className="font-semibold">SubTotal</span>
                <br/>
                <span>{"S/. " + ( producto?.subtotal ).toFixed(2)}</span>
              </div>

            </div>
          </div>
          ))}
      </div>



    </div>
    <ModalConfActualizar modal = {modalConfActualizar} setModal = {setModalConfActualizar} setUpdateProducts ={setUpdateProducts}/>
  </>
  );
};
