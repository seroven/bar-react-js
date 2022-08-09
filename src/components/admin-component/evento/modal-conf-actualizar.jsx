

export const Modal_Conf_Act = ({ modal_conf_act, setModal_conf_act, data }) => {

    return (
        <>
            {modal_conf_act && (
                <div
                    id="popup-modal"
                    className={
                        " fixed top-0 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col block"
                    }
                    aria-modal="true"
                    role="dialog"
                >
                    <div className=" relative border border-[#97BF04] rounded-lg bg-white  w-1/3 h-64">
                        <div className="w-full bg-[#97BF04] h-16 flex items-center rounded-t-md text-white font-medium px-5 text-2xl">
                            <span>Mensaje de Confirmación</span>
                        </div>
                        <div className="py-5 px-20">
                            <div className="text-center">
                                <span className="font-semibold text-[1.5rem]">
                                ¿Estás seguro de actualizar el evento?
                                </span>
                                <br />
                            </div>
                        </div>
                        <div className="flex flex-row justify-around">
                            <div className="w-full flex flex-row justify-center">
                                <button
                                    className="buttons-red px-4"
                                    onClick={() => setModal_conf_act(false)}
                                >
                                    Seguir Editando
                                </button>
                            </div>

                            <div className="w-full flex flex-row justify-center">
                                <button
                                    className="buttons px-8"
                                >
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
