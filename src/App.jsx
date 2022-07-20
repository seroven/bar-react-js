import { useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PageProducto } from "./pages/page-producto";
import { PageAcceso } from "./pages/page-acceso";
import { PageAdministrador } from "./pages/page-administrador";
import { PageNotFound } from "./pages/page-not-found";
import { UserState } from "./storage/atom/usuario.atom";
import { PageInicio } from "./pages/page-inicio";
import { PagePedidos } from "./pages/page-pedidos";

function App() {
  const [usuario, setUsuario] = useRecoilState(UserState);

  return (
    <Routes>
      <Route path="/producto/*" element={<PageProducto />} />
      <Route path="/acceso/*" element={<PageAcceso />} />
      <Route path="/pedido/*" element={<PagePedidos/>}/>
      <Route
        path="/admin/*"
        element={
          usuario.rol.codigo == 1 ? (
            <PageAdministrador />
          ) : (
            <PageNotFound />
          )
        }
      />
      <Route path="/" element={<PageInicio/>}/>
      <Route path="/notfound" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
