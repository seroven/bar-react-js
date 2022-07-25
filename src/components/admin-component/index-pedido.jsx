import { Route, Routes } from "react-router-dom"
import { DetallePedidoAdmin } from "./pedido/detalle/detalle-pedido"
import { ListadoPedido } from "./pedido/listado-pedido"


export const IndexPedido = () => {

    return <>
        <div className="container mx-auto">
            <Routes>
                <Route path="/" element={<ListadoPedido/>}></Route>
                <Route path="/detalle/:id" element = {<DetallePedidoAdmin/>}></Route>
            </Routes>
        </div>
    </>
}