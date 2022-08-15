import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ClienteState } from "../../storage/atom/cliente.atom";
import { UserState } from "../../storage/atom/usuario.atom";

export const LandingPart1 = () => {

  const [usuario, setUsuario] = useRecoilState(UserState);
  const [cliente, setCliente] = useRecoilState(ClienteState);

  const cerrarSesion = () => {
    setCliente(null);
    setUsuario({
      codigo: 0,
      correo: "",
      contrasena: "",
      rol: {
        codigo: 0,
        nombre: ""
      }});

  }

  return (
    <>
      <div className="bg-[#618C03]">
        <nav className="nav px-10">
          <div className="nav-position">
            <Link to="/">
              <div className="flex items-center space-x-5">
                <img
                  src="../../../src/public/cervecitas.png"
                  className="mr-3 w-16 h-16 sm:h-16 rounded-full"
                />
                <span className="self-center font-mono text-3xl font-semibold whitespace-nowrap text-white">
                  Bar La China
                </span>
              </div>
            </Link>
            <ul className="flex flex-col text-white mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-md md:font-medium pr-2">
              {
                usuario.codigo === 0 
                ? <Link
                    to="/acceso/login"
                    className="block py-2 pr-4 pl-3 border-b border-gray-100  md:border-0 md:p-0"
                  >
                    <li className="buttons lg:px-10 px-5">Inicio Sesión</li>
                  </Link>
                : 
                <>
                {
                  usuario.rol.codigo === 1 &&
                  <Link
                    to="/admin/pedido"
                    className="block py-2 pr-4 pl-3 border-b  md:border-0 md:p-0"
                  >
                    <li className="buttons lg:px-10 px-5 ">Vista Administrador</li>
                  </Link>
                }
                  <button className="buttons lg:px-10 px-5" onClick={e => cerrarSesion()}>Cerrar Sesión</button>
                </>
                
              }
            </ul>
          </div>
        </nav>
        <div className="flex gap-5 container  mx-auto mt-5">
          <div className=" text-white p-10 pt-0 w-[55rem]">
            <h1 className="text-[100px] font-extrabold mt-3">Bar La China</h1>
            <p className="text-[56px] font-medium  leading-tight tracking-wide my-9">
              Nuestra cervecería nacional es sínonimo de sabor y tradición.
            </p>
          </div>
          <div className="absolute right-10 top-44">
            <img
              className="object-cover h-[30rem]  w-[30rem] rounded-3xl"
              src="../../../src/public/landing-image.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-5 container mx-auto mt-5">
          <div className="p-10 w-[55rem] justify-center space-y-6">
            <h1 className="text-center text-[#618C03] font-bold  text-3xl">
              Tenemos para ti
            </h1>
            <ul className="flex space-x-20 justify-center pt-3 pl-10 font-bold text-lg">
              <li className="">Venta de Bebidas</li>
              <li className="">Entretenimiento</li>
              <li className="">La mejor atención y seguridad</li>
            </ul>
          </div>
          <div className="p-10 pl-0 justify-center w-[23rem] space-y-6 self-center ml-auto">
            <ul className="flex space-x-9 mt-5">
              <li className="">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
                  alt=""
                  width={50}
                />
              </li>
              <li className="">
                <img
                  src="https://www.svgrepo.com/show/22753/whatsapp-logo-variant.svg"
                  alt=""
                  width={50}
                />
              </li>
              <li className="">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/20/20837.png"
                  alt=""
                  width={50}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
