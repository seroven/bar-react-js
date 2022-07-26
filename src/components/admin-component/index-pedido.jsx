import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { DetallePedidoAdmin } from "./pedido/detalle/detalle-pedido"
import { FiltroPedido } from "./pedido/filtro-pedido"
import { ListadoPedido } from "./pedido/listado-pedido"


export const IndexPedido = () => {

    return <>
        <div className="container mx-auto">
            <Routes>
                <Route path="/" element={<>
                    <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
                        Lista de Pedidos
                    </h1>
                    
                    <FiltroPedido/>
                    <br/>
                    <Suspense fallback = {<div className="bg-green-600 w-36 h-56"></div>}>
                        <ListadoPedido/>
                    </Suspense>
                </>}></Route>
                <Route path="/detalle/:id" element = {<DetallePedidoAdmin/>}></Route>
            </Routes>
        </div>
    </>
}