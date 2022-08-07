import { useEffect, useState } from "react";
import "./detalle.css";

export const ModalDetalleEvento = ({ setModal_evento, modal_evento, evento }) => {
  const [imagenes, setImagenes] = useState([]);
  const [indiceImagen, setIndiceImagen] = useState(0);
  
  
  useEffect(() => {
    if (modal_evento){
        const tempImages = evento?.imagenes?.length > 0 ? [evento.imagen, ...evento.imagenes.map(i => i.imagen)] : [evento?.imagen];
        setImagenes(tempImages);
        console.log(tempImages);
    }
  }, [modal_evento])

  

  const nextImage = () => {
    if (indiceImagen === imagenes.length -1){
        setIndiceImagen(0);
    } else{
        setIndiceImagen(indiceImagen+1);
    }
  }

  const previousImage = () => {
    if (indiceImagen === 0){
        setIndiceImagen(imagenes.length -1);
    } else{
        setIndiceImagen(indiceImagen-1);
    }
  }

  return (
    <>
      {modal_evento && (
        <div
          id="popup-modal"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex "
          aria-modal="true"
          role="dialog"
        >
          <div className="relative p-2 w-[42rem] max-w-[45rem] h-full md:h-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
              <div className="w-full bg-[#618C03] h-16 flex items-center text-white font-medium  px-2 text-3xl rounded-t-lg justify-center">
                <span>{evento.titulo}</span>
              </div>
              <div className="imagenes-evento">
                {
                    imagenes.length > 1
                    ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-11 w-11 hover:cursor-pointer transition-[transform] hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#618c03"
                    strokeWidth="2"
                    onClick={() => previousImage()}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                    </svg>
                    : <div></div>
                    
                }
                <div className="justify-center w-full items-center flex rounded-lg overflow-hidden">
                  <img className="w-full"
                   src={imagenes[indiceImagen]}></img>
                </div>
                {
                    imagenes.length > 1
                    ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-11 w-11 hover:cursor-pointer transition-[transform] hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#618c03"
                    strokeWidth="2"
                    onClick={() => nextImage()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  : <div></div>
                }
                
              </div>

              <div className="flex justify-center w-full font-medium px-12 text-3xl">
                <span className="text-center">
                  {evento.descripcion}
                </span>
              </div>
              <div className="flex flex-row justify-around p-4 text-xl">
                <div className="w-full flex flex-row justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="mx-1">{evento.fecha}</span>
                </div>
                <div className="w-full flex flex-row justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="mx-1">{evento.hora}</span>
                </div>
              </div>
              <div className="flex flex-row justify-around pb-3">
                <button
                  className="bg-[#BE0000] py-1 px-14 text-white font-semibold text-[1.4rem] rounded-lg"
                  onClick={() => {setModal_evento(false); setIndiceImagen(0)}}
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
