import { Route, Routes } from "react-router-dom";
import { Catalago } from "../producto-component/catalogo";
import { RegistroProducto } from "../producto-component/registro/registro-producto";

export const IndexProducto = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Catalago admin={true} />}></Route>
        <Route path="registro" element={<RegistroProducto />}></Route>
      </Routes>
    </>
  );
};
