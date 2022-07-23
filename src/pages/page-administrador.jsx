import { Route, Routes } from "react-router-dom"
import { IndexPedido } from "../components/admin-component/index-pedido"
import { IndexProducto } from "../components/admin-component/index-producto"
import { Catalago } from "../components/producto-component/catalogo"
import { Header } from "../components/producto-component/header"


export const PageAdministrador = () => {
    return (
    <>
      <Header admin = {true}/>
      <div className="p-8">
        <Routes>
            <Route path = "/producto/*" element = {<IndexProducto/>}></Route>
            <Route path = "/pedido/*" element = {<IndexPedido/>}></Route>
        </Routes>
      </div>
    </>
    )
}