import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Modal_Conf_Act } from "./modal-conf-actualizar";

export const ActualizarEvento = () => {
    const [modal_conf_act, setModal_conf_act] = useState(false);
    const [data, setData] = useState({});

    const navigate = useNavigate();
    const {
        handleSubmit,
    } = useForm();


    const onActualizarEventoSubmit = (data) => {
        setData(data);
        setModal_conf_act(true);
    };
    return (
        <>
            <div className={modal_conf_act ? "blur-md" : null}>
                <div className="p-4 lg:px-10  align-middle mx-auto flex flex-col lg:gap-10 items-center ">
                    <div className="mb-6 flex">
                        <h1 className="block w-96 self-center text-4xl font-bold">
                            Actualizar Evento
                        </h1>
                        <button
                            type="submit"
                            className="w-40 block p-2.5 ml-10 rounded-md  hover:text-green-900 text-white bg-[#FCD43E]"
                        >
                            Regresar
                        </button>
                    </div>

                    <form
                        className="mt-10"
                        onSubmit={handleSubmit(onActualizarEventoSubmit)}
                    >
                        <div className="mb-6 flex flex-row">
                            <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                                Id del Evento:
                            </label>
                            <input
                                type="text"
                                className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg w-full block p-2.5"
                                disabled
                            />
                        </div>

                        <div className="mb-6 flex flex-row">
                            <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                                Titulo de evento:
                            </label>
                            <input
                                type="text"
                                className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg w-full block p-2.5"
                            />
                        </div>

                        <div className="mb-6 flex flex-row">
                            <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                                Descripción:
                            </label>
                            <input
                                type="text"
                                className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg w-full block p-2.5"

                            />
                        </div>
                        <div className="mb-6 flex flex-row">
                            <label className="block w-40 self-center text-lg font-medium text-gray-900 ">
                                Fecha:
                            </label>
                            <input
                                type="date"
                                className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg block ml-16 w-30 p-2.5"
                            />
                        </div>
                        <div className="mb-6 flex flex-row">
                            <label className="block w-40 self-center text-lg font-medium text-gray-900 ">
                                Hora:
                            </label>
                            <input
                                type="time"
                                className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg block ml-16 w-30 p-2.5"

                            />
                        </div>
                        <div className="mb-6 flex">
                            <label className="block w-96 self-center text-lg font-medium text-gray-900">
                                Imagen Principal:
                            </label>
                            <input
                                type="text"
                                className="shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"

                            />
                        </div>
                        <div className="mb-6 flex">
                            <label className="block w-96 self-center mt-10 text-lg font-medium text-gray-900">
                                Imagenes Secundarias:
                            </label>
                            <input
                                type="text"
                                className="shadow-sm input border-2 mt-10 border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"

                            />
                        </div>

                        <div className="mb-6 flex">
                            <label className="block w-96 self-center text-lg "></label>
                            <input
                                type="text"
                                className="shadow-sm input border-2  border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                                    className="w-4 ml-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#618C03] dark:ring-offset-gray-800"
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
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal_Conf_Act
                modal_conf_act={modal_conf_act}
                setModal_conf_act={setModal_conf_act}
                data={data}
            />
        </>
    )
}