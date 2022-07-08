import { useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PageProducto } from "./pages/page-producto";
import { PageAcceso } from "./pages/page-acceso";
import { PageAdministrador } from "./pages/page-administrador";
import { PageNotFound } from "./pages/page-not-found";
import { UserState } from "./storage/atom/usuario.atom";

function App() {
  const [usuario, setUsuario] = useRecoilState(UserState);

  console.log(usuario.rol.codigo);
  return (
    <Routes>
      <Route path="/producto/*" element={<PageProducto />} />
      <Route path="/acceso/*" element={<PageAcceso />} />
      <Route path="/admin/*" element={usuario.rol.codigo == 1 ? <PageAdministrador/> : <PageNotFound/>} />
      <Route path="/notfound" element={<PageNotFound />} />
      
    </Routes>
  );
}

export default App;
