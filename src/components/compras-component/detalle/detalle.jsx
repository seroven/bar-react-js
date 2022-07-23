import { useEffect } from "react";
import "./detalle.css";
import { useState } from "react";
import { ModalActualizarPedido } from "../actualizar/modal-act-pedido";
import { useParams } from "react-router-dom";
import axios from "axios";

export const DetallePedido = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modalActualizarPedido, setModalActualizarPedido] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const formaterDate = (date) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate() + 1;
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getData = async () => {
    let detalle = await axios.get(`http://localhost:8069/pedido/buscar/${id}`);
    let productos = await axios.get(
      `http://localhost:8069/detalle/order/${id}`
    );
    detalle = detalle.data[0];
    productos = productos.data;
    setDetalle(detalle);
    setProductos(productos);
    joinProductos(detalle, productos);
    console.log(detalle);
  };

  const joinProductos = (detalle, productos) => {
    setDetalle({
      ...detalle,
      productos: detalle.productos.map((item) => {
        const prod = productos.find((prod) => prod.id === item.producto_id);
        return {
          ...item,
          cantidad: prod.cantidad,
          subtotal: prod.subtotal,
        };
      }),
    });
  };
  return (
    <>
      <div className={modalActualizarPedido ? "blur-md" : ""}>
        <div className="flex container mx-auto my-2 justify-center">
          <div className="relative mb-10">
            <h1 className="font-normal text-4xl text-center md:text-left text-[#022601]">
              Pedido{" "}
              <span className=" pr-10 mr-10 font-bold text-[#618C03] border-r-2 border-black">
                N°{id}
              </span>
              Fecha de Compra:{" "}
              <span className="pr-10 mr-10 font-bold text-[#618C03] border-r-2 border-black">
                {formaterDate(detalle.fecha_solicitud)}
              </span>
              Total:
              <span className="font-bold text-[#618C03]">
                {" S/." + detalle?.precio_total}
              </span>
            </h1>
          </div>
        </div>
        <div className=" container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-2">
            <div className="py-10 pb-5">
              <div className="rounded-xl overflow-auto shadow-lg max-w-[70%] ">
                <div className="w-full text-2xl font-semibold">
                  <div className="tituloDetalle">
                    <p className="text-3xl font-bold text-white mt-3  text-center">
                      Detalle Pedido
                    </p>
                  </div>
                  <div className="p-6 font-light">
                    <div className="grid grid-cols-2 py-2 my-2 ">
                      <p>Fecha de Entrega:</p>
                      <p className="text-right font-medium">
                        {formaterDate(detalle?.fecha_envio)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2  py-2 my-2 ">
                      <p>Dni Receptor:</p>
                      <p className="text-right font-medium">
                        {detalle?.dni_recibidor}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 py-2 my-2 ">
                      <p>Estado del Pedido:</p>
                      <p className="text-right font-medium">
                        {detalle?.estado?.nombre}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        disabled={detalle?.estado?.codigo === 2}
                        type="submit"
                        className={
                          (detalle?.estado?.codigo === 2
                            ? "bg-slate-300 text-black hover:text-black"
                            : null) +
                          " font-medium text-xl p-2 px-8 rounded-md  hover:text-green-900 text-white bg-[#97BF04] mt-5 mb-8"
                        }
                        onClick={(e) => setModalActualizarPedido(true)}
                      >
                        {detalle?.estado?.codigo === 2
                          ? "Pedido Postergado"
                          : "Editar"}
                      </button>
                    </div>

                    <hr />
                    <div className="mb-8">
                      <p className="text-4xl font-bold text-[#618C03] mt-8 mb-6">
                        Datos del Cliente
                      </p>
                      <div className="font-light">
                        <div className="grid grid-cols-2  py-1 my-2 ">
                          <p>Nombre:</p>
                          <p className="text-right font-medium">
                            {detalle?.cliente?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-2  py-1 my-2 ">
                          <p>Apellidos:</p>
                          <p className="text-right font-medium">
                            {`${detalle?.cliente?.apPaterno} ${detalle?.cliente?.apMaterno}`}
                          </p>
                        </div>
                        <div className="grid grid-cols-2  py-1 my-2 ">
                          <p>DNI:</p>
                          <p className="text-right font-medium">
                            {detalle?.cliente?.dni}
                          </p>
                        </div>
                        <div className="grid grid-cols-2  py-1 my-2 ">
                          <p>Teléfono:</p>
                          <p className="text-right font-medium">
                            {detalle?.cliente?.telefono}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-10">
              <div className="rounded-lg row-span-4 shadow-lg max-w-[100%] justify-center  bg-slate-100">
                <div className="text-2xl">
                  <div className="tituloDetalle">
                    <p className="text-3xl font-bold mt-3 ">
                      Productos Solicitados
                    </p>
                  </div>
                  <div className="producto">
                    {detalle.productos?.map((producto) => (
                      <div
                        key={producto?.codigo}
                        className="flex flex-row  border border-gray-200/80 bg-white p-6"
                      >
                        <div>
                          <img
                            className="w-40 h-40 object-cover"
                            src={producto?.imagen}
                          />
                        </div>

                        <div className="flex flex-col px-6">
                          <div className="flex h-8 flex-row mb-4 text-[#022601]">
                            <h2
                              className="text-md w-72 font-medium truncate
                            "
                            >
                              {producto?.descripcion}
                            </h2>
                          </div>
                          <div className="grid grid-cols-3 font-normal text-xl">
                            <div className="text-start py-2 ">Cantidad:</div>
                            <div className="text-right py-2 font-medium">
                              {producto?.cantidad}
                            </div>
                            <div className="text-center ml-14">SubTotal</div>
                            <div className="text-start w-40 py-2">Precio:</div>
                            <div className="text-right py-2 font-medium ">
                              S/.{(producto?.subtotal).toFixed(2)}
                            </div>
                            <div className="text-center font-extrabold w-full  text-3xl ml-8 text-[#618C03]">
                              {"S/. " +
                                (
                                  producto?.subtotal * producto?.cantidad
                                ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalActualizarPedido
        modalVisible={modalActualizarPedido}
        setModalVisible={setModalActualizarPedido}
        id={id}
        fecha={detalle?.fecha_envio}
      />
    </>
  );
};
