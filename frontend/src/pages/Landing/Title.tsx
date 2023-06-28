import { useLocation } from "react-router-dom";
import useLanguage from "../../components/Language/useLanguage";
import { Video } from "../../services/types";

type Props = {};

const Title = () => {
  const { storage } = useLanguage();
  const location = useLocation();
  const state = location.state?.video as Video;
  const returnSelectedLanguage = (de: string, en: string) => {
    if (storage === "de") return de;
    return en;
  };
  if (location.pathname === "/") {
    return <span>{returnSelectedLanguage("Video Übersicht", "Videos")}</span>;
  } else {
    return (
      <span>{returnSelectedLanguage(state.title_de, state.title_en)}</span>
    );
  }
};

export default Title;
