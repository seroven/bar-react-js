import "./listado.css";

export const ListadoPedido = () => {
  return (
    <>
      <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
        Lista de Pedidos
      </h1>
      <br />
      {/* Para los filtros */}
      <div className="h-20 w-full bg-slate-500"></div>
      <br />
      <div className="tabla-listado">
        <div className="orden-tabla tabla-encabezado">
          <div className="border-r-2">N° de Pedido</div>
          <div className="border-r-2">Cliente</div>
          <div className="border-r-2">Dni del Cliente</div>
          <div className="border-r-2">Dni del Encargado de Recoger</div>
          <div className="border-r-2">Costo Total</div>
          <div className="border-r-2">Fecha de Recojo</div>
          <div className="border-r-2">Estado</div>
          <div >Detalle</div>
        </div>
        
        <div className="orden-tabla tabla-contenido">
          <div className="border-r-2">N° 23</div>
          <div className="border-r-2">Sebastián Rodríguez Ventura</div>
          <div className="border-r-2">730821741</div>
          <div className="border-r-2">74854123</div>
          <div className="border-r-2">S/. 205</div>
          <div className="border-r-2">07-08-2022</div>
          <div className="border-r-2">
            
            <select className="lista-estado color-cancelado">
                <option>Pendiente</option>
            </select>

          </div>
          <div>
            <button className="boton-detalle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
          </div>
        </div>
        

      </div>
    </>
  );
};
