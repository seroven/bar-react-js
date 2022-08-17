import axios from "axios";
import { useForm } from "react-hook-form";
import { Router, useHref, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CodigoState } from "../../storage/atom/codigo.atom";
import { TempUserState } from "../../storage/atom/temp-user.atom";
import { UserState } from "../../storage/atom/usuario.atom";
import "./acceso.css";

export const Register = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useRecoilState(CodigoState);
  const [tempUser, setTempUser] = useRecoilState(TempUserState);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const sendEmail = (email, codigo) => {
    axios.post("https://app-email-rest.herokuapp.com/api", {
      email: email,
      asunto: "Código de verificación",
      mensaje: `Su código de verificación es: ${codigo}`,
    });
  };

  const onRegistrarSubmit = (data) => {
    const cod = Math.floor(100000 + Math.random() * 900000);
    navigate("/acceso/codigo");
    setCodigo(cod);
    setTempUser(data);
    sendEmail(data.email, cod);
  };

  return (
    <div className="bg">
      <div className="flex flex-row min-h-screen justify-center text-center items-center ">
        <form
          onSubmit={handleSubmit(onRegistrarSubmit)}
          className="card-acceso"
        >
          <h1 className="titulo">Regístrate</h1>
          <>
            <label className="block mb-2 text-lg  font-bold text-gray-900 ">
              Correo
            </label>
            <div className="relative mb-6 px-10">
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo es requerido",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El correo no es válido",
                  },
                })}
                type="text"
                id="input-group-1"
                autoFocus
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="text-red-900 text-lg italic">
                  {errors.email.message}
                </p>
              )}
            </div>
          </>
          <>
            <label className="block mb-2 text-lg  font-bold text-gray-900 ">
              Contraseña
            </label>
            <div className="relative px-10">
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                type="password"
                id="website-admin"
                className="rounded-lg border-2 bg-gray-50 text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder=""
              />
              {errors.password && (
                <p className="text-red-900 text-lg italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="buttons  mt-10 px-14">REGISTRAR</button>
          </>
        </form>
      </div>
    </div>
  );
};
