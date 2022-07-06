import { Header } from "../components/producto-component/header";
import { RegistroProducto } from "../components/producto-component/registro/registro-producto";

export const PageRegistroProducto = () => {
  return (
    <div>
      <Header />
      <div className="p-8">
        <RegistroProducto />
      </div>
    </div>
  );
};
