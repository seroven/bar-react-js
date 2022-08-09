import { useRecoilState } from "recoil";
import { ModalGuiaState } from "../../storage/atom/guias/modal.atom";
import { VideosGuiasState } from "../../storage/atom/guias/videos.atom";
import "./modal-guia.css";

export const ModalGuia = () => {
  const [modalGuia, setModalGuia] = useRecoilState(ModalGuiaState);
  const [videosGuias, setVideosGuias] = useRecoilState(VideosGuiasState);

  return (
    modalGuia && (
      <div
        id="popup-modal"
        className={
          " fixed top-0 z-50 right-0 left-0 h-modal md:h-full justify-center items-center flex flex-col "
        }
        aria-modal="true"
        role="dialog"
      >
        <div className="relative border-l z-50 border-r border-b-8 border-t-8 border-[#618C03] bg-white rounded-lg py-5 px-12 max-h-[70%] h-auto w-[50%] overflow-auto">
          {videosGuias?.map((v) => {
            console.log(videosGuias.indexOf(v));
            return (
              <>
                <div className="font-semibold text-4xl text-center">
                  <span>{v.titulo}</span>
                </div>
                <div className="rounded-xl overflow-hidden pt-2">
                  <iframe
                    className="w-full h-[50vh]"
                    src={v.url}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                {
                    videosGuias.indexOf(v) +1 < videosGuias.length &&
                    <div className="flex justify-center py-5">
                        <div className="border border-gray-300 w-[80%] "></div>
                    </div>
                }
              </>
            );
          })}
            <div className="absolute right-3 top-3">
            <button onClick={(e) => setModalGuia(false)}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#D04444"
                strokeWidth="2"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
            </div>
        </div>
      </div>
    )
  );
};
