import axios from "axios";
import { useRecoilState } from "recoil";
import { carritoState } from "../../../storage/atom/carrito.atom";
import { ClienteState } from "../../../storage/atom/cliente.atom";
import { DataPedidoState } from "../../../storage/atom/data-pedido.atom";
import { UserState } from "../../../storage/atom/usuario.atom";

export const ModalConfirmacionPedido = ({ modalVisible, setModalVisible, setModalInformativo }) => {

  const [data, setData] = useRecoilState(DataPedidoState);
  const [usuario, setUsuario] = useRecoilState(UserState);
  const [carrito, setCarrito] = useRecoilState(carritoState);
  const [cliente, setCliente] = useRecoilState(ClienteState);

  const guardarInformacion = async () => {
    if (!cliente){
      const idCliente = await guardarCliente(data);
      console.warn("Cliente registrado")
      await guardarPedido(data, idCliente);
      console.warn("Pedido registrado")
    } else{
      const idCliente = cliente.codigo;
      guardarPedido(data, idCliente);
      console.warn("Pedido registrado")
    }
  };

  const guardarCliente = async (dataCliente) => {
    const newCliente = await axios.post("http://localhost:8069/cliente/save", {
      nombre: dataCliente.nombre,
      apPaterno: dataCliente.apPaterno,
      apMaterno: dataCliente.apMaterno,
      dni: dataCliente.dni,
      telefono: dataCliente.telefono,
      usuario: {
          "codigo": usuario.codigo
      }
    });
    setCliente(newCliente.data);
    return newCliente.data.codigo;
  }

  const guardarPedido = async (dataPedido, id) => {
    console.log(dataPedido);
    
    const newPedido = {
      idcliente: id,
      estado: 1,
      fecha_envio: dataPedido.fecha,
      dni_receptor: dataPedido.dni_recoger.length === 0 ? cliente.dni : dataPedido.dni_recoger,
      detalle: carrito.filter(item => item.visible).map(item => {return{
        idproducto: item.codigo,
        cantidad: item.cantidad,
        subtotal: item.cantidad * item.precio
      }})
    }
    
    // console.log("Dni de recogedor: " + dataPedido.dni_recoger.length === 0 ? cliente.dni : dataPedido.dni_recoger)
    // console.log(newPedido);
    axios.post("http://localhost:8069/pedido/venta", newPedido);
    
    setCarrito(carrito.filter(item => !item.visible));

  }

  return (
    <>
      {modalVisible && (
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
                    <span className="font-semibold text-[1.5rem]">¿Los datos ingresados son correctos?</span><br/>
                    <span>Recuerde que estos datos se usarán para los siguientes pedidos</span>
                </div>
            </div>
            <div className="flex flex-row justify-around">
                <div className="w-full flex flex-row justify-center">
                    <button className='bg-[#BE0000] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl' onClick={e => setModalVisible(false)}>
                        CERRAR
                    </button>
                    
                </div>

                <div className="w-full flex flex-row justify-center">
                    <button className='bg-[#618C03] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl' onClick={e => {
                        guardarInformacion();
                        setModalVisible(false);
                        setModalInformativo(true);
                    }}>
                        ACEPTAR
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
