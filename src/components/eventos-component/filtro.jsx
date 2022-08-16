import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FechaEveState } from "../../storage/atom/evento-atom/fechaeve.atom";
import { FechaOneState } from "../../storage/atom/evento-atom/fechauno.atom";

export const FiltroEvento = () => {

    const [fecha, setFecha] = useRecoilState(FechaEveState);
    const [tFecha, setTFecha] = useState({
        fecha_inicio: "",
        fecha_final: "",
    })
    const [fechaone, setFechaone] = useRecoilState(FechaOneState);
    const [tFechaone, setTFechaone] = useState("");


    // useEffect(() => {
    //     console.log(tFecha);
    //     if (tFecha.fecha_inicio !== "" && tFecha.fecha_final !== "") {
    //         setFecha(tFecha);
    //     }
    // }, [tFecha])



    // const filtraruno = (e) => {
    //     setFechaone(e.target.value);
    //     console.log(e.target.value);
    // };

    const filtrar = (e) => {
        console.log(tFecha);
        if (tFecha.fecha_inicio !== "" && tFecha.fecha_final !== "") {
            setFechaone(null);
            setTFechaone("");
            setFecha(tFecha);
           
            setTFecha({
                fecha_inicio: "",
                fecha_final: "",
            });

        } else {
            setFecha(null);
            setTFecha({
                fecha_inicio: "",
                fecha_final: "",
            });
            console.log(tFechaone);
            setFechaone(tFechaone);
            console.log(tFechaone);
        }
    }


    // const filtrar = (e) => {
    //     setFecha(null);
    //     setTFecha({
    //         fecha_inicio: "",
    //         fecha_final: "",
    //     });
    //     setFechaone(tFechaone);
    // }


    return (
        <>
            <h1 className="text-3xl font-medium text-slate-600 mb-3">Rango de fechas</h1>
            <div className="flex items-center gap-2">
                <label className="font-medium text-xl w-20 text-[#022601c2]">
                    Inicio
                </label>
                <input
                    className="w-full p-1 rounded"
                    type="date"
                    value={tFecha.fecha_inicio}
                    onChange={e => setTFecha({ ...tFecha, fecha_inicio: e.target.value })}
                />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-medium text-xl w-20 text-[#022601c2] my-5">
                    Final
                </label>
                <input
                    className="w-full p-1 rounded"
                    type="date"
                    value={tFecha.fecha_final}
                    onChange={e => setTFecha({ ...tFecha, fecha_final: e.target.value })}
                />
            </div>
            <button className="buttons w-full mb-5" onClick={filtrar}>
                FILTRAR
            </button>
            <div className="flex items-center gap-2">
                <label className="font-medium text-xl w-20 text-[#022601c2]">
                    Dia
                </label>
                <input
                    className="w-full p-1 rounded"
                    type="date"
                    value={tFechaone}
                    onChange={e => setTFechaone(e.target.value)}
                />
            </div>

        </>
    )

}