import { Link } from "react-router-dom";

export const BackButton = () => {
  return (
    <Link to="/">
      <div className="absolute bottom-14 left-12 p-4 bg-white border-2 border-[#618c03] rounded-full hover:scale-110 transition-[transform]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#618c03"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
          />
        </svg>
      </div>
    </Link>
  );
};
