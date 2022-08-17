import { useEffect, useState } from "react";

export const CarruselEvento = () => {

  const [eventos, setEventos] = useState([
    "https://scontent-lim1-1.xx.fbcdn.net/v/t1.6435-9/66956168_2261356507252832_4506629202811813888_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeFGZA80hkOnzwuBx46SPUKRQLqsf8sfSs1Auqx_yx9KzdXzi3Q-xQ-vF0Pr6v0DGKAuyjbUxIZojSLgwSNRZ41k&_nc_ohc=YGAK6nKrU40AX-Vtgag&_nc_ht=scontent-lim1-1.xx&oh=00_AT_6V659dD_OwhB1PJ1_qkRasBmf275SvQ6x_9ily8_BFA&oe=630BF69A",
    "https://i.postimg.cc/zv80B6Bn/flayer-2.png",
    "https://i.postimg.cc/nc00VnD2/Dina-Paucar-5-01.jpg"
  ])

  const [indice, setIndice] = useState(0);

  const autoRotate = async () => {
    // const value = await moveToSide(true);
    await rotateImage(true);

  }

  const getCarrusel = () => {
    return document.getElementById("carrusel");
  }

  const rotateImage = (direction) => {
    console.log(getCarrusel());
    const $carrusel = getCarrusel();
    return new Promise((response, rejected) => {
      setTimeout(() => {
        $carrusel.style.transform = direction ? "translateX(100%)" : "translateX(-100%)";
        setTimeout(() => {
          $carrusel.style.opacity = "0";
          setTimeout(() => {
            $carrusel.style.transform = direction ? "translateX(-100%)" : "translateX(100%)";
            setTimeout(() => {
              $carrusel.style.opacity = "1";
              setTimeout(() => {
                console.log("Hola");
                $carrusel.style.transform = "translateX(0%)";
                if (direction){
                  setIndice(indice+1 === 3 ? 0 : indice +1);
                } else{
                  setIndice(indice-1 === -1 ? 2 : indice-1);
                }
                response();
              }, 80)
            }, 80)
          }, 40);
        }, 40)
      }, 4000); 
    })
  }

  useEffect(() => {
    autoRotate();
    console.log(indice);
  }, [indice])

  return (
    <>
      <div id="default-carousel" className="relative" data-carousel="static">
        <div className="relative h-56 overflow-hidden md:h-96">
          <div
            className="duration-75 ease-in-out absolute inset-0 transition-all transform z-20"
            data-carousel-item=""
            id="carrusel"
          >
            <img
              src={eventos[indice]}
              className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
        </div>

        {/* <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev=""
          onClick={e => rotateImage(false)}
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
          onClick={e => rotateImage(true)}
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
        </button> */}
      </div>
    </>
  );
};
