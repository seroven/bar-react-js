export const Modal_Conf = ({modal_conf, setModal_conf}) => {


    return(
        <>
            {modal_conf && (
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
                      <span className="font-semibold text-[1.5rem]">¿Esta seguro de agregar el nuevo Evento?</span><br/>
                  </div>
              </div>
              <div className="flex flex-row justify-around">
                  <div className="w-full flex flex-row justify-center">
                      <button className='bg-[#BE0000]  px-6 p-2 text-white font-semibold text-[1.2rem] rounded-xl' onClick={() => setModal_conf(false)}>
                          Seguir Editando
                      </button>
                      
                  </div>
  
                  <div className="w-full flex flex-row justify-center">
                      <button className='bg-[#618C03]  px-6 p-2 text-white font-semibold text-[1.2rem] rounded-xl'>
                          Confirmar
                      </button>
                  </div>
              </div>
            </div>
          </div>
            )}
        </>
    );
};