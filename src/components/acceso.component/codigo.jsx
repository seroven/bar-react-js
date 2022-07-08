import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { CodigoState } from "../../storage/atom/codigo.atom";
import { RegisterState } from "../../storage/atom/register.atom";
import { TempUserState } from "../../storage/atom/temp-user.atom";
import { UserState } from "../../storage/atom/usuario.atom";

export const ConfirmacionCodigo = () => {
  const navigate = useNavigate();
  const codigo = useRecoilValue(CodigoState);
  const usuario = useRecoilValue(UserState);
  const [registerUser, setRegisterUser] = useRecoilState(RegisterState);
  const [tempUser, setTempUser] = useRecoilState(TempUserState);

  const {                                                                               
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onAccesoSubmit = (data) => {
    let cod = "";
    for (let i = 1; i <= 6; i++) {
      cod += data[i];
    }

    if (cod == codigo) {
      if (registerUser) {
        navigate("/acceso/login");
        axios.post("http://localhost:8069/usuario", {
          contrasena: tempUser.password,
          correo: tempUser.email,
          rol: {
            codigo: 2,
            nombre: "cliente",
          },
        });
      } else {
        navigate("/acceso/reestablecer/verificacion");
      }
    } else {
      alert("el codigo es incorrecto");
    }
  };

  return (
    <div>
      <div className="bg">
        <div className="flex flex-row min-h-screen  justify-center text-center items-center">
          <div className="card-acceso">
            <div className="titulo-codigo">
              Se envío un mensaje de confirmación a su correo
            </div>
            <form onSubmit={handleSubmit(onAccesoSubmit)}>
              <h1 className="text-2xl font-semibold my-3 mt-32 tracking-tight">
                Ingrese código de verificación
              </h1>
              <div className="gap-2 flex justify-center py-6">
                <input
                  {...register("1", {
                    required: true,
                    maxLength: 1,
                    minLength: 1,
                  })}
                  maxLength={1}
                  minLength={1}
                  type="text"
                  className="input-codigo"
                />
                <input
                  {...register("2", {
                    required: true,
                    maxLength: 1,
                    minLength: 1,
                  })}
                  maxLength={1}
                  minLength={1}
                  className="input-codigo"
                  type="text"
                />
                <input
                  {...register("3", {
                    required: true,
                    maxLength: 1,
                    minLength: 1,
                  })}
                  maxLength={1}
                  minLength={1}
                  className="input-codigo"
                  type="text"
                />
                <input
                  {...register("4", {
                    required: true,
                    maxLength: 1,
                    minLength: 1,
                  })}
                  maxLength={1}
                  minLength={1}
                  className="input-codigo"
                  type="text"
                />
                <input
                  {...register("5", {
                    required: true,
                    maxLength: 1,
                    minLength: 1,
                  })}
                  maxLength={1}
                  minLength={1}
                  className="input-codigo"
                  type="text"
                />
                <input
                  {...register("6", {
                    required: true,
                    maxLength: 1,
                    minLength: 1,
                  })}
                  maxLength={1}
                  minLength={1}
                  className="input-codigo"
                  type="text"
                />
              </div>
              <button className="buttons mt-10 px-10 text-lg font-bold tracking-wider">
                VERIFICAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
