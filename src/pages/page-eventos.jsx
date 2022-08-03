import { Route, Routes } from "react-router-dom";
import { Eventos } from "../components/eventos-component/catalogo-eventos";
import { HeaderEvent } from "../components/eventos-component/header-event";

export const PageEventos = () => {
  return <>
    <HeaderEvent/>
    <Routes>

      <Route path = "/" element = {<Eventos/>}></Route>

    </Routes>
    
  </>
};
