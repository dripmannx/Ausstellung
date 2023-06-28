import { useContext } from "react";
import { FcBusinessman } from "react-icons/fc";
import { IoMdArrowBack } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import enercon_logo from "../../Images/enercon_logo.png";
import { useGetCurrentClient } from "../../services/RequestClients";
import { TitleContext } from "../../utils/Context";
import LanguageDisplayer from "../../utils/Language/Language/LanguageDisplayer";
import LanguageSwitcher from "../../utils/Language/Language/LanguageSwitcher";
import Show from "../Conditional/Show";
import useMediaQuery from "../Hooks/useMediaQuery";

type Props = {};

const Navbar2 = (props: Props) => {
  const title = useContext(TitleContext);
  const isMobile = useMediaQuery({ query: "(min-width: 960px)" });
  const location = useLocation();
  const navigate = useNavigate();

  const currentClient = useGetCurrentClient();
  if (!location.pathname.toLowerCase().includes("/admin"))
    return (
      <div
        className={`navbar sticky top-0 left-0 z-10  bg-white ${
          location.pathname !== "/Admin" ? "shadow-md" : null
        }`}
      >
        <div className="navbar-start lg:ml-5">
          <NavLink to="/" className=" hidden lg:flex lg:navbar-start">
            <figure>
              {" "}
              <img src={enercon_logo} className=" h-8" alt="ENERCON Logo" />
            </figure>
          </NavLink>
        </div>

        <div className="navbar-center">
          <span className="text-4xl text-primary">{title}</span>
        </div>
        {/*Zurück Button Mobile*/}
        <div className="navbar-end cursor-pointer lg:hidden">
          <Show
            condition={
              currentClient.data &&
              currentClient.data?.is_expo_client &&
              location.pathname !== "/Admin"
            }
          >
            <FcBusinessman onClick={() => navigate("/Admin")} size="2.5em" />
          </Show>
          <Show condition={location.pathname !== "/"}>
            <IoMdArrowBack onClick={() => navigate(-1)} size="2.5em" />
          </Show>
        </div>
        {/**Navbar Title */}

        {/**Navbar End Content */}
        <div className="navbar-end flex gap-10 lg:mr-5">
          <ul className="menu menu-horizontal gap-1 p-0">
            {/* Language Switcher */}
            <li tabIndex={0}>
              <LanguageSwitcher className="flex items-center gap-1 " />
            </li>
            <Show condition={!currentClient.data?.is_expo_client}>
              <li tabIndex={0}>
                <NavLink to="/Admin" aria-current="page">
                  <span className="flex  items-center gap-1">
                    <FcBusinessman size="2.5em" />
                    {isMobile && <LanguageDisplayer de="Admin" en="Admin" />}
                  </span>
                </NavLink>
              </li>
            </Show>
          </ul>

          <Show condition={location.pathname !== "/"}>
            <a
              className="btn-primary btn rounded-none"
              onClick={() => navigate(-1)}
            >
              {" "}
              <span className="flex  items-center  gap-1">
                <IoMdArrowBack size="2.5em" />
                <LanguageDisplayer de="Zurück" en="Back" />
              </span>
            </a>
          </Show>
        </div>
      </div>
    );
  return null;
};
export default Navbar2;
