import "./landing.css"
import { Link } from "react-router-dom";

export const LandingPart3 = () => {
  return (
    <>
      <div className="h-[55em] bg-gradient-to-b from-[white] to-white py-5">
        <div className="text-center flex flex-col">
          <div className="text-[#036300] text-6xl font-bold">Eventos</div>
          <br/>
          <div className="self-center w-4/6 text-3xl text-center">Con los mejores artistas para ti</div>
        </div>
        <br/>
        <div className="grid gap-x-20 grid-cols-3 px-20 my-8 h-[60%]">
          <div className="cards">
            <img className="imagen_e1" src="../../../src/public/evento_1.jpg"/>
          </div>
          <div className="cards"> 
            <img className="imagen_e2" src="../../../src/public/evento_2.jpg"/>
          </div>
          <div className="cards">
            <img className="imagen_e3" src="../../../src/public/evento_3.jpg"/>
          </div>

        </div>
        <br/>
        <div className="text-center">
          <Link to="/">
            <button className="buttons w-[12em] h-[2em] text-4xl font-semibold">MAS INFORMACION</button>
          </Link>
          
        </div>


      </div>
    </>
  );
};
