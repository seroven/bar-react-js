import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ClienteState } from "../../../storage/atom/cliente.atom";

export const PedidoModalRegistro = ({ modalVisible, setModalVisible, setModalConfirmacion, setModalInformativo }) => {
  const [cliente, setCliente] = useRecoilState(ClienteState);
//   console.log(cliente);
  const guardarPedido = (e) => {
    e.preventDefault();
    setModalVisible(false);
    setModalConfirmacion(true);
  }

  return (
    <>
      {modalVisible && (
        <div
          id="popup-modal"
          className={
            " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col block"
          }
          aria-modal="true"
          role="dialog"
        >
          <div className=" relative border-l border-r border-b-4 border-[#618C03] bg-white rounded-lg py-10 px-32 w-3/6 h-3/4">
              <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
                Datos Personales
              </h1>
              <form className="mt-10">
                <div className="register-order-group">
                  <label className="register-order-label">Nombres:</label>
                  <input type="text" className="register-order-input" />
                </div>
                <div className="register-order-group">
                  <label className="register-order-label">
                    Apellido Paterno:
                  </label>
                  <input type="text" className="register-order-input" />
                </div>
                <div className="register-order-group">
                  <label className="register-order-label">
                    Apellido Materno:
                  </label>
                  <input type="text" className="register-order-input" />
                </div>
                <div className="register-order-group">
                  <label className="register-order-label">Dni:</label>
                  <input type="text" className="register-order-input w-2/5" />
                </div>
                <div className="register-order-group">
                  <label className="register-order-label">Teléfono:</label>
                  <input type="text" className="register-order-input w-2/5" />
                </div>
                <div className="register-order-group">
                  <label className="register-order-label">
                    Fecha de Recojo:
                  </label>
                  <input type="date" className="register-order-input w-2/5" />
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                  <label className="register-order-label px-3">
                    ¿Usted mismo irá a recoger?
                  </label>
                </div>
                <div className="linea-divisora"></div>
                <div className="register-order-group">
                  <label className="register-order-label text-gray-500">DNI de la persona que irá a recoger:</label>
                  <input type="text" className="register-order-input w-2/5" />
                </div>
                <div className="w-full flex flex-row justify-center">
                    <button className='bg-[#618C03] py-3 px-9 text-white font-semibold text-2xl rounded-xl shadow-md shadow-gray-400' onClick={e => guardarPedido(e)}>
                        FINALIZAR COMPRAR 
                    </button>
                </div>
              </form>
                <div className='absolute right-3 top-3'>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="#D04444" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
          </div>
        </div>
        
      )}
    </>
  );
};
