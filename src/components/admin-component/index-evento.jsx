import { Route, Routes } from "react-router-dom";
import { Eventos } from "../eventos-component/catalogo-eventos";

export const IndexEvento = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
           <Eventos admin={true} />
        }></Route>
      </Routes>
    </>
  );
};
