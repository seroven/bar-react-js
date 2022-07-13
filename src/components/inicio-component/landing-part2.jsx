import "./landing.css"
import { Link } from "react-router-dom";

export const LandingPart2 = () => {
  return (
    <>
      <div className="h-[55em] bg-gradient-to-b from-[#e3ff7d] to-white py-5">
        <div className="text-center flex flex-col">
          <div className="text-[#036300] text-6xl font-bold">Cervezas, Gaseosas y Agua</div>
          <br/>
          <div className="self-center w-4/6 text-3xl text-center">¡Tenemos todos los tipos de Cervezas! Desde cerveza ligera a cerveza sin alcohol. ¡Comparte y celebra con una cerveza!</div>
        </div>
        <br/>
        <div className="grid gap-x-20 grid-cols-3 px-20 my-8 h-[50%]">
          <div className="cards">
            <img className="imagen" src="../../../src/public/gaseosas.jpg"/>
          </div>
          <div className="cards"> 
            <img className="imagen" src="../../../src/public/cervezas.jpg"/>
          </div>
          <div className="cards">
            <img className="imagen" src="../../../src/public/aguas.png"/>
          </div>

        </div>
        <br/>
        <div className="text-center">
          <Link to="/producto">
            <button className="buttons w-[10em] h-[2em] text-4xl font-semibold">¡COMPRA YA!</button>
          </Link>
          
        </div>


      </div>
    </>
  );
};
