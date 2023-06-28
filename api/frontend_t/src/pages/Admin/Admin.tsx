import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import VideoAdmin from "../../components/Card/VideoAdmin";
import preloader from "../../Images/preloader.gif";
import { useGetAllClients } from "../../services/RequestClients";
import { useGetAllVideos } from "../../services/RequestVideos";
import NotFound from "../NotFound";
import Clients from "./Clients";
import Sidebar2 from "./Sidebar2";

type Props = {};

const Admin = (props: Props) => {
  const allClients = useGetAllClients();

  const allVideos = useGetAllVideos();
  const [tab, setTab] = useState<number>(1);
  const handleClick = (num: number) => {
    setTab(num);
  };
  const tabs = [
    ["Dashboard"],
    ["Clients", "/NewClient"],
    ["Videos", "/NewVideo"],
  ];
  if (allClients.isError || allVideos.isError) return <NotFound path="/" />;

  if (allClients.data && allVideos.data)
    return (
      <>
        {/* Table Wrapper */}
        <div className="table h-screen w-full">
          <Sidebar2 handleClick={handleClick} tab={tab} />
          <div className="table-cell h-full w-full justify-center align-top">
            <div className="mt-5 flex h-20 w-full justify-center">
              <div className="flex w-[85%] items-center justify-between rounded border-white px-5 shadow-lg">
                {" "}
                <div className="flex w-full justify-between">
                  <h1 className="font-weigt-700  text-[2.5rem]">
                    {tabs[tab][0]}
                  </h1>
                  <span>
                    <Link to={tabs[tab][1]} className="btn-outline btn">
                      <IoMdAdd size="2em" />
                    </Link>
                  </span>
                </div>
              </div>{" "}
            </div>

            <div className="mt-10 flex w-full justify-center ">
              {tab === 1 && (
                <Clients
                  allVideos={allVideos.data}
                  allClients={allClients.data}
                />
              )}
              {tab === 2 && (
                <div className="w-[85%]">
                  <VideoAdmin Videos={allVideos.data} />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      Einen Augenblick...
      <progress className="progress mt-5 w-56 items-center"></progress>
      <img className="" width="64" src={preloader}></img>
    </div>
  );
};
export default Admin;
