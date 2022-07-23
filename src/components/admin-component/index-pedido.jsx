import { Route, Routes } from "react-router-dom"
import { ListadoPedido } from "./pedido/listado-pedido"


export const IndexPedido = () => {

    return <>
        <div className="container mx-auto">
            <Routes>
                <Route path="/" element={<ListadoPedido/>}></Route>
            </Routes>
        </div>
    </>
}