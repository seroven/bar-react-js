import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./historial.css"

export const Historial = () => {
    const { id } = useParams();
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8069/pedido/all/" + id)
            .then(response => setPedidos(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div>
                <div className="flex gap-5 container mx-auto mt-5 ">
                    <div className="relative md:mt-10 ">
                    <h1 className="font-medium text-4xl text-center md:text-left text-[#022601]">Mis Pedidos</h1>
                        {pedidos?.map(pedido => (
                            <>
                                <div className="border-2 border-[#97BF04] p-2 my-5">
                                    <div className="grid gap-x-20 grid-cols-3 px-20 my-5 h-[50%]">
                                        <div className="col-span-2 border-2 border-[#97BF04]">
                                            <h2 className="font-medium text-xl p-2 px-8 text-[#97BF04] text-center">N° Pedido: {pedido.cod_pedido}</h2>
                                        </div>
                                        <button
                                            type="submit"
                                            className="font-medium text-xl p-2 px-8 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
                                        >
                                            Ver Detalle
                                        </button>
                                    </div>
                                    <div className="grid gap-x-20 grid-cols-3 px-20 my-5 h-[50%]">
                                        <div className="relative mt-2 rounded">
                                            <p className="py-2 pr-3 pl-10 w-full "><b>Fecha de Solicitud:</b> {pedido.fecha_solicitud}</p>
                                                <div className="absolute inset-y-0 left-0 flex items-center">
                                                <svg 
                                                xmlns="http://www.w3.org/2000/svg"
                                                className=" h-6 w-6 mx-3"
                                                fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="relative mt-2 rounded">
                                            <p className="py-2 pr-3 pl-10 w-full"><b>Fecha de Envío:</b> {pedido.fecha_envio}</p>
                                            <div className="absolute inset-y-0 left-0 flex items-center">
                                                <svg 
                                                xmlns="http://www.w3.org/2000/svg"
                                                className=" h-6 w-6 mx-3"
                                                fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )


}