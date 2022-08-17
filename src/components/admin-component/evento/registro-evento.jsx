import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Modal_Conf } from "./modal-conf-registro";

export const RegistrarEvento = () => {
  const [modal_conf, setModal_conf] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onRegistrarEventoSubmit = (data) => {
    setData(data);
    setModal_conf(true);
  };

  return (
    <>
      <div className={modal_conf ? "blur-md" : null}>
        <div className="p-4 lg:px-10  align-middle mx-auto flex flex-col lg:gap-10 items-center w-[50rem]">
          <div className=" w-full flex justify-between">
            <h1 className="block w-96 self-center text-4xl font-bold">
              Registrar Evento
            </h1>
            <button
              type="submit"
              className="w-40 block p-2.5 ml-10 rounded-md  hover:text-green-900 text-white bg-[#FCD43E]"
            >
              Regresar
            </button>
          </div>

          <form
            className="mt-4 w-full"
            onSubmit={handleSubmit(onRegistrarEventoSubmit)}
          >
            <div className="mb-6 flex flex-row">
              <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                Titulo de evento:
              </label>
              <input
                type="text"
                className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg w-full block p-2.5"
                {...register("titulo", {
                  required: {
                    value: true,
                    message: "El titulo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/,
                    message: "El titulo solo puede contener letras y numeros",
                  },
                  maxLength: {
                    value: 80,
                    message: "El titulo no puede contener mas de 80 caracteres",
                  },
                })}
              />
            </div>
            {errors.titulo && (
              <div className="text-red-500 mb-5 border-b-2">
                {errors.titulo.message}
              </div>
            )}

            <div className="mb-6 flex flex-row">
              <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                Descripción:
              </label>
              <input
                type="text"
                className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg w-full block p-2.5"
                {...register("descripcion", {
                  required: {
                    value: true,
                    message: "La descripción es requerida",
                  },
                  maxLength: {
                    value: 150,
                    message:
                      "La descripción no puede contener mas de 150 caracteres",
                  },
                })}
              />
            </div>
            {errors.descripcion && (
              <div className="text-red-500 mb-5 border-b-2">
                {errors.descripcion.message}
              </div>
            )}
            <div className="mb-6 flex flex-row">
              <label className="block w-[11.4rem] self-center text-lg font-medium text-gray-900 ">
                Fecha:
              </label>
              <input
                type="date"
                className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg block ml-16 w-30 p-2.5"
                {...register("fecha", {
                  required: {
                    value: true,
                    message: "La fecha es requerida",
                  },
                })}
              />
            </div>
            {errors.fecha && (
              <div className="text-red-500 mb-5 border-b-2">
                {errors.fecha.message}
              </div>
            )}
            <div className="mb-6 flex flex-row">
              <label className="block w-[11.4rem] self-center text-lg font-medium text-gray-900 ">
                Hora:
              </label>
              <input
                type="time"
                className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg block ml-16 w-30 p-2.5"
                {...register("hora", {
                  required: {
                    value: true,
                    message: "La hora es requerida",
                  },
                })}
              />
            </div>
            {errors.hora && (
              <div className="text-red-500 mb-5 border-b-2">
                {errors.hora.message}
              </div>
            )}
            <div className="flex">
              <label className="block w-96 self-center text-lg font-medium text-gray-900">
                Imagen Principal:
              </label>
              <input
                type="text"
                className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("imagen", {
                  required: {
                    value: true,
                    message: "La imagen es requerida",
                  },
                })}
              />
            </div>
            {errors.imagen && (
              <div className="text-red-500 mb-5 border-b-2">
                {errors.imagen.message}
              </div>
            )}
            <div className="mb-6 flex">
              <label className="block w-96 self-center mt-10 text-lg font-medium text-gray-900">
                Imagenes Secundarias:
              </label>
              <input
                type="text"
                placeholder="(opcional)"
                className="shadow-sm input border-2 mt-10  text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("imagenS1")}
              />
            </div>

            <div className="mb-6 flex">
              <label className="block w-96 self-center text-lg "></label>
              <input
                type="text"
                placeholder="(opcional)"
                className="shadow-sm input border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("imagenS2")}
              />
            </div>

            <div className="w-full border-b-2 mb-6"></div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <label className="self-center text-lg font-medium text-gray-900 ">
                  Habilitado:
                </label>
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 ml-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  {...register("habilitado")}
                />
              </div>
            </div>
            <div className="w-full p-10 mb-2 justify-center object-center text-center space-x-24">
              <button
                typeof="button"
                className="p-2 px-8 rounded-md hover:text-red-900 text-white bg-[#e74263]"
                onClick={() => {
                  navigate("/admin/evento");
                }}
              >
                Cancelar
              </button>
              <button
                typeof="button"
                className="p-2 px-8 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal_Conf
        modal_conf={modal_conf}
        setModal_conf={setModal_conf}
        data={data}
      />
    </>
  );
};
