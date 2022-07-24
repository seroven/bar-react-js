import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import { ModalSinPedidosState } from "../../storage/atom/modals.atom"

export const ModalSinPedidos = () => {

    const [modal, setModal] = useRecoilState(ModalSinPedidosState);
    const navigate = useNavigate();

    return <>
        {modal && (
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
                <span>No has realizado pedidos hasta el momento</span>
            </div>
            <div className="py-5 px-20">
                <div className="text-center">
                    <span className="font-semibold text-[1.5rem]">¿Deseas realizar un pedido?</span><br/>
                    <br/>
                </div>
            </div>
            <div className="flex flex-row justify-around">
                <div className="w-full flex flex-row justify-center">
                    <button className='bg-[#BE0000] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl' onClick={e => setModal(false)}>
                        CERRAR
                    </button>
                    
                </div>

                <div className="w-full flex flex-row justify-center">
                    <button className='bg-[#618C03] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl' onClick={e => {
                      setModal(false);
                      navigate("/pedido/carrito");
                    }}>
                        IR AL CARRITO
                    </button>
                </div>
            </div>
          </div>
        </div>
        )}
    </>
}
