import { Route, Routes } from "react-router-dom";
import { ConfirmacionCodigo } from "../components/acceso.component/codigo";
import { ConfirmacionCorreo } from "../components/acceso.component/confirmacion-correo";
import { Register } from "../components/acceso.component/register";
import { Verificacion } from "../components/acceso.component/verificacion";
import { Login } from "../components/inicio-component/login";



export const PageAcceso = () => {
  return <>
    <Routes>
      <Route path ="registro" element = {<Register/>}></Route>
      <Route path="login" element={<Login />} />
      <Route path="codigo" element={<ConfirmacionCodigo />} />
      <Route path="reestablecer" element={<ConfirmacionCorreo />} />
      <Route path="reestablecer/verificacion" element={<Verificacion />} />
    </Routes>
  </>
};
