import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Eventos } from "../eventos-component/catalogo-eventos";
import { LoaderEvento } from "../eventos-component/loader-evento";
import { ActualizarEvento } from "./evento/actualizar-evento";
import { RegistrarEvento } from "./evento/registro-evento";

export const IndexEvento = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoaderEvento />}>
              <Eventos admin={true} />
            </Suspense>
          }
        ></Route>
        <Route path="/registro" element={<RegistrarEvento/>}></Route>
        <Route path="/actualizar" element={<ActualizarEvento/>}></Route>
      </Routes>
    </>
  );
};
