import { Suspense, useEffect, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { ModalDetalleEvento } from "./detalle-eventos";
import axios from "axios";
import { eventoSelector } from "../../storage/selector/evento-selector";
import { FiltroEvento } from "./filtro";
import { CarruselEvento } from "./carrusel-evento";
import { useNavigate } from "react-router-dom";
import { CambioEstadoEvento } from "../../storage/atom/cambio.estado.evento.atom";

export const Eventos = ({ admin }) => {
  const initialEvents = useRecoilValue(eventoSelector);
  const [eventos, setEventos] = useState(initialEvents);
  const [eventoDetalle, setEventoDetalle] = useState({});
  const [modal_evento, setModal_evento] = useState(false);
  const refresh = useRecoilRefresher_UNSTABLE(eventoSelector);
  const [cambioEstadoEvento, setCambioEstadoEvento] = useRecoilState(CambioEstadoEvento);
  const navigate = useNavigate();

  const onStatusChangeClick = async (data) => {
    await axios.put("http://localhost:8069/evento/update/" + data.codigo).then(() => {
      setEventos(
        eventos.map((event) =>
          event.codigo === data.codigo
            ? { ...data, estado: !data.estado }
            : event
        )
      );
    });
    setCambioEstadoEvento(true);
  };

  const ActualizarEvento = (evento) => {
    if (admin === true) {
      navigate("/admin/evento/actualizar/"+evento.codigo);
    } else {
      setModal_evento(true);
      setEventoDetalle(evento);
    }
  };

  useEffect(() => {
    if (cambioEstadoEvento){
      refresh();
      setCambioEstadoEvento(false);
    }

  }, [])

  useEffect(() => {
    console.log(initialEvents);
    setEventos(initialEvents);
  }, [initialEvents]);

  return (
    <>
      <div className={modal_evento ? "blur-md" : null}>
        <CarruselEvento />
        <div className="px-20 py-4">
          <div className="flex justify-between container items-center mb-4">
            <div className="font-medium text-4xl text-center md:text-left ">
              <h1 className="text-5xl font-bold">Eventos</h1>
            </div>
            {admin ? (
              <Link to="/admin/evento/registro">
                <div className="buttons-yellow py-2 px-8">Registrar</div>
              </Link>
            ) : null}
          </div>
          <div className="flex my-7 space-x-3">
            <div className="md:w-[25rem] h-96 bg-gray-100 px-10 py-8 rounded-md shadow-md">
              <FiltroEvento />
            </div>

            {eventos?.length === 0 ? (
              <div className="pl-60 justify-self-center text-center">
                <h1 className="text-3xl font-extrabold mb-20 text-[#97BF04]">
                  No Se Encontraron Eventos
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {eventos.map(
                  (evento) =>
                    (admin ? true : evento.estado) && (
                      <div>
                        <div
                          className="max-w-sm h-64 bg-cover rounded-xl border-2 border-gray-200 shadow-md hover:cursor-pointer hover:scale-105 transition-[transform|border] "
                          style={{ backgroundImage: `url(${evento.imagen})` }}
                          key={evento.codigo}
                        >
                          <div
                            className="w-full h-full rounded-lg bg-gradient-to-b from-transparent 
                        via-transparent to-black"
                            onClick={() => ActualizarEvento(evento)}
                          >
                            <h2 className="text-lg pt-44 p-2 font-semibold text-white">
                              {evento.titulo}
                            </h2>
                            <div className="flex my-2  text-white space-x-28 justify-center">
                              <div className="">{evento.fecha}</div>
                              <div className="">{evento.hora}</div>
                            </div>
                          </div>
                        </div>
                        {admin ? (
                          <div className="w-full my-2 px-2 justify-center object-center">
                            <button
                              className={
                                "w-full " +
                                (evento.estado ? "buttons-red" : "buttons")
                              }
                              onClick={() => onStatusChangeClick(evento)}
                            >
                              {evento.estado ? "Inhabilitar" : "Habilitar"}
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalDetalleEvento
        setModal_evento={setModal_evento}
        modal_evento={modal_evento}
        evento={eventoDetalle}
      />
    </>
  );
};
