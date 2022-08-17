import { HeaderEvent } from "../components/eventos-component/header-event"


export const PageNotFound = () => {
    return <>
        <HeaderEvent/>    
        <div className="w-[100vw] flex flex-col justify-center items-center my-20">
            <div className="text-[15rem] font-semibold text-[#618c03]">
                404
            </div>
            <div className="text-4xl text-center font-semibold">
                El recurso al que intenta acceder<br/> no existe o no tiene permiso
            </div>
        </div>
    </>
}