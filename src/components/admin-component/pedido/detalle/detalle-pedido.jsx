import { useState } from "react";
import { useParams } from "react-router-dom";
import "./detalle.css";
import { ModalConfActualizar } from "./moda-conf-actualizar";

export const DetallePedidoAdmin = () => {
  const { id } = useParams();
  const [updateProducts, setUpdateProducts] = useState(false);
  const [modalConfActualizar, setModalConfActualizar] = useState(false);




  return (<>
    <div className={modalConfActualizar ? "blur-md" : ""}>
      <div className="text-4xl text-center font-bold text-[#022601] flex flex-col justify-between md:flex-row">
        <span>Pedido N°{id} | 16/07/22 </span>
        <span>Total: S/. 1395.00</span>
      </div>
      <br />
      <div className="text-[2rem] text-[#7CA504] font-semibold">
        <span>Valeria Rojas Cuadros - 7512543</span>
      </div>
      <div className="container-data-client">
        <div>
          <label htmlFor="telefono">
            <b>Teléfono:</b>
          </label>
          {
            updateProducts
            ? <input id="telefono" className="input-update-order"/>
            : <span>985147125</span>
          }
        </div>
        <div>
          <label htmlFor="fecha">
            <b>Fecha de Entrega:</b>
          </label>
          {
            updateProducts 
            ? <input id="fecha" type = "date" className="input-update-order"/>
            : <span>25/06/2023</span>
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
            : <span>75121453</span>
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
      <div className="containter-data-products">
        <div className="item-order-product">
          <div className="h-full overflow-hidden rounded-xl row-start-1 row-end-3 mx-16">
              <img className="object-cover" src="https://images.unsplash.com/photo-1598439210625-5067c578f3f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"/>
          </div>
          <div className="font-bold text-[1.7rem] col-start-2 col-end-4">
            Un pinguino bien fachero 😎
          </div>
          <div className="grid grid-rows-2 gap-y-4">
            <div className="flex flex-row justify-between">
                <span className="font-semibold">Cantidad:</span>
                <span>2</span>
            </div>
            <div className="flex flex-row justify-between">
                <span className="font-semibold">Costo Unitario:</span>
                <span>S/. 1000.00</span>
            </div>
          </div>
          <div className="justify-self-center text-center">
            <span className="font-semibold">SubTotal</span>
            <br/>
            <span>S/. 2000.00</span>
          </div>

        </div>
      </div>
    </div>
    <ModalConfActualizar modal = {modalConfActualizar} setModal = {setModalConfActualizar} setUpdateProducts ={setUpdateProducts}/>
  </>
  );
};
