import useLocalStorageState from "use-local-storage-state";

type lang = {
  en: "";
  de: "";
};
const useLanguage = () => {
  const [storage, setStorage] = useLocalStorageState("language");
  return { storage, setStorage };
};

export default useLanguage;
