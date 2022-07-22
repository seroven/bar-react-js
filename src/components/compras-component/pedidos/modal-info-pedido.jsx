export const ModalInformacionPedido = ({ modalVisible, setModalVisible }) => {
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="#97bf04">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span className="mx-3">Su pedido se ha realizado correctamente</span>
              </div>
              <div className="pt-3 px-10">
                  <div className="text-center">
                      <span className=" font-medium text-lg text-[#618C03]">Recuerde los siguientes datos para comunicarse con el bar</span><br/>
                  </div>
                  <div className="py-2 text-xl">
                    <label className="block"><b>Número de contacto:</b> 925458741</label>
                    <label className="pt-2 block"><b>Dirección:</b>  Av. 41 Jl Mz.K4 - Lurigancho Chosica</label>
                  </div>
              </div>
                <div className="w-full flex flex-row justify-center px-4 pt-2">
                    <button className='bg-[#BE0000] py-2 px-14 text-white font-semibold text-[1.2rem] rounded-xl' onClick={e => setModalVisible(false)}>
                        CERRAR
                    </button>
                </div>

            </div>
          </div>
        )}
      </>
    );
  };