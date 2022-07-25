import "./listado.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const ListadoPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState([]);

  const onActualizarChange = async (e, p) => {
    // pedidos.forEach(pedido => {
    //   pedido.cod_pedido === p.cod_pedido ? console.log(pedido) : null
    // })

    setPedidos(
      pedidos.map((pedido) =>
        pedido.cod_pedido === p.cod_pedido
          ? {
              ...pedido,
              estado: {
                codigo: parseInt(e.target.value),
                nombre: e.target.selectedOptions[0].innerText,
              },
            }
          : pedido
      )
    );

    // console.log(p.estado.codigo === parseInt(e.target.value))

    const pr = await axios.put(
      "http://localhost:8069/pedido/estado/" + p.cod_pedido,
      {
        codigo: parseInt(e.target.value),
        nombre: e.target.selectedOptions[0].innerText,
      }
    );
  };

  useEffect(() => {
    const obtenerPedidos = async () => {
      const url = "http://localhost:8069/pedido/all";
      const result = await axios.get(url);
      setPedidos(result.data);
    };

    const obtenerEstados = async () => {
      const est = "http://localhost:8069/estado/all";
      const res = await axios.get(est);
      setEstados(res.data);
      console.log(res.data);
    };
    obtenerPedidos();
    obtenerEstados();
  }, []);

  const getClassColor = (estado) => {
    switch (estado) {
      case 1:
        return "color-pendiente";
      case 2:
        return "color-postergado";
      case 3:
        return "color-entregado";
      case 4:
        return "color-anulado";
    }
  };

  return (
    <>
      <h1 className="font-bold text-4xl text-center md:text-left text-[#022601]">
        Lista de Pedidos
      </h1>
      <br />
      {/* Para los filtros */}
      <div className="h-20 w-full items-center justify-center bg-[#DEEBDE] gap-20 flex p-3 rounded">
        <div className="flex items-center gap-2">
          <label className="font-medium text-xl  text-[#022601c2]">
            Estado:
          </label>
          <select className="w-full p-1 rounded">
            <option value="1">Pendiente</option>
            <option value="2">Postergado</option>
            <option value="3">Entregado</option>
            <option value="4">Anulado</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-xl  text-[#022601c2]">DNI:</label>
          <input
            className="w-full p-1 rounded"
            type="text"
            placeholder="Ingrese DNI"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-xl  text-[#022601c2]">
            Fecha:
          </label>
          <input
            className="w-full p-1 rounded"
            type="date"
            placeholder="Ingrese Fecha"
          />
          <label className="font-medium text-xl  text-[#022601c2]">-</label>
          <input
            className="w-full p-1 rounded"
            type="date"
            placeholder="Ingrese Fecha"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-xl w-28 text-[#022601c2]">
            Nro Pedido:
          </label>
          <input
            className="w-56 p-1 rounded"
            type="text"
            placeholder="Ingrese Nro Pedido"
          />
        </div>
      </div>
      <br />
      <div className="tabla-listado ">
        <div className="orden-tabla tabla-encabezado">
          <div className="border-r-2">N° de Pedido</div>
          <div className="border-r-2">Cliente</div>
          <div className="border-r-2">Dni del Cliente</div>
          <div className="border-r-2">Dni del Encargado de Recoger</div>
          <div className="border-r-2">Costo Total</div>
          <div className="border-r-2">Fecha de Recojo</div>
          <div className="border-r-2">Estado</div>
          <div>Detalle</div>
        </div>
        <div className="h-[60vh] overflow-auto">
          {pedidos.map((p) => {
            return (
              <div className="orden-tabla item-contenido">
                <div className="border-r-2">N° {p.cod_pedido}</div>
                <div className="border-r-2">
                  {p.cliente.nombre} {p.cliente.apPaterno}
                </div>
                <div className="border-r-2">{p.cliente.dni}</div>
                <div className="border-r-2">{p.dni_recibidor}</div>
                <div className="border-r-2">S/. {p.precio_total}</div>
                <div className="border-r-2">{p.fecha_envio}</div>
                <div className="border-r-2">
                  <select
                    className={"lista-estado " + getClassColor(p.estado.codigo)}
                    onChange={(e) => onActualizarChange(e, p)}
                  >
                    {estados.map((estado) => (
                      <option
                        key={estado.codigo}
                        value={estado.codigo}
                        selected={p.estado.codigo === estado.codigo}
                      >
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className="boton-detalle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
