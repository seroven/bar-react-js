import { Route, Routes } from "react-router-dom";
import { Historial } from "../components/compras-component/historial/historial";
import { Header } from "../components/producto-component/header";
import {DetallePedido} from "../components/compras-component/detalle/detalle";
import { ActualizarPedido } from "../components/compras-component/actualizar/actualizar-pedido";

export const PagePedidos = () => {
    return (
        <div>
            <Header/>
            <div className="p-8">
                <Routes>
                    <Route path ="/cliente/:id" element = {<Historial/>}></Route>
                    <Route path ="/detalle" element ={<DetallePedido/>}></Route>
                </Routes>
            </div>
        </div>
    );
};
