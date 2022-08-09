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
        <div className=" relative border-l z-50 border-r border-b-4 border-[#618C03] bg-white rounded-lg py-2 px-8 max-h-[70%] h-auto w-[50%] overflow-auto">
          {videosGuias?.map((v) => {
            return (
              <>
                <div className="font-semibold text-4xl py-3 text-center">
                  <span>{v.titulo}</span>
                </div>
                <div className="rounded-xl overflow-hidden py-3">
                <iframe className="w-full h-[50vh]" src={v.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </>
            );
          })}
        </div>
      </div>
    )
  );
};
