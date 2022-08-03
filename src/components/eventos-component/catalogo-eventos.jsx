import { HeaderEvent } from "./header-event";
export const Eventos = () => {
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
            onClick={() => {}}
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
          <h1 className="text-5xl font-bold">Eventos</h1>
          <div className="flex my-7 space-x-3">
            <div className="md:w-[25rem] h-96 bg-gray-100 px-10 py-8 rounded-md shadow-md">
              {/* filtros */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-2">
              <div class="max-w-sm h-64 bg-[url('https://img.elo7.com.br/product/zoom/2917C30/flyer-banner-de-eventos-para-redes-sociais-flyer.jpg')]  bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full h-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-black">
                  <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                    Con Nosotros Elmer Luna
                  </h2>
                  <div className="flex my-2  text-white space-x-28 justify-center">
                    <div className="">15/07/2022</div>
                    <div className="">9:00 pm</div>
                  </div>
                </div>
              </div>
              <div class="max-w-sm h-64 bg-[url('https://i.pinimg.com/originals/c4/c5/db/c4c5dbc737e7bc7e520c6e56adaaa67c.png')]  bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full h-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-black">
                  <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                    Con Nosotros Elmer Luna
                  </h2>
                  <div className="flex my-2  text-white space-x-28 justify-center">
                    <div className="">15/07/2022</div>
                    <div className="">9:00 pm</div>
                  </div>
                </div>
              </div>
              <div class="max-w-sm h-64 bg-[url('https://i.pinimg.com/originals/c5/e1/23/c5e12388fa18a8ae8b8474c401148bfc.jpg')]  bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full h-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-black">
                  <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                    Con Nosotros Elmer Luna
                  </h2>
                  <div className="flex my-2  text-white space-x-28 justify-center">
                    <div className="">15/07/2022</div>
                    <div className="">9:00 pm</div>
                  </div>
                </div>
              </div>
              <div class="max-w-sm h-64 bg-[url('https://i.pinimg.com/originals/a9/c0/ea/a9c0eae5b668fd0a7b39e0cc7e2b4f15.jpg')]  bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full h-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-black">
                  <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                    Con Nosotros Elmer Luna
                  </h2>
                  <div className="flex my-2  text-white space-x-28 justify-center">
                    <div className="">15/07/2022</div>
                    <div className="">9:00 pm</div>
                  </div>
                </div>
              </div>
              <div class="max-w-sm h-64 bg-[url('https://image.freepik.com/psd-gratuitas/modelo-de-banner-do-instagram-para-evento-de-festa-dj_265396-41.jpg')]  bg-cover rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full h-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-black">
                  <h2 class="text-lg pt-44 p-2 font-semibold text-white">
                    Con Nosotros Elmer Luna
                  </h2>
                  <div className="flex my-2  text-white space-x-28 justify-center">
                    <div className="">15/07/2022</div>
                    <div className="">9:00 pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
