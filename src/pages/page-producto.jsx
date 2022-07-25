import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ActualizarProducto } from "../components/producto-component/actualizar/actualizar-producto";
import { Catalago } from "../components/producto-component/catalogo";
import { CatalagoSkeleton } from "../components/producto-component/catalogo/skeleton";
import { Detalle } from "../components/producto-component/detalle/detalle";
import { Header } from "../components/producto-component/header";

export const PageProducto = () => {
  return (
    <div>
      <Header admin={false} />
      <div className="p-8">
        <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<CatalagoSkeleton />}>
                  <Catalago />
                </Suspense>
              }
            />
          <Route path="/:id" element={<Detalle />}></Route>
          <Route path="/admin/:id" element={<ActualizarProducto />}></Route>
        </Routes>
      </div>
      <Link to = "/">
        <div className="absolute bottom-14 left-12 p-4 bg-[#618c03] rounded-full hover:scale-110 transition-[transform]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
        </div>
      </Link>
    </div>
  );
};
