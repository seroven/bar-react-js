import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ActualizarProducto } from "../producto-component/actualizar/actualizar-producto";
import { Catalago } from "../producto-component/catalogo";
import { CatalagoSkeleton } from "../producto-component/catalogo/skeleton";
import { RegistroProducto } from "../producto-component/registro/registro-producto";

export const IndexProducto = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback = {<CatalagoSkeleton/>}>
            <Catalago admin={true} />
          </Suspense>
        }></Route>
        <Route path="registro" element={<RegistroProducto />}></Route>
        <Route path="/:id" element={<ActualizarProducto />}></Route>
      </Routes>
    </>
  );
};
