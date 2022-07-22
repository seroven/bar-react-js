
import "./detalle.css"

export const DetallePedido = () => {
    return (
        <div>
            <div>
                <div className="flex container mx-auto mt-5 ">
                    <div className="relative md:mt-10 ">
                        <h1 className="font-medium text-4xl text-center md:text-left text-[#022601]">Pedido N°322 | Comprado el 16/05/2022 | Total: S/. 1395.00</h1>
                    </div>
                </div>
                <div className=" container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-2">
                        <div className="py-10">
                            <div className="rounded-xl overflow-auto shadow-lg max-w-[70%] ">
                                <div className="w-full text-2xl font-semibold">
                                    <div className="tituloDetalle">
                                        <p className="text-4xl font-bold text-white mt-2 mb-2 text-center">Detalle Pedido</p>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 mt-2 ">
                                            <p>Fecha de Entrega:</p>
                                            <p className="text-right">15/05/2022</p>
                                        </div>
                                        <div className="grid grid-cols-2  mt-2 ">
                                            <p>Dni del Encargo de Recoger el Pedido:</p>
                                            <p className="text-right align-middle">7415458</p>
                                        </div>
                                        <div className="grid grid-cols-2  mt-2 ">
                                            <p>Estado del Pedido:</p>
                                            <p className="text-right">Pendiente</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="font-medium text-xl p-2 px-8 rounded-md  hover:text-green-900 text-white bg-[#97BF04] mt-5 mb-8 ">
                                            Editar
                                        </button>
                                        </div>
                                        
                                        <hr />
                                        <div className="mb-8">
                                            <p className="text-4xl font-bold text-[#618C03] mt-8">Datos del Cliente</p>
                                            <div className="grid grid-cols-2 mt-2 ">
                                                <p>Nombre:</p>
                                                <p className="text-right">Álvaro</p>
                                            </div>
                                            <div className="grid grid-cols-2 mt-2 ">
                                                <p>Apellidos:</p>
                                                <p className="text-right">Rosas Benavides</p>
                                            </div>
                                            <div className="grid grid-cols-2 mt-2 ">
                                                <p>DNI:</p>
                                                <p className="text-right">74582457</p>
                                            </div>
                                            <div className="grid grid-cols-2 mt-2 ">
                                                <p>Teléfono:</p>
                                                <p className="text-right">985125745</p>
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
                                        <p className="text-4xl font-bold mt-2 mb-2 ">Productos Solicitados</p>
                                    </div>
                                    <div className="producto">
                                        <div className="flex flex-row  border border-gray-200/80 bg-white p-6">
                                            <div>
                                                <img className="w-40 h-40 object-cover" src="../../../src/public/cervezas.jpg" />
                                            </div>

                                            <div className="flex flex-col px-6">
                                                <div className="flex h-8 flex-row mb-4 text-[#022601]">
                                                    <h2 className="text-4x1 font-bold">Cerveza Gratisss</h2>
                                                </div>
                                                <div className="grid grid-cols-3 font-semibold">
                                                    <div className="text-start">Cantidad:</div>
                                                    <div className="text-right">5</div>
                                                    <div className="text-center font-bold">SubTotal</div>
                                                    <div className="text-start">Costo Unitario:</div>
                                                    <div className="text-right">S/.15.00</div>
                                                    <div className="text-center font-bold">S/.75</div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}