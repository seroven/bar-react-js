import { useRecoilState } from "recoil";
import { NroPedidoState } from "../../../storage/atom/pedido-atom/nro-pedido.atom";
import { dniPedidoState } from "../../../storage/atom/pedido-atom/dni.atom";
import { estadoPedidoState } from "../../../storage/atom/pedido-atom/estado.atom";


export const FiltroPedido = () => {

    const [nroPedido, setNroPedido] = useRecoilState(NroPedidoState);
    const [dniPedido, setDniPedido] = useRecoilState(dniPedidoState);
    const [estadoPedido, setEstadoPedido] = useRecoilState(estadoPedidoState);


    const filtrarNroPedido = (e) => {
        if (e.key === "Enter"){
            setNroPedido(e.target.value);
        }
        
    }

    const filtrarDniPedido=(e)=>{
        if(e.key ==="Enter"){
            setDniPedido(e.target.value);
        }
    }

    // const filtrarEstadoPedido=(e)=>{
    //     
    // }

    return (
        <>
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
                onKeyPress={e=>filtrarDniPedido(e)}
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
                onKeyPress={e => filtrarNroPedido(e)}
            />
            </div>
        </div>
        </>
    );
};
