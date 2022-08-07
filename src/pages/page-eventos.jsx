import { startTransition, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Eventos } from "../components/eventos-component/catalogo-eventos";
import { HeaderEvent } from "../components/eventos-component/header-event";
import { LoaderEvento } from "../components/eventos-component/loader-evento";

export const PageEventos = () => {
  return (
    <>
      <HeaderEvent />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoaderEvento />}>
              <Eventos />
            </Suspense>
          }
        ></Route>
      </Routes>
    </>
  );
};
