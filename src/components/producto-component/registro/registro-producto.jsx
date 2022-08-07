import axios from "axios";
import "./registro-producto.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { productoSelector } from "../../../storage/selector/producto-selector";
import {ModalEliminarMarca} from "./modal-eliminar-marca";
import {ModalRegistroMarca} from "./modal-registro-marca";


export const RegistroProducto = () => {
  const [producto, setProducto] = useState([]);
  const refresh = useRecoilRefresher_UNSTABLE(productoSelector);
  const navigate = useNavigate();
  const [marca, setMarca] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMarca, setModalMarca] = useState(false);
  const [deleteMarca, setDeleteMarca] = useState(false);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(-1);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [marcasVisibles, setMarcasVisibles] = useState([]);

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
    navigate("/admin/producto");
  };

  
  const openModalDeleteMarca = () => {
    const $listaMarca = document.getElementById("lista-marca");
    const index = $listaMarca.options.selectedIndex;
    if (index !== -1){
      setMarcaSeleccionada(Array.from($listaMarca.options)[index].value);
      setDeleteMarca(true);
    } else{
      alert("Debe seleccionar la marca que desea ocultar");
    }
  }

  useEffect(() => {
    axios.get("http://localhost:8069/marca/all").then((res) => {
      console.log(res.data);
      setMarca(res.data);
    });
    axios.get("http://localhost:8069/categoria/all").then((res) => {
      setCategorias(res.data)
    });
  }, []);

  const getMarcas = (e) => {
    console.log(e.target.value);
    
  }

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
              autoComplete="off"
              type="text"
              className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg w-full block p-2.5"
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
              autoComplete="off"
              type="number"
              step="any"
              className="shadow-sm input  border-2  text-gray-900 text-sm rounded-lg block w-32 p-2.5 "
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
              autoComplete="off"
              type="text"
              className="shadow-sm input border-2  text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
              {...register("categoria", {
                pattern: /^[0-9]+$/
              })}
              id="countries"
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              onChange={e => setMarcasVisibles(marca.filter(m => m.categoria.codigo == e.target.value))}
              
            >
              <option value={null} selected disabled>
                  Seleccionar
                </option>
              {categorias.map((categoria) => (
                <option key={categoria.codigo} value={categoria.codigo}>
                  {categoria.nombre}
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
                pattern: /^[0-9]+$/
              })}
              id="lista-marca"
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              {
                marcasVisibles.length > 0 ?
                <option value={null} selected disabled>
                  Seleccionar
                </option>
                : <option value={null} selected disabled>
                    Sin Marcas
                  </option>
                
              }
              {marcasVisibles.map((m) => (
                m.estado &&
                <option key={m.codigo} value={m.codigo}>
                  {m.nombre}
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
                <button type="button" onClick={() => openModalDeleteMarca()}>
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
      <ModalRegistroMarca 
        modalMarca={modalMarca} 
        setModalMarca={setModalMarca}
        marca = {marca}
        setMarca = {setMarca}
        categorias = {categorias}/>
      <ModalEliminarMarca 
      modalEliminarMarca={deleteMarca} 
      setModalEliminarMarca ={setDeleteMarca}
      marcaSeleccionada = {marcaSeleccionada}
      marca = {marca}
      setMarca = {setMarca}/>
      
      
    </>
  );
};
