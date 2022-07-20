import { Route, Routes } from "react-router-dom";
import { Historial } from "../components/compras-component/historial/historial";
import { Header } from "../components/producto-component/header";

export const PagePedidos = () => {
    return (
        <div>
            <Header/>
            <div className="p-8">
                <Routes>
                    <Route path ="/cliente/:id" element = {<Historial/>}></Route>
                </Routes>
            </div>
        </div>
    );
};
