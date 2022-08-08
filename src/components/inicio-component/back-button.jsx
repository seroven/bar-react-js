import { Link } from "react-router-dom";

export const BackButton = () => {
  return (
    <Link to="/">
      <div className="fixed bottom-8 left-8 p-4 bg-white border-2 border-[#618c03] rounded-full hover:scale-110 transition-[transform]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#618c03"
          stroke-width="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
    </Link>
  );
};
