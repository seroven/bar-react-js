import { Link } from "react-router-dom";

export const HeaderEvent = () => {
  return (
    <nav className="nav">
      <div className="nav-position">
        <Link to="/">
          <div className="flex items-center space-x-5">
            <img
              src="../../../src/public/cervecitas.png"
              className="mr-3 w-16 h-16 sm:h-16 rounded-full"
            />
            <span className="self-center font-mono text-3xl font-semibold whitespace-nowrap text-white">
              Bar La China
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
