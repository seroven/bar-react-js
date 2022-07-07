import { Route, Routes } from "react-router-dom";
import { Catalago } from "../components/producto-component/catalogo";
import { Detalle } from "../components/producto-component/detalle/detalle";
import { Header } from "../components/producto-component/header";

export const PageProducto = () => {
  return (
    <div>
      <Header admin = {false}/>
      <div className="p-8">
        <Routes>
          <Route path = "/:id" element = {<Detalle/>}></Route>
        </Routes>
        <Catalago admin = {false}/>
      </div>
    </div>
  );
};
