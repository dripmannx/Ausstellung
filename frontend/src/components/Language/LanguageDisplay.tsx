import useLocalStorageState from "use-local-storage-state";
interface Props {
  en: string;
  de: string;
}

const LanguageDisplay = ({ en, de }: Props) => {
  const [language] = useLocalStorageState("language");
  if (language === "en") {
    return <span>{en}</span>;
  }
  return <span>{de}</span>;
};

export default LanguageDisplay;
