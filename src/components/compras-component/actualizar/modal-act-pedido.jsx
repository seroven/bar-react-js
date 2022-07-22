import React from "react";

export const ModalActualizarPedido = ({ modalVisible, setModalVisible }) => {
    return (
        <>
            {modalVisible && (
                <div
                    className={
                        " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col"} aria-modal="true" role="dialog">
                    <div className=" relative bg-white  w-2/5 h-64">
                        <div className="w-full bg-[#618C03] h-16 flex items-center text-white font-medium px-5 text-2xl">
                            <span className="mx-3">Actualización de Información de Pedido</span>
                        </div>
                        <div className="pt-3 px-10">
                            <div className="text-justify text-lg mb-5">
                                <span className=" font-medium text-[#618C03] ">Recuerde que solo podrás postegar el pedido una sola vez como máximo 15 días.</span><br />
                            </div>
                            <div className="grid grid-cols-3 font-semibold">
                                <div className="text-start mb-4">Dni del Encargado de Recoger el Pedido:</div>
                                <div className=" mb-4">
                                    <input className="w-full py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" id="DniRecogerPedido" />
                                </div>
                                <div className="flex justify-end mb-4">
                                    <button className='w-4/5 py-2 sleading-tight rounded-md border-2 bg-[#618C03] text-white'>
                                        Guardar
                                    </button>
                                </div>
                                <div className="text-start">Fecha de Entrega:</div>
                                <div>
                                    <input datepicker type="date" className=" w-full py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="FechaEntrega" />
                                </div>
                                <div className="flex justify-end">
                                    <button className='w-4/5 py-2 sleading-tight rounded-md border-2 border-[#618C03] bg-white text-[#618C03]' onClick={e => setModalVisible(false)}>
                                    Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )}
        </>
    );
};