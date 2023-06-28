import { BiHome } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { TfiVideoClapper } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import ec_logo from "../../Images/ec_logo.png";
import { ThemeSwitch } from "../Language/LanguageSwitch";
export const Sidebar = () => {
  const location = useLocation();

  const size = "1.5em";
  return (
    <>
      {/** Sidebar Title */}
      <nav className="sticky top-0 left-0 flex h-screen flex-col border-r bg-white px-2 py-8 dark:border-gray-700 dark:bg-dark-secondary lg:w-64 lg:px-4">
        <div className="flex items-center justify-start gap-2 px-4">
          <img width={32} height={"32"} src={ec_logo}></img>
          <h2 className="text-applied hidden text-3xl font-semibold dark:text-dark-text-hover lg:flex">
            ENERCON
          </h2>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-600" />
        <div className="  flex flex-1 flex-col justify-between">
          <nav>
            {/** Dashboard Button */}
            <Link
              className={`text-applied  flex max-w-fit items-center py-2 px-4 lg:max-w-full ${
                location.pathname === "/admin" &&
                "text-applied rounded-md bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover"
              } text-applied transform rounded-md transition-colors duration-300 hover:bg-gray-100  dark:hover:bg-gray-800`}
              to="/admin"
            >
              <MdOutlineDashboard size={size} />

              <span className="mx-4 hidden font-medium lg:flex">Dashboard</span>
            </Link>
            {/** Video Button */}
            <Link
              className={`text-applied mt-5 flex max-w-fit items-center py-2 px-4
              lg:max-w-full ${
                location.pathname.includes("/videos") &&
                "text-applied rounded-md bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover"
              } text-applied transform rounded-md transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
              to="videos"
            >
              <TfiVideoClapper size={size} />

              <span className="mx-4 hidden font-medium lg:flex">Videos</span>
            </Link>
            {/** Client Button */}
            <Link
              className={`text-applied mt-5 flex max-w-fit items-center py-2 px-4
              lg:max-w-full ${
                location.pathname.includes("/clients") &&
                "text-applied rounded-md bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover"
              } text-applied transform rounded-md transition-colors duration-300 hover:bg-gray-100  dark:hover:bg-gray-800`}
              to="clients"
            >
              <RiComputerLine size={size} />
              <span className="mx-4 hidden font-medium lg:flex">Clients</span>
            </Link>
            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            {/** Theme Switcher */}
            <div
              className="text-applied text-applied mt-5 flex w-full max-w-fit
transform cursor-pointer items-center  rounded-md px-4 py-2 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800  lg:max-w-full"
            >
              <ThemeSwitch className="flex w-full flex-row items-center  gap-2" />
            </div>
          </nav>{" "}
        </div>
        <Link
          to="/"
          className="text-applied text-applied  items-cent cursor-pointerer mt-5 flex w-full
max-w-fit transform cursor-pointer gap-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover  lg:max-w-full"
        >
          <BiHome size={size} />
          <span className="hidden lg:flex">Home</span>
        </Link>
      </nav>
    </>
  );
};
