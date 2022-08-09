import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { eventoSelector } from "../../../storage/selector/evento-selector";

export const Modal_Conf = ({ modal_conf, setModal_conf, data }) => {
  const refresh = useRecoilRefresher_UNSTABLE(eventoSelector);
  const navigate = useNavigate();

  const validarImagenes = (imagen1, imagen2) => {
    let imagenes = [];
    if (imagen1 !== "" && imagen1 !== undefined) {
      imagenes.push({ imagen: imagen1 });
    }
    if (imagen2 !== "" && imagen2 !== undefined) {
      imagenes.push({ imagen: imagen2 });
    }
    return imagenes;
  };

  console.log(validarImagenes(data.imagenS1, data.imagenS2));

  const onRegistrarEventoClick = () => {
    axios
      .post("http://localhost:8069/evento/save", {
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagen: data.imagen,
        fecha: data.fecha,
        hora: data.hora,
        estado: data.habilitado,
        imagenes: validarImagenes(data.imagenS1, data.imagenS2),
      })
      .then((res) => {
        setModal_conf(false);
        navigate("/admin/evento");
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {modal_conf && (
        <div
          id="popup-modal"
          className={
            " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col block"
          }
          aria-modal="true"
          role="dialog"
        >
          <div className=" relative border border-[#97BF04] rounded-lg bg-white  w-1/3 h-64">
            <div className="w-full bg-[#97BF04] h-16 flex items-center rounded-t-md text-white font-medium px-5 text-2xl">
              <span>Mensaje de Confirmación</span>
            </div>
            <div className="py-5 px-20">
              <div className="text-center">
                <span className="font-semibold text-[1.5rem]">
                  ¿Esta seguro de agregar el nuevo Evento?
                </span>
                <br />
              </div>
            </div>
            <div className="flex flex-row justify-around">
              <div className="w-full flex flex-row justify-center">
                <button
                  className="buttons-red px-4"
                  onClick={() => setModal_conf(false)}
                >
                  Seguir Editando
                </button>
              </div>

              <div className="w-full flex flex-row justify-center">
                <button
                  onClick={onRegistrarEventoClick}
                  className="buttons px-8"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
