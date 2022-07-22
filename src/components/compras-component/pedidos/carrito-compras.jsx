import React from 'react';
import "./carrito.css";
import {DetalleCantidad} from "../../producto-component/detalle/detalle-cantidad"
import { useState } from 'react';
import { PedidoModalRegistro } from './modal-pedido';
import { ModalConfirmacionPedido } from './modal-conf-pedido';
import { ModalInformacionPedido } from './modal-info-pedido';

export const CarritoCompras = () => {

    const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
    const [modalInformativo, setModalInformativo] = useState(false); // Mensaje informativo sobre dirección del bar
    const [modalConfirmacion, setModalConfirmacion] = useState(false); // En caso sea la primera vez que el cliente ingresa sus datos

    return <>
    <div className={modalRegistroVisible || modalInformativo || modalConfirmacion ? "blur-md" : ""}>
        <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">Carrito de Compras</h1>
        <br/>
        <div className='carrito'>
            <div className='items'>
                <div className='item-carrito'>
                    <div className='h-full overflow-hidden'>
                        <img className='w-full object-cover'
                        src='https://images.unsplash.com/photo-1595145175026-570715fc39d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'/>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold text-xl'>
                            Amoroso 😮
                        </span>
                    </div>
                    <div className='flex flex-col justify-around h-[70%] self-center'>
                        <div className='flex flex-row justify-between'>
                            <span className='font-medium text-xl'>Precio: </span>
                            <span className='text-xl'>S/. 100.00</span>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <span className='font-medium text-xl'>Cantidad: </span>
                            <div className="flex font-mono font-semibold bg-[#97BF04] rounded-[1.2rem] justify-between items-center flex-row w-[40%] text-white text-xl px-3 h-8">
                                <button > - </button>
                                <label >5</label>
                                <button> + </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex flex-col justify-around items-center '>
                        <div className='text-2xl'>
                            <div className='text-center'>
                                <span className='font-bold'>Total: </span>
                                <span>S/. 500.00</span>                            
                            </div>
                            <span className='text-xl my-3 block text-center text-[#618C03] underline'>Mover para Después</span>
                        </div>
                    </div>

                    {/* Botón para quitar el item  */}
                    <div className='absolute right-0 top-0'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="#D04444" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                </div>
                
            </div>
            
            <div className='border-l border-black h-full flex flex-col justify-center items-center text-center'>
                <span className=' font-semibold tracking-widest'>COSTO<br/>TOTAL</span>
                <span className='font-semibold text-5xl mt-2 mb-6'>
                    S/. 500.00
                </span>
                <button className='bg-[#618C03] py-3 px-9 text-white font-semibold text-2xl rounded-xl shadow-md shadow-gray-400' onClick={e => setModalRegistroVisible(true)}>
                    COMPRAR 
                </button>

            </div>
            
        </div>
    </div>
    <PedidoModalRegistro modalVisible = {modalRegistroVisible} setModalVisible = {setModalRegistroVisible} setModalInformativo = {setModalInformativo} setModalConfirmacion = {setModalConfirmacion}/>
    <ModalConfirmacionPedido modalVisible = {modalConfirmacion} setModalVisible = {setModalConfirmacion} setModalInformativo = {setModalInformativo}/>
    <ModalInformacionPedido modalVisible={modalInformativo} setModalVisible={setModalInformativo}/>
    </> 
}


