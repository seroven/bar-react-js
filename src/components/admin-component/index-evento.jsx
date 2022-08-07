import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Eventos } from "../eventos-component/catalogo-eventos";
import { LoaderEvento } from "../eventos-component/loader-evento";

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
      </Routes>
    </>
  );
};
