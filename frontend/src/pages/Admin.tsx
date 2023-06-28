import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import Dropdown from "@ui/Dropdown";
import { Sidebar } from "@ui/Sidebar";
import { BiBook } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import { TfiVideoClapper } from "react-icons/tfi";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import Stat from "../components/ui/Stat";
import { stats } from "../services/types";
const links = [
  {
    link: "/admin/clients/new",
    label: "Client",
    icon: <RiComputerLine size={"1.5em"} />,
  },
  {
    link: "/admin/videos/new",
    label: "Video",
    icon: <TfiVideoClapper size={"1.5em"} />,
  },
];
export const Admin = () => {
  const data = useLoaderData() as stats;

  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  //State for SearchQuery for child components
  const bg = isDarkMode ? "bg-dark-primary" : "bg-light-primary";
  return (
    <>
      <div className={` flex h-full ${bg}`}>
        {" "}
        <Sidebar />
        <main className=" flex w-screen justify-center">
          <div className=" w-[90%]">
            {location.pathname.toLowerCase() === "/admin" && (
              <>
                <Container
                  margin="mt-5"
                  title="Dashboard"
                  action={<Dropdown DropDownItems={links} />}
                >
                  {/**empty child  */}
                  <></>
                </Container>
                {/**Main Dashboard Content wich only appears on Index Route */}
                <Container margin="mt-5" title="Handbuch">
                  <div className="flex flex-col gap-5">
                    <span className="text-light-text dark:text-dark-text-base">
                      Das Handbuch zur Bendienung finden Sie unter folgendem
                      Link, als PDF zum angucken oder runterladen.
                      <br />
                    </span>
                    <Button fullWidth={false} icon>
                      <BiBook size="1.5em" />
                      Zum Handbuch
                    </Button>
                  </div>
                </Container>{" "}
                <div className="mt-5  flex flex-col justify-between gap-5 lg:flex-row lg:gap-24">
                  <Stat
                    Count={data.clients}
                    Icon={<RiComputerLine size={"2em"} />}
                    Title="Clients"
                    to="/admin/clients"
                  />
                  <Stat
                    Count={data.videos}
                    Icon={<TfiVideoClapper size={"2em"} />}
                    Title="Videos"
                    to="/admin/videos"
                  />
                </div>
              </>
            )}
            {/**Childs*/}
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
