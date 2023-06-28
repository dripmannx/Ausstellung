import { FC, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

interface Props {
  en?: string;
  de?: string;
}

const useLanguageDisplayer: FC<Props> = ({ en, de }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<String>("");
  const [language] = useLocalStorageState("language");
  if (language === "en") {
    setSelectedLanguage("en");
  } else if (language === "de") {
    setSelectedLanguage("de");
  }
  return <></>;
};

export default useLanguageDisplayer;
