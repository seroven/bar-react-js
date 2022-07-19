import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { productoSelector } from "../../../storage/selector/producto-selector";
import axios from "axios";

export const ActualizarProducto = () => {
  const [producto, setProducto] = useState([]);
  const refresh = useRecoilRefresher_UNSTABLE(productoSelector);
  const navigate = useNavigate();
  const [marca, setMarca] = useState([]);
  const [modal, setModal] = useState(false);
  const { id } = useParams();
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
    await axios.put("http://localhost:8069/producto/update/" + id, {
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
    navigate("/admin/producto");
  };

  useEffect(() => {
    axios.get("http://localhost:8069/marca/all").then((res) => {
      setMarca(res.data);
    });
    axios.get("http://localhost:8069/producto/" + id).then((res) => {
      setProducto(res.data);
    });
  }, []);

  return (
    <>
      <div
        className={
          "p-4 lg:px-10  align-middle mx-auto flex flex-col lg:gap-10 items-center " +
          (modal ? "blur-md" : null)
        }
      >
        <h1 className="text-4xl font-bold">Actualizar Producto</h1>
        <form className="mt-6" onSubmit={handleSubmit(onModalClick)}>
          <div className="mb-6 flex flex-row">
            <label className="block w-full self-center text-lg font-medium text-gray-900 ">
              Id del Producto:
            </label>
            <input
              readOnly
              type="text"
              className="shadow-sm input border-2 text-center border-gray-500 text-gray-900 text-sm rounded-lg w-10 block p-2.5"
              value={producto.codigo}
            />
          </div>
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
              autoFocus
              defaultValue={producto.descripcion}
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
              defaultValue={producto.precio}
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
              defaultValue={producto.imagen}
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
              Marca:
            </label>
            <select
              {...register("marca", {
                required: true,
              })}
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              {marca.map((marca) => (
                <option
                  key={marca.codigo}
                  value={marca.codigo}
                  selected={producto.marca.codigo === marca.codigo}
                >
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full border-b-2 mb-4"></div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <label className="self-center text-lg font-medium text-gray-900 ">
                Habilitado:
              </label>
              <input
                {...register("habilitado")}
                id="terms"
                type="checkbox"
                defaultChecked={producto.estado}
                value=""
                className="w-4 ml-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
          </div>
          <div className="w-full p-10 pb-0 justify-center object-center text-center space-x-24">
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
              Actualizar
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
                ¿Estas seguro de actualizar el Producto?
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
      ;
    </>
  );
};
