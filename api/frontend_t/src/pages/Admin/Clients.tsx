import React from "react";
import { useNavigate } from "react-router-dom";
import Client, { Video } from "../../services/types";
import MuiTable from "./MuiTable";

interface Props {
  allClients: Client[];
  allVideos: Video[];
}
const Clients: React.FC<Props> = ({ allClients, allVideos }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full flex-col lg:w-[85%]">
        <MuiTable allVideos={allVideos} allClients={allClients} />
      </div>
    </>
  );
};
export default Clients;
