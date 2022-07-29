import axios from "axios";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { PedidoSelector } from "../../../../storage/selector/pedido-selector";

export const ModalConfActualizar = ({ pedido, detalle, setDetalle,newDataPedido, modal, setModal, setUpdateProducts }) => {
    const refresh = useRecoilRefresher_UNSTABLE(PedidoSelector);
    const  guardarCambios = async () => {
        
        let idEstado;
        switch (newDataPedido.estado){
            case "Pendiente":
                idEstado = 1;
                break;
            case "Postergado":
                idEstado = 2;
                break;
            case "Entregado":
                idEstado = 3;
                break;
            case "Anulado":
                idEstado = 4;
                break;
        }
        const newPedido = {...newDataPedido, estado :{
            codigo: idEstado,
            nombre: newDataPedido.estado
        },codigo:pedido.cod_pedido};

        await axios.put(`http://localhost:8069/pedido/actualizarp/`, newPedido);

        setDetalle({...detalle, dni_recibidor: newDataPedido.dni, 
            cliente: {... detalle.cliente, telefono: newDataPedido.telefono},
            fecha_envio: newDataPedido.fecha,
            estado: {
                codigo:idEstado,
                nombre: newDataPedido.estado
            } })
        refresh();
        setModal(false);
        setUpdateProducts(false);
    }

  return (
    <>
    {
        modal &&
        <div
            id="popup-modal"
            className={
            " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col block"
            }
            aria-modal="true"
            role="dialog"
        >
            {/* py-10 px-32 */}
            <div className=" relative border border-[#618C03] bg-white  w-1/3 h-64">
            <div className="w-full bg-[#618C03] h-16 flex items-center text-white font-medium px-5 text-2xl">
                <span>Mensaje de Confirmación</span>
            </div>
            <div className="py-5 px-20">
                <div className="text-center">
                <span className="font-semibold text-[1.5rem]">
                    ¿Estás seguro de actualizar los datos del cliente?
                </span>
                </div>
            </div>
            <div className="flex flex-row justify-around">
                <div className="w-full flex flex-row justify-center">
                <button className="bg-[#BE0000] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl" onClick={(e) => setModal(false)}> CERRAR </button>
                </div>

                <div className="w-full flex flex-row justify-center">
                <button className="bg-[#618C03] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl" onClick={(e) => guardarCambios(e)}> ACEPTAR </button>
                </div>
            </div>
            </div>
        </div>
    }
    </>
  );
};
