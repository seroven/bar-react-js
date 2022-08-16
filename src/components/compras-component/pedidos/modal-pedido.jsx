import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ClienteState } from "../../../storage/atom/cliente.atom";
import { UserState } from "../../../storage/atom/usuario.atom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { data } from "autoprefixer";
import { carritoState } from "../../../storage/atom/carrito.atom";
import { DataPedidoState } from "../../../storage/atom/data-pedido.atom";
import "./carrito.css"

export const PedidoModalRegistro = ({
  modalVisible,
  setModalVisible,
  setModalConfirmacion,
  setModalInformativo,
}) => {
  
  const [cliente, setCliente] = useRecoilState(ClienteState);
  const [activeDni, setActiveDni] = useState(false);
  const [usuario, setUsuario] = useRecoilState(UserState);
  const [carrito, setCarrito] = useRecoilState(carritoState);
  const [dataPedido, setDataPedido] = useRecoilState(DataPedidoState);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  

  //   console.log(cliente);
  const guardarInformacion = async (data) => {
    setDataPedido(data);    
    setModalVisible(false);
    setModalConfirmacion(true);
  };

  const getClass = (verif, ancho) => {
    return verif ? `register-order-input register-order-input-focus-i w-${ancho} border-red-700` 
    : `register-order-input register-order-input-focus-c w-${ancho}`;
  }

  return (
    <>
      {modalVisible && (
        <div
          id="popup-modal"
          className={
            " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col "
          }
          aria-modal="true"
          role="dialog"
        >
          <div className="relative border-l border-r border-b-4 border-[#618C03] bg-white rounded-lg pt-8 pb-16 px-20 w-3/6 h-[45rem] overflow-auto">
            <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
              Datos Personales
            </h1>
            <form className="mt-8" onSubmit={handleSubmit(guardarInformacion)}>
              <div className="register-order-group">
                <label htmlFor="nombre" className="register-order-label">Nombres:</label>
                {
                  cliente 
                  ? <label className="register-order-label text-right">{cliente.nombre}</label>
                  : <input 
                  {
                    ...register("nombre", {
                      required: {
                        value: true,
                        message: "El nombre es obligatorio",
                      },
                      maxLength: {
                        value: 60,
                        message: "El nombre debe tener máximo 50 caracteres",
                      },
                      pattern: {
                        value: /^[a-záéíóúñ]+$/i, 
                        message: "El nombre solo puede tener caracteres alfabéticos"
                      },
                      
                    })
                  } id="nombre" type="text" className={getClass(errors.nombre, 96)}/>
                }
              </div>
              {errors.nombre && (
                <div className="register-order-error-message">
                  {errors.nombre.message}
                </div>
              )}
              <div className="register-order-group">
                <label htmlFor="apPaterno" className="register-order-label">
                  Apellido Paterno:
                </label>
                {
                  cliente 
                  ? <label className="register-order-label text-right">{cliente.apPaterno}</label>
                  : <input 
                  {
                    ...register("apPaterno", {
                      required: {
                        value: true,
                        message: "El apellido paterno es obligatorio",
                      },
                      maxLength: {
                        value: 60,
                        message: "El apellido paterno debe tener máximo 50 caracteres",
                      },
                      pattern: {
                        value: /^[a-záéíóúñ]+$/i, 
                        message: "El apellido paterno solo puede tener caracteres alfabéticos"
                      },
                      
                    })
                  } id = "apPaterno" type="text" className={getClass(errors.apPaterno, 96)}/>
                }
              </div>
              {errors.apPaterno && (
                <div className="register-order-error-message">
                  {errors.apPaterno.message}
                </div>
              )}
              <div className="register-order-group">
                <label htmlFor="apMaterno" className="register-order-label">
                  Apellido Materno:
                </label>
                {
                  cliente 
                  ? <label className="register-order-label text-right">{cliente.apMaterno}</label>
                  : <input
                  {
                    ...register("apMaterno", {
                      required: {
                        value: true,
                        message: "El apellido materno es obligatorio",
                      },
                      maxLength: {
                        value: 60,
                        message: "El apellido materno debe tener máximo 50 caracteres",
                      },
                      pattern: {
                        value: /^[a-záéíóúñ]+$/i, 
                        message: "El apellido materno solo puede tener caracteres alfabéticos"
                      },
                      
                    })
                  } id = "apMaterno" type="text" className={getClass(errors.apMaterno, 96)} />
                }
              </div>
              {errors.apMaterno && (
                <div className="register-order-error-message">
                  {errors.apMaterno.message}
                </div>
              )}
              <div className="register-order-group">
                <label htmlFor="dni" className="register-order-label">Dni:</label>
                {
                  cliente 
                  ? <label className="register-order-label text-right">{cliente.dni}</label>
                  : <input
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
                  } id="dni" type="text" className={getClass(errors.dni, 64)} />
                }
              </div>
              {errors.dni && (
                <div className="register-order-error-message">
                  {errors.dni.message}
                </div>
              )}
              <div className="register-order-group">
                <label htmlFor="telefono" className="register-order-label">Teléfono:</label>
                {
                  cliente 
                  ? <label className="register-order-label text-right">{cliente.telefono}</label>
                  : <input
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
                  } id="telefono" type="text" className={getClass(errors.telefono, 64)} />
                }
              </div>
              {errors.telefono && (
                <div className="register-order-error-message">
                  {errors.telefono.message}
                </div>
              )}
              <div className="register-order-group">
                <label htmlFor="fecha" className="register-order-label">Fecha de Recojo:</label>
                <input 
                {
                  ...register("fecha", {
                    required: {
                      value: true,
                      message: "La fecha de recojo es obligatoria",
                    }
                  })
                } id="fecha" type="date" className={getClass(errors.fecha, 64)} />
              </div>
              {errors.fecha && (
                <div className="register-order-error-message">
                  {errors.fecha.message}
                </div>
              )}
              <div className="flex items-center h-5">
                <input
                  id="verificacion"
                  type="checkbox"
                  value=""
                  checked = {activeDni}
                  onChange = {e => setActiveDni(!activeDni)}
                  className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
                <label htmlFor="verificacion" className="register-order-label px-3">
                  ¿Usted mismo irá a recoger?
                </label>
              </div>
              <div className="linea-divisora"></div>
              <div className="register-order-group">
                <label htmlFor="dni_recoger" className="register-order-label text-gray-500">
                  DNI de la persona que irá a recoger:
                </label>
                <input
                {
                  ...register("dni_recoger", {
                    required: {
                      value: !activeDni,
                      message: "El dni del encargado de recoger es obligatorio",
                    },
                    pattern: {
                      value: !activeDni ? /^[0-9]{8}$/ : null, 
                      message: "El dni solo puede ser numérico y de 8 dígitos"
                    },
                    
                  })
                }
                  disabled = {activeDni}
                  id= "dni_recoger"
                  type="text"
                  className={getClass(errors.dni_recoger, 64)}
                />
              </div>
              {errors.dni_recoger && (
                <div className="register-order-error-message">
                  {errors.dni_recoger.message}
                </div>
              )}
              <div className="w-full flex flex-row justify-center">
                <button
                  className="bg-[#618C03] py-3 px-9 text-white font-semibold text-2xl rounded-xl shadow-md shadow-gray-400"
                >
                  FINALIZAR COMPRAR
                </button>
              </div>
            </form>
            <div className="absolute right-3 top-3">
              <button onClick={e => setModalVisible(false)}>
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
          </div>
        </div>
      )}
    </>
  );
};
