import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { eventoSelector } from "../../../storage/selector/evento-selector";


export const Modal_Conf_Act = ({ modal_conf_act, setModal_conf_act, data }) => {

    const { id } =useParams();
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

    const onAceptarClick = async () => {

        console.log(data.fecha);
        console.log(formaterDate(data.fecha));
        await axios.put("http://localhost:8069/evento/actualizar_evento/" + id, {
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagen: data.imagen,
        fecha: formaterDate(data.fecha),
        hora: data.hora,
        estado: data.habilitado,
        imagenes: validarImagenes(data.imagenS1, data.imagenS2),
        });
        refresh();
        setModal_conf_act(false);
        navigate("/admin/evento");
    }

    const formaterDate = (date) => {
        // console.log(date);
        const dateFormated = new Date(date);
        const tDay = dateFormated.getDate() + 2;
        const day = tDay.toString().length === 1 ? "0" + tDay : tDay;
        const tMonth = dateFormated.getMonth() + 1;
        const month = tMonth.toString().length === 1 ? "0" + tMonth : tMonth;
        const year = dateFormated.getFullYear();
        return `${year}-${month}-${day}`;
      };

    console.log(data);
    return (
        <>
            {modal_conf_act && (
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
                                ¿Estás seguro de actualizar el evento?
                                </span>
                                <br />
                            </div>
                        </div>
                        <div className="flex flex-row justify-around">
                            <div className="w-full flex flex-row justify-center">
                                <button
                                    className="buttons-red px-4"
                                    onClick={() => setModal_conf_act(false)}
                                >
                                    Seguir Editando
                                </button>
                            </div>

                            <div className="w-full flex flex-row justify-center">
                                <button
                                    className="buttons px-8"
                                    onClick={onAceptarClick}
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
