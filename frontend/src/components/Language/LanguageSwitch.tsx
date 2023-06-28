import { FC } from "react";
import { De, Gb } from "react-flags-select";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import useLocalStorageState from "use-local-storage-state";
import { useDarkMode } from "usehooks-ts";
interface Props {
  className?: string;
}
export const LanguageSwitch: FC<Props> = ({ className }) => {
  const [storage, setStorage] = useLocalStorageState("language", {
    defaultValue: "de",
  });
  return (
    <div
      className={className}
      onClick={() => setStorage(storage === "de" ? "en" : "de")}
    >
      <span className="text-3xl">{storage === "en" ? <De /> : <Gb />}</span>

      <span className="hidden lg:flex">
        {storage === "en" ? "Deutsch" : "English"}
      </span>
    </div>
  );
};
export const ThemeSwitch: FC<Props> = ({ className }) => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <div className={className} onClick={() => toggle()}>
      <span className="text-3xl">
        {isDarkMode ? <BsFillSunFill color="white" /> : <BsFillMoonFill />}
      </span>

      <span className="hidden lg:block">
        {isDarkMode ? "Light Theme" : "Dark Theme"}
      </span>
    </div>
  );
};
