import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ModalGuiaState } from "../../storage/atom/guias/modal.atom";
import { VideosGuiasState } from "../../storage/atom/guias/videos.atom";

export const GuideButton = ({ arregloVideos }) => {
  const [modalGuia, setModalGuia] = useRecoilState(ModalGuiaState);
  const [videosGuias, setVideosGuias] = useRecoilState(VideosGuiasState);

  const openGuide = () => {
    setVideosGuias(arregloVideos);
    setModalGuia(true);
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[4.5rem] w-[4.5rem] fixed bottom-8 right-8 hover:scale-110 transition-[transform] hover:cursor-pointer"
        viewBox="0 0 20 20"
        fill="#67900c"
        onClick={(e) => openGuide()}
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
