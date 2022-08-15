import { Route, Routes } from "react-router-dom";
import { Historial } from "../components/compras-component/historial/historial";
import { CarritoCompras } from "../components/compras-component/pedidos/carrito-compras";
import { Header } from "../components/producto-component/header";
import { DetallePedido } from "../components/compras-component/detalle/detalle";
import { HomeButton } from "../components/reutilizable/home-button";

export const PagePedidos = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/historial" element={<Historial />}></Route>
        
          <Route path="/detalle/:id" element={
          <div className="p-8 container mx-auto mt-5">
              <DetallePedido />
            </div>
            }></Route>
          <Route path="/carrito" element={
          <div className="p-8 container mx-auto mt-5">
            <CarritoCompras />
          </div>
          }>
            {" "}
          </Route>
      </Routes>
      <HomeButton />
    </div>
  );
};
