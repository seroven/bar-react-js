import { useState } from "react";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PageProducto } from "./pages/page-producto";
import { PageAcceso } from "./pages/page-acceso";
import { PageAdministrador } from "./pages/page-administrador";
import { PageNotFound } from "./pages/page-not-found";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Routes>
          <Route path="/producto/*" element={<PageProducto />} />
          <Route path="/acceso/*" element={<PageAcceso />} />
          <Route path="/admin/*" element={<PageAdministrador />} />
          <Route path="/notfound" element={<PageNotFound/>}/>
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
