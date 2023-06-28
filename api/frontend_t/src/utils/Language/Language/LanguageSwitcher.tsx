import { FC } from "react";
import { De, Gb } from "react-flags-select";
import useLocalStorageState from "use-local-storage-state";
import useMediaQuery from "../../../components/Hooks/useMediaQuery";
interface Props {
  className?: string;
}
const LanguageSwitcher: FC<Props> = ({ className }) => {
  const [storage, setStorage] = useLocalStorageState("language", {
    defaultValue: "de",
  });
  const isMobile = useMediaQuery({ query: "(min-width: 960px)" });
  return (
    <div
      className={className}
      onClick={() => setStorage(storage === "de" ? "en" : "de")}
    >
      <span className="text-3xl">{storage === "en" ? <De /> : <Gb />}</span>
      {isMobile && <span>{storage === "en" ? "Deutsch" : "English"}</span>}
    </div>
  );
};

export default LanguageSwitcher;
