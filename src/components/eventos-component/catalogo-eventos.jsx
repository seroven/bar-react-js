import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export const Eventos = ({ admin }) => {

  const [eventos, setEventos] = useState([]);

  const onStatusChangeClick = (data) => {
    axios
      .put("http://localhost:8069/evento/estado/" + data.codigo)
      .then(() => {
        setEventos(
          eventos.map((event) =>
            event.codigo === data.codigo
              ? { ...data, estado: !data.estado }
              : event
          )
        );
      });
    console.log(data.codigo)
    console.log(eventos.codigo)
  };

  useEffect(() => {
    const obtenerEventos = async () => {
      const est = "http://localhost:8069/evento/listar";
      const res = await axios.get(est);
      setEventos(res.data);
      console.log(res.data);
    };
    obtenerEventos();
  }, []);

  return (
    <>

      <div>
        <div id="default-carousel" className="relative" data-carousel="static">
          <div className="relative h-56 overflow-hidden md:h-96">
            <div
              className="duration-75 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20"
              data-carousel-item=""
              id="carousel-item-1"
            >
              <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl ">
                First Slide
              </span>
              <img
                src="https://acortar.link/twbRwc"
                className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-75 ease-in-out absolute inset-0 transition-all transform translate-x-full z-10"
              data-carousel-item=""
              id="carousel-item-2"
            >
              <img
                src="https://acortar.link/o0NI7M"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-75 ease-in-out absolute inset-0 transition-all transform -translate-x-full z-10"
              data-carousel-item=""
              id="carousel-item-3"
            >
              <img
                src="https://acortar.link/rlOcaB"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button
              type="button"
              className="w-3 h-3 rounded-full bg-white dark:bg-gray-800"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
          </div>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
            onClick={() => { }}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
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
              <h1 className="text-3xl font-medium text-slate-600 mb-3">Rango de fechas</h1>
              <div className="flex items-center gap-2">
                <label className="font-medium text-xl  text-[#022601c2]">
                  Inicio
                </label>
                <input
                  className="w-full p-1 rounded"
                  type="date"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-medium text-xl text-[#022601c2] my-5">
                  Final
                </label>
                <input
                  className="w-full p-1 rounded"
                  type="date"
                />
              </div>
              <button className="buttons w-full my-5">
                FILTRAR
              </button>
              <div className="flex items-center gap-2">
                <label className="font-medium text-xl  text-[#022601c2]">
                  Dia
                </label>
                <input
                  className="w-full p-1 rounded"
                  type="date"
                />
              </div>
            </div>

            {eventos.length === 0 ? (
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
                      <div class="max-w-sm h-64 bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                        style={{ backgroundImage: `url(${evento.imagen})` }} key={evento.codigo}>
                        <div class="w-full h-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-black">
                          <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                            {evento.titulo}
                          </h2>
                          <div className="flex my-2  text-white space-x-28 justify-center">
                            <div className="">{evento.fecha}</div>
                            <div className="">9:00 pm</div>
                          </div>
                        </div>
                        <br />
                        {admin ? (
                          <div className="w-full px-2 mb-2 justify-center object-center">
                            <button
                              className={
                                "w-full " +
                                (eventos.estado ? "buttons-red" : "buttons")
                              }
                              onClick={() => onStatusChangeClick(evento)}
                            >
                              {eventos.estado ? "Inhabilitar" : "Habilitar"}
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};