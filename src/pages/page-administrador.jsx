import { Catalago } from "../components/producto-component/catalogo"
import { Header } from "../components/producto-component/header"


export const PageAdministrador = () => {
    return (
    <>
      <Header admin = {true}/>
      <div className="p-8">
        <Catalago admin = {true}/>
      </div>
    </>
    )
}