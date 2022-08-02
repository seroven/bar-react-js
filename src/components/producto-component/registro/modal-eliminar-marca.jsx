import axios from "axios"

export const ModalEliminarMarca = ({
    modalEliminarMarca, 
    setModalEliminarMarca, 
    marcaSeleccionada,
    marca,
    setMarca}) => {

    const ocultarMarca = () => {
        console.log("Holi")
        axios.put(`http://localhost:8069/marca/estado/${marcaSeleccionada}`);
        setMarca(marca.map(m => m.codigo == marcaSeleccionada ? {...m, estado: false} : m));
        setModalEliminarMarca(false);
    }

    return <>
    {
        modalEliminarMarca &&
        <div
        id="popup-modal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex block"
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
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => ocultarMarca()}
                className="p-2 px-6 rounded-md  hover:text-green-900 text-white bg-[#97BF04]"
              >
                Si, estoy seguro
              </button>
              <button
                onClick={() => setModalEliminarMarca(false)}
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
    }
    </>
}