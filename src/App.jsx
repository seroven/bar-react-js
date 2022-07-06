import { useState } from "react";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PageProducto } from "./pages/page-producto";
import { PageDetalle } from "./pages/page-detalle";
import { Register } from "./components/acceso.component/register";
import { Verificacion } from "./components/acceso.component/verificacion";
import { Olvidaste } from "./components/acceso.component/olvidaste";
import { PageAcceso } from "./pages/page-acceso";
import { Login } from "./components/inicio-component/login";
import { PageRegistroProducto } from "./pages/page-registro-producto";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Routes>
          <Route path="/" element={<PageProducto />} />
          <Route path="/:id" element={<PageDetalle />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/registro/acceso" element={<PageAcceso />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/olvidaste" element={<Olvidaste />} />
          <Route path="/olvidaste/verificacion" element={<Verificacion />} />
          <Route path="/producto/registro" element={<PageRegistroProducto />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
