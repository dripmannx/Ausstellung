import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridColumns } from "@mui/x-data-grid-pro";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Client, { Video } from "../../services/types";

interface Props {
  allClients: Client[];
  allVideos: Video[];
}

export default function MuiTable({ allClients, allVideos }: Props) {
  const handleClick = (cellValues: Client) => {
    navigate(`/EditClient/${cellValues.id}`, {
      state: { client: cellValues, allVideos: allVideos },
    });
  };

  const navigate = useNavigate();

  const columns: GridColumns = [
    {
      field: "pc_name",
      headerName: "Client Name",
      minWidth: 100,
      align: "center",
      headerAlign: "center",

      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "ip_address",
      headerName: "IP-Adresse",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      disableColumnMenu: true,
    },
    {
      disableColumnMenu: true,
      field: "is_expo_client",
      align: "center",
      headerName: "Ausstellungs Client",
      type: "boolean",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      disableColumnMenu: true,
      field: "client_video_number",
      headerName: "Anzahl Videos",
      headerAlign: "center",
      filterable: false,

      type: "number",
      align: "center",
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        return <div>{cellValues.row.Videos.length}</div>;
      },
    },
    {
      disableColumnMenu: true,
      field: "Bearbeiten",
      align: "center",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <button
            className="btn-link btn"
            onClick={(event) => {
              handleClick(cellValues.row);
            }}
          >
            <BiEditAlt size="2.5em" />
          </button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={allClients}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}
