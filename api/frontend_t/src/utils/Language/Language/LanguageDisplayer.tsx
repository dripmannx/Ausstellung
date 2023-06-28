import { FC } from "react";
import useLocalStorageState from "use-local-storage-state";
interface Props {
  en: string;
  de: string;
}

const LanguageDisplayer: FC<Props> = ({ en, de }) => {
  const [language] = useLocalStorageState("language");
  if (language === "en") {
    return <span>{en}</span>;
  }
  return <span>{de}</span>;
};

export default LanguageDisplayer;
