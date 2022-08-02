import axios from "axios";
import "./registro-producto.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { productoSelector } from "../../../storage/selector/producto-selector";

export const RegistroProducto = () => {
  const [producto, setProducto] = useState([]);
  const refresh = useRecoilRefresher_UNSTABLE(productoSelector);
  const navigate = useNavigate();
  const [marca, setMarca] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMarca, setModalMarca] = useState(false);
  const [deleteMarca, setDeleteMarca] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onModalClick = (data) => {
    setModal(true);
    console.log(data);
    setProducto(data);
  };

  const onRegresarClick = () => {
    navigate("/admin/producto");
  };

  const onCancelarClick = () => {
    setModal(false);
  };

  const onAceptarClick = async () => {
    await axios.post("http://localhost:8069/producto/save", {
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      estado: producto.habilitado,
      marca: {
        codigo: producto.marca,
      },
    });
    refresh();
    setModal(false);
    navigate("/");
  };

  useEffect(() => {
    axios.get("http://localhost:8069/marca/all").then((res) => {
      setMarca(res.data);
    });
  }, []);

  return (
    <>
      <div
        className={
          "p-4 lg:px-10  align-middle mx-auto flex flex-col lg:gap-10 items-center " +
          (modal || modalMarca || deleteMarca ? "blur-md" : null)
        }
      >
        <h1 className="text-4xl font-bold">Registrar Producto</h1>
        <form className="mt-10" onSubmit={handleSubmit(onModalClick)}>
          <div className="mb-6 flex flex-row">
            <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
              Descripción:
            </label>
            <input
              {...register("descripcion", {
                required: {
                  value: true,
                  message: "La descripción es requerida",
                },
                minLength: {
                  value: 3,
                  message: "La descripción debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "La descripción debe tener máximo 50 caracteres",
                },
              })}
              type="text"
              className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg w-full block p-2.5"
            />
          </div>
          {errors.descripcion && (
            <div className="text-red-500 mb-5 border-b-2">
              {errors.descripcion.message}
            </div>
          )}

          <div className="mb-6 flex">
            <label className="block w-full self-center text-lg font-medium text-gray-900 ">
              Precio (S/.):
            </label>
            <input
              {...register("precio", {
                required: {
                  value: true,
                  message: "El precio es requerido",
                },
              })}
              type="number"
              step="any"
              className="shadow-sm input  border-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-32 p-2.5 "
            />
          </div>
          {errors.precio && (
            <div className="text-red-500 mb-5 border-b-2">
              {errors.precio.message}
            </div>
          )}
          <div className="mb-6 flex">
            <label className="block w-96 self-center text-lg font-medium text-gray-900">
              Imagen:
            </label>
            <input
              {...register("imagen", {
                required: {
                  value: true,
                  message: "La imagen es requerida",
                },
              })}
              type="text"
              className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          {errors.imagen && (
            <div className="text-red-500  mb-5 border-b-2">
              {errors.imagen.message}
            </div>
          )}
          <div className="mb-6 flex ">
            <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
              Categoria:
            </label>
            <select
              {...register("marca", {
                required: true,
              })}
              id="countries"
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              {marca.map((marca) => (
                <option key={marca.codigo} value={marca.codigo}>
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 flex">
            <label className="block w-96 self-center pr-28 text-lg font-medium text-gray-900 ">
              Marca:
            </label>
            <select
              {...register("marca", {
                required: true,
              })}
              id="countries"
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              {marca.map((marca) => (
                <option key={marca.codigo} value={marca.codigo}>
                  {marca.nombre}
                </option>
              ))}
            </select>
            <div className="flex ml-2 space-x-2">
              <div className="w-10 h-10 buttons">
                <button type="button" onClick={() => setModalMarca(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current text-white"
                  >
                    <path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"></path>
                  </svg>
                </button>
              </div>
              <div className="w-10 h-10 buttons-red">
                <button type="button" onClick={() => setDeleteMarca(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current text-white"
                  >
                    <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full border-b-2 mb-6"></div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <label className="self-center text-lg font-medium text-gray-900 ">
                Habilitado:
              </label>
              <input
                {...register("habilitado")}
                id="terms"
                type="checkbox"
                value=""
                className="w-4 ml-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
          </div>
          <div className="w-full p-10 mb-2 justify-center object-center text-center space-x-24">
            <button
              onClick={onRegresarClick}
              className="p-2 px-8 rounded-md hover:text-red-900 text-white bg-[#e74263]"
            >
              Regresar
            </button>
            <button
              type="submit"
              className="p-2 px-8 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              onSubmit={onModalClick}
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
      <div
        id="popup-modal"
        className={
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex " +
          (modal ? "block" : "hidden")
        }
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-[#97BF04]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-9 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de registrar un Nuevo Producto?
              </h3>
              <button
                onClick={onAceptarClick}
                data-modal-toggle="popup-modal"
                type="button"
                className="p-2 px-6 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              >
                Si, Estoy seguro
              </button>
              <button
                onClick={onCancelarClick}
                data-modal-toggle="popup-modal"
                type="button"
                className="ml-5 p-2 px-6 rounded-md hover:text-red-900 text-white bg-[#e74263]"
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="popup-modal"
        className={
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex " +
          (modalMarca ? "block" : "hidden")
        }
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-2 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
            <div className="p-6 text-center">
              <div className="my-10 text-4xl font-medium text-gray-500 dark:text-gray-400">
                Registrar Marca
              </div>
              <div>
                <div className="mb-6 flex ">
                  <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                    Categoria:
                  </label>
                  <select
                    {...register("marca", {
                      required: true,
                    })}
                    id="countries"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    {marca.map((marca) => (
                      <option key={marca.codigo} value={marca.codigo}>
                        {marca.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-10 flex">
                  <label className="block w-96 self-centertext-lg font-medium text-lg text-gray-900 ">
                    Marca:
                  </label>
                  <input
                    type="text"
                    className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="p-2 px-6 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              >
                Agregar
              </button>
              <button
                onClick={() => setModalMarca(false)}
                data-modal-toggle="popup-modal"
                type="button"
                className="ml-5 p-2 px-6 rounded-md hover:text-red-900 text-white bg-[#e74263]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="popup-modal"
        className={
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex " +
          (deleteMarca ? "block" : "hidden")
        }
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-2 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 w-14 h-14 fill-current text-[#97BF04] "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="m10.933 13.519-2.226-2.226-1.414 1.414 3.774 3.774 5.702-6.84-1.538-1.282z"></path>
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
              </svg>
              <div className="mb-9">
                <h1 className=" text-xl font-normal text-gray-800">
                  ¿Estas seguro de eliminar la Marca?
                </h1>
                <p className="my-2 text-gray-400">
                  Nunca más lo volverás a ver
                </p>
              </div>
              <button
                onClick={onAceptarClick}
                data-modal-toggle="popup-modal"
                type="button"
                className="p-2 px-6 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              >
                Si, estoy seguro
              </button>
              <button
                onClick={() => setDeleteMarca(false)}
                data-modal-toggle="popup-modal"
                type="button"
                className="ml-5 p-2 px-6 rounded-md hover:text-red-900 text-white bg-[#e74263]"
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
