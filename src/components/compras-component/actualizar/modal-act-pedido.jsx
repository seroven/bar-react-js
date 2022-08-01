import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export const ModalActualizarPedido = ({
  modalVisible,
  setModalVisible,
  id,
  detalle,
  setDetalle
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onGuardarClick = (data) => {

    const diffDias = (new Date(data.fecha) - new Date(detalle?.fecha_envio))/(1000*60*60*24);

    if (diffDias > 15 || diffDias<0){
      alert("Solo puedes aplazar el pedido un máximo de 15 dias");
      return;
    }
    setDetalle({...detalle, 
      fecha_envio: (detalle?.estado?.codigo === 2 ? detalle?.fecha_envio : data.fecha),
      dni_recibidor: data.dni,
      estado: {
        codigo: 2,
        nombre: "Postergado"
      }})

    axios.put("http://localhost:8069/pedido/actualizar/" + id, {
      cod_pedido: id,
      dni: data.dni,
      fecha: (detalle?.estado?.codigo === 2 ? detalle?.fecha_envio : formaterDate(data.fecha)),
    });
    
    setModalVisible(false);
  };

  const formaterDate = (date) => {
    const dateFormated = new Date(date);
    const day = ((dateFormated.getDate()+2).toString().length === 1 ? "0" : "")+(dateFormated.getDate()+2);
    const month = ((dateFormated.getMonth()+1).toString().length === 1 ? "0" : "") +(dateFormated.getMonth() + 1);
    const year = dateFormated.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {modalVisible && (
        <div
          className={
            " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col"
          }
          aria-modal="true"
          role="dialog"
        >
          <div className=" relative bg-white  w-2/5 h-72 rounded-md shadow-md">
            <div className="w-full bg-[#618C03] h-16 flex items-center rounded-t-md text-white font-medium px-5 text-2xl">
              <span className="mx-3">
                Actualización de Información de Pedido
              </span>
            </div>
            <div className="pt-3 px-10">
              <div className="text-justify text-lg mb-5">
                <span className=" font-medium text-[#618C03] ">
                  Recuerde que podrá postergar el pedido una sola vez y como
                  máximo 15 días.
                </span>
                <br />
              </div>
              <form
                className="grid grid-cols-3 font-semibold"
                onSubmit={handleSubmit(onGuardarClick)}
              >
                <div className="text-start mb-4">
                  Dni del Receptor del Pedido:
                </div>
                <div className=" mb-4">
                  <input
                    {...register("dni", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      minLength: {
                        value: 8,
                        message: "El campo debe tener al menos 8 caracteres",
                      },
                      maxLength: {
                        value: 8,
                        message: "El campo debe tener máximo 8 caracteres",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "El campo solo debe contener números",
                      },
                    })}
                    defaultValue={detalle?.dni_recibidor}
                    className={
                      (errors.dni ? "border-red-600" : null) +
                      " w-full p-2 text-sm leading-tight text-gray-700 border-2  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    }
                    type="text"
                    id="DniRecogerPedido"
                  />
                </div>
                <div className="flex justify-end mb-4">
                  <button className="w-4/5 py-2 sleading-tight rounded-md border-2 bg-[#618C03] text-white">
                    Guardar
                  </button>
                </div>
                <div className="text-start">Fecha de Entrega:</div>
                <div>
                  <input
                    {...register("fecha")}
                    type="date"
                    className={
                      " w-full p-2 text-sm leading-tight text-gray-700 border-2  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      + (detalle?.estado?.codigo === 2 ? " bg-gray-100" : "")
                    }
                    id="FechaEntrega"
                    defaultValue={detalle?.fecha_envio}
                    disabled = {detalle?.estado?.codigo === 2 ? true : false}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="w-4/5 py-2 sleading-tight rounded-md border-2 border-[#618C03] bg-white text-[#618C03]"
                    onClick={(e) => setModalVisible(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
