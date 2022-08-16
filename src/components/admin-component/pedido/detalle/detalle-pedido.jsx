import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  const [pedido, setPedido] = useState({}); // Variable de estado para el cuerpo del actualizar pedido
  const [newDataPedido, setNewDataPedido] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    let detalle = await axios.get(`http://localhost:8069/pedido/buscar/${id}`);
    let productos = await axios.get(`http://localhost:8069/detalle/order/${id}`);
    
    detalle = detalle.data[0];
    console.log(detalle);
    productos = productos.data;
    setPedido({...detalle});
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

  const guardarInformacion = (data) => {
    setNewDataPedido(data);
    setModalConfActualizar(true);
  };

  return (<>
    <div className={modalConfActualizar ? "blur-md" : ""}>
      <div className="text-4xl text-center font-bold text-[#022601] flex flex-col justify-between md:flex-row">
        <span>Pedido N°{id} | {" "} {formaterDate(detalle.fecha_solicitud)} </span>
        <span>Total: {"S/." + detalle?.precio_total}</span>
      </div>
      <br />
      <div className="text-[2rem] text-[#7CA504] font-semibold">
        <span>{detalle?.cliente?.nombre + " " + detalle?.cliente?.apPaterno + " " + detalle?.cliente?.apMaterno} - {detalle?.cliente?.dni}</span>
      </div>
      <form className="container-data-client" onSubmit={handleSubmit(guardarInformacion)}>
        <div className="container-data-client-item">
          <label htmlFor="telefono">
            <b>Teléfono:</b>
          </label>
          {
            updateProducts
            ? <div>
                <input
                {
                  ...register("telefono", {
                    required: {
                      value: true,
                      message: "El teléfono es obligatorio",
                    },
                    pattern: {
                      value: /^[0-9]{9}$/, 
                      message: "El teléfono solo puede ser numérico y de 9 dígitos"
                    },
                    
                  })
                } id="telefono" defaultValue={detalle?.cliente?.telefono} className="input-update-order"/>
                {errors.telefono && (
                <div className="update-order-error-message">
                  {errors.telefono.message}
                </div>
              )}

              </div>
            : <span>{detalle?.cliente?.telefono}</span>
          }
        </div>
        <div className="container-data-client-item">
          <label htmlFor="fecha">
            <b>Fecha de Entrega:</b>
          </label>
          {
            updateProducts 
            ? <div className="flex flex-col">
                <input
              {
                ...register("fecha", {
                  required: {
                    value: true,
                    message: "La fecha de recojo es obligatoria",
                  }
                })
              }  id="fecha" defaultValue={detalle?.fecha_envio} type = "date" className="input-update-order"/>
              {errors.fecha && (
                <div className="update-order-error-message">
                  {errors.fecha.message}
                </div>
              )}
              </div>
            : <span>{formaterDate(detalle?.fecha_envio)}</span>
          }
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-3 justify-self-center">

            {
                updateProducts
                ? <button typeof="submit" className="buttons lg:px-10 px-5"> Guardar </button>
                : <span typeof="button" className="buttons lg:px-10 px-5 hover:cursor-pointer" onClick={(e) => setUpdateProducts(true)}> Editar </span>
            }
          
        </div>

        <div className="container-data-client-item">
          <label htmlFor="dni_recoger">
            <b>
              Dni del Encargado
              de Recoger el Pedido:
            </b>
          </label>
          {
            updateProducts 
            ? <div className="flex flex-col">
            <input
            {
              ...register("dni", {
                required: {
                  value: true,
                  message: "El dni es obligatorio",
                },
                pattern: {
                  value: /^[0-9]{8}$/, 
                  message: "El dni solo puede ser numérico y de 8 dígitos"
                },
              })
            } id="dni_recoger" defaultValue={detalle?.dni_recibidor} className="input-update-order"/>
            {errors.dni && (
              <div className="update-order-error-message">
                {errors.dni.message}
              </div>
            )}
            </div>
            : <span>{detalle?.dni_recibidor}</span>
          }
        </div>
        <div className="container-data-client-item">
          <label htmlFor="estado">
            <b>Estado:</b>
          </label>
          {
            updateProducts 
            ? <select {...register("estado", {
              required: true,
            })} id = "estado" className="input-update-order">
              <option id = "1" selected = {detalle?.estado?.codigo === 1}>Pendiente</option>
              <option id = "2" selected = {detalle?.estado?.codigo === 2}>Postergado</option>
              <option id = "3" selected = {detalle?.estado?.codigo === 3}>Entregado</option>
              <option id = "4" selected = {detalle?.estado?.codigo === 4}>Anulado</option>
            </select>
            : <span>{detalle?.estado?.nombre}</span>

          }
        </div>
        
        {
          updateProducts &&
          <div className="absolute right-3 top-3">
              <button onClick={e => setUpdateProducts(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#D04444"
                  strokeWidth="3"
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

      </form>

      <br />
      <div className="text-[2rem] text-[#022601] font-bold">
        <span>Productos</span>
      </div>
      <div> 
          <div className="containter-data-products">
          {detalle.productos?.map((producto) => (
            <div key={producto?.codigo} className="item-order-product overflow-hidden">
                  <img className="h-full justify-self-center w-72 rounded-xl object-cover row-start-1 row-end-3 " src={producto?.imagen}/>
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
            ))}
          </div>
          
      </div>



    </div>
    <ModalConfActualizar pedido = {pedido} newDataPedido = {newDataPedido} detalle = {detalle} setDetalle = {setDetalle} modal = {modalConfActualizar} setModal = {setModalConfActualizar} setUpdateProducts ={setUpdateProducts}/>
  </>
  );
};
