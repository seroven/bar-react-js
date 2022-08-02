import axios from "axios";
import { useForm } from "react-hook-form";

export const ModalRegistroMarca = ({
  modalMarca,
  setModalMarca,
  marca,
  setMarca,
  categorias
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const guardarMarca = (data) => {
    if (marca.find(m => m.nombre === data.marca)){
        alert("Esta marca ya está registrada");
        return;
    }

    axios.post("http://localhost:8069/marca/save", {
        nombre: data.marca,
        estado: true,
        categoria: {
          codigo: data.categoria,
          nombre: categorias.find(c => c.codigo == data.categoria).nombre
        },
      }).then((res) => {
        setMarca([...marca, res.data]);
    });
    setModalMarca(false);
  };

  return (
    <>
      {modalMarca && (
        <div
          id="popup-modal"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex block"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative p-2 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
              <div className="p-6 text-center">
                <div className="my-10 text-4xl font-medium text-gray-500 dark:text-gray-400">
                  Registrar Marca
                </div>
                <form onSubmit={handleSubmit(guardarMarca)}>
                  <div>
                    <div className="mb-6 flex ">
                      <label className="block w-96 self-center text-lg font-medium text-gray-900 ">
                        Categoria:
                      </label>
                      <select
                        {...register("categoria", {
                          required: true,
                        })}
                        id="countries"
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        {categorias.map((categoria) => (
                          <option
                            key={categoria.codigo}
                            value={categoria.codigo}
                          >
                            {categoria.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-10 flex">
                      <label className="block w-96 self-centertext-lg font-medium text-lg text-gray-900 ">
                        Marca:
                      </label>
                      <input
                        {...register("marca", {
                          required: {
                            value: true,
                            message: "La marca es requerida",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "La marca debe tener al menos 3 caracteres",
                          },
                          maxLength: {
                            value: 45,
                            message:
                              "La descripción debe tener máximo 45 caracteres",
                          },
                        })}
                        type="text"
                        className={
                          "shadow-sm input border-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 " +
                          (errors.marca
                            ? " border-red-600 focus:outline-none"
                            : "")
                        }
                      />
                    </div>
                  </div>
                  <button
                    data-modal-toggle="popup-modal"
                    type="submit"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
