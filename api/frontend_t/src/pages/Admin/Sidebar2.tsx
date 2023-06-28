import { AiOutlineDesktop, AiOutlineVideoCamera } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import useMediaQuery from "../../components/Hooks/useMediaQuery";
import ENERCON_logo_einfach from "../../Images/ENERCON_logo_einfach.png";
import LanguageDisplayer from "../../utils/Language/Language/LanguageDisplayer";
import LanguageSwitcher from "../../utils/Language/Language/LanguageSwitcher";
interface Props {
  handleClick: (num: number) => void;
  tab: number;
}
const Sidebar2 = ({ handleClick, tab }: Props) => {
  const isMobile = useMediaQuery({ query: "(min-width: 960px)" });
  return (
    <div className="table-cell h-full w-40 flex-col items-center overflow-hidden    shadow-xl">
      <aside>
        <a
          className="mt-3 flex w-full cursor-default items-center justify-center px-3 lg:px-10"
          href="#"
        >
          <img width="32" src={ENERCON_logo_einfach}></img>
          {isMobile && <span className="ml-2 text-sm font-bold ">ENERCON</span>}
        </a>
        <div className="w-full px-2">
          <div className="mt-3 flex  w-full flex-col items-center border-t border-gray-700">
            <a
              onClick={() => handleClick(1)}
              className={`mt-2  flex h-12 w-full items-center justify-center px-3 lg:px-10 ${
                tab === 1 ? "bg-gray-700 text-gray-200" : null
              } rounded hover:bg-gray-700 hover:text-gray-300`}
              href="#"
            >
              <AiOutlineDesktop size={"1.5em"} />
              {isMobile && (
                <span className="none ml-2 text-sm font-medium lg:block">
                  Clients
                </span>
              )}
            </a>
            <a
              onClick={() => handleClick(2)}
              className={`mt-2  flex h-12 w-full items-center justify-center px-3 lg:px-10 ${
                tab === 2 ? "bg-gray-700 text-gray-200" : null
              } rounded hover:bg-gray-700 hover:text-gray-300`}
              href={"#"}
            >
              <AiOutlineVideoCamera size={"1.5em"} />
              {isMobile && (
                <span className="ml-2 text-sm font-medium">Videos</span>
              )}
            </a>
          </div>
          <div className="mt-2 flex w-full flex-col items-center border-t border-gray-700"></div>
          <a
            className="relative mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-gray-700 hover:text-gray-300 lg:px-10"
            href="#"
          >
            {" "}
            <LanguageSwitcher className="flex w-full flex-row  gap-2" />{" "}
          </a>
          <div className="mt-2 flex w-full flex-col items-center border-t border-gray-700"></div>
          <Link
            className="relative mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-gray-700 hover:text-gray-300 lg:px-10"
            to="/"
          >
            {" "}
            <IoMdArrowBack size={"3em"} />
            <LanguageDisplayer de="Zurück zur Übersicht" en="Back to Home" />
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar2;
