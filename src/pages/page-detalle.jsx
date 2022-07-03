import { Detalle } from "../components/producto-component/detalle/detalle";
import { Header } from "../components/producto-component/header";

export const PageDetalle = () => {
console.log("asfaf");
  return (
    <div>
      <Header />
      <div className="p-8 ">
        <Detalle />
        
      </div>
    </div>
  );
};
