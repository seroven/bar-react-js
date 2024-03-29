import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FechaState } from "../../../storage/atom/pedido-atom/fecha.atom";
import { NroPedidoState } from "../../../storage/atom/pedido-atom/nro-pedido.atom";
import { dniPedidoState } from "../../../storage/atom/pedido-atom/dni.atom";
import { estadoPedidoState } from "../../../storage/atom/pedido-atom/estado.atom";


export const FiltroPedido = () => {

    const [nroPedido, setNroPedido] = useRecoilState(NroPedidoState);
    const [tNroPedido, setTNroPedido] = useState("");
    const [fecha, setFecha] = useRecoilState(FechaState);
    const [tFecha, setTFecha] = useState({
        fecha_inicio: "",
        fecha_final: "",
    })
    const [dniPedido, setDniPedido] = useRecoilState(dniPedidoState);
    const [tDni, setTDni] = useState("");
    const [estadoPedido, setEstadoPedido] = useRecoilState(estadoPedidoState);

    useEffect(() => {
        if (tFecha.fecha_inicio !== "" && tFecha.fecha_final !== "") {
            setNroPedido(null);
            setTNroPedido("");
            setDniPedido(null);
            setTDni("");
            vaciarEstado();
            setFecha(tFecha);
        }
    }, [tFecha])

    const filtrarNroPedido = (e) => {
        if (e.key === "Enter") {
            setFecha(null);
            setTFecha({
                fecha_inicio: "",
                fecha_final: "",
            });
            setDniPedido(null);
            setTDni("");
            vaciarEstado();
            setNroPedido(e.target.value);
            return;
        }
    }

    const validarSoloNumeros = (e) => {
        const onlyNumbers = /^[0-9]+$/;
        let cadena = e.target.value;
        if (!onlyNumbers.test(cadena)) {
            cadena = cadena.split('').filter(l => /[0-9]/.test(l)).join('');
        }
        if (e.target.id === "dni") {
            setTDni(cadena);
        } else {
            setTNroPedido(cadena);
        }
    }

    const filtrarDniPedido = (e) => {
        if (e.key === "Enter") {
            setNroPedido(null);
            setTNroPedido("");
            setFecha(null);
            setTFecha({
                fecha_inicio: "",
                fecha_final: "",
            });
            vaciarEstado();
            setDniPedido(e.target.value);
        }
    }

    const filtrarEstadoPedido = (e) => {
        setNroPedido(null);
        setTNroPedido("");
        setFecha(null);
        setTFecha({
            fecha_inicio: "",
            fecha_final: "",
        });
        setDniPedido(null);
        setTDni("");
        if (e.target.value !== "0") {
            setEstadoPedido(e.target.value);
        } else{
            setEstadoPedido(null);
        }
    }

    const vaciarEstado = () => {
        const $listEstados = document.getElementById("estados");
        $listEstados.options.selectedIndex = 0;
        setEstadoPedido(null);
    }

    return (
        <>
            <div className="h-20 w-full items-center justify-center bg-[#DEEBDE] gap-20 flex p-3 rounded">
                <div className="flex items-center gap-2">
                    <label className="font-medium text-xl  text-[#022601c2]">
                        Estado:
                    </label>
                    <select id = "estados" className="w-full p-1 rounded" onChange={e => filtrarEstadoPedido(e)}>
                        <option value="0">Seleccionar</option>
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
                        id="dni"
                        value={tDni}
                        onChange={e => validarSoloNumeros(e)}
                        onKeyPress={e => filtrarDniPedido(e)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-medium text-xl  text-[#022601c2]">
                        Fecha:
                    </label>
                    <input
                        className="w-full p-1 rounded"
                        type="date"
                        value={tFecha.fecha_inicio}
                        onChange={e => setTFecha({ ...tFecha, fecha_inicio: e.target.value })}
                    />
                    <label className="font-medium text-xl  text-[#022601c2]">-</label>
                    <input
                        className="w-full p-1 rounded"
                        type="date"
                        value={tFecha.fecha_final}
                        onChange={e => setTFecha({ ...tFecha, fecha_final: e.target.value })}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-medium text-xl w-28 text-[#022601c2]">
                        Nro Pedido:
                    </label>
                    <input
                        className="w-56 p-1 rounded"
                        type="text"
                        id="nroPedido"
                        placeholder="Ingrese Nro Pedido"
                        value={tNroPedido}
                        onChange={e => validarSoloNumeros(e)}
                        onKeyPress={e => filtrarNroPedido(e)}
                    />
                </div>
            </div>
        </>
    );
};
