import { Suspense, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { ModalDetalleEvento } from "./detalle-eventos";
import axios from "axios";
import { eventoSelector } from "../../storage/selector/evento-selector";
import { FiltroEvento } from "./filtro";
import { CarruselEvento } from "./carrusel-evento";
export const Eventos = ({ admin }) => {
  const initialEvents = useRecoilValue(eventoSelector);
  const [eventos, setEventos] = useState(initialEvents);
  const [modal_evento, setModal_evento] = useState(false);

  const [eventoDetalle, setEventoDetalle] = useState({});

  const onStatusChangeClick = (data) => {
    axios.put("http://localhost:8069/evento/update/" + data.codigo).then(() => {
      setEventos(
        eventos.map((event) =>
          event.codigo === data.codigo
            ? { ...data, estado: !data.estado }
            : event
        )
      );
    });
  };

  useEffect(() => {
    console.log(initialEvents);
    setEventos(initialEvents);
  }, [initialEvents])

  

  return (
    <>
      <div className={modal_evento ? "blur-md" : null}>
        <CarruselEvento/>
        <div className="container px-10 py-4">
          <div className="flex justify-between container mx-auto items-center mb-4">
            <h1 className="font-medium text-4xl text-center md:text-left ">
              <h1 className="text-5xl font-bold">Eventos</h1>
            </h1>
            {admin ? (
              <Link to="/admin/evento/registro">
                <div className="buttons-yellow py-2 px-8">Registrar</div>
              </Link>
            ) : null}
          </div>
          <div className="flex my-7 space-x-3">
            <div className="md:w-[25rem] h-96 bg-gray-100 px-10 py-8 rounded-md shadow-md">
              <FiltroEvento/>
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
                      <div
                        class="max-w-sm h-64 bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                        style={{ backgroundImage: `url(${evento.imagen})` }}
                        key={evento.codigo}
                      >
                        <div
                          class="w-full h-full rounded-lg bg-gradient-to-b from-transparent 
                        via-transparent to-black"
                          onClick={() => {setModal_evento(true); 
                          setEventoDetalle(evento);
                          }}
                        >
                          <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                            {evento.titulo}
                          </h2>
                          <div className="flex my-2  text-white space-x-24 justify-center">
                            <div className="">{evento.fecha}</div>
                            <div className="">{evento.hora}</div>
                          </div>
                        </div>
                        <br />
                        {admin ? (
                          <div className="w-full px-2 mb-2 justify-center object-center">
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
        evento = {eventoDetalle}
        />
    </>
  );
};
