//import axios from "axios";
//import { useForm } from "react-hook-form";

export const ModalDetalleEvento = ({ setModal_evento, modal_evento }) => {
  return (
    <>
      {modal_evento && (
        <div
          id="popup-modal"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex block"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative p-2 w-full max-w-md h-full md:h-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-slate-100 rounded-lg">
              <div className="w-full bg-[#618C03] h-16 flex items-center text-white font-medium  px-5 text-2xl rounded-t-lg justify-center">
                <span>Chacalon JR</span>
              </div>
              <div className="justify-center items-center flex block pt-3 rounded-t-lg">
                <img src="https://i.scdn.co/image/ab67616d00001e02ea218a0bb07f9fc0dd6440d8"></img>
              </div>
              <div className="flex justify-center w-full block pt-1 font-medium px-4 text-xl">
                <span className="text-center">
                  Celebracion del Aniversario del Bar y cervezas heladitas
                </span>
              </div>
              <div className="flex flex-row justify-around pt-4">
                <div className="w-full flex flex-row justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="mx-1 text-xs">2022/07/20</span>
                </div>
                <div className="w-full flex flex-row justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="mx-1 text-xs">9:00 pm</span>
                </div>
              </div>
              <div className="flex flex-row justify-around pb-2 pt-3">
                <button
                  onClick={() => setModal_evento(false)}
                  className="bg-[#BE0000] py-0.4 px-14 text-white font-semibold text-[1.2rem] rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
