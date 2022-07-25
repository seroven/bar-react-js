import { RecoilRoot, useRecoilState } from "recoil";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { PageProducto } from "./pages/page-producto";
import { PageAcceso } from "./pages/page-acceso";
import { PageAdministrador } from "./pages/page-administrador";
import { PageNotFound } from "./pages/page-not-found";
import { UserState } from "./storage/atom/usuario.atom";
import { PageInicio } from "./pages/page-inicio";
import { PagePedidos } from "./pages/page-pedidos";
import { ClienteState } from "./storage/atom/cliente.atom";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [usuario, setUsuario] = useRecoilState(UserState);
  const [cliente, setCliente] = useRecoilState(ClienteState);
  const navigate = useNavigate();

  useEffect(() => {
    extraerUsuarioLocalStorage();
  },[])

  const extraerUsuarioLocalStorage = async () => {
    const usuario = localStorage.getItem("usuario_bar");
    if (usuario !== null) {
      const codusuario = JSON.parse(usuario);
      setUsuario(codusuario);
      const cliente = await axios.get(
        "http://localhost:8069/cliente/byUser/" + codusuario.codigo
      );
      setCliente(cliente.data);
      
      if (codusuario.rol.codigo === 1){
        navigate("/admin/pedido");
      }
    }
  };


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
