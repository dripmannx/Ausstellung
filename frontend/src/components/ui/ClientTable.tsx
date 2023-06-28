import clsx from "clsx";
import React, { useMemo } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDeleteClient } from "../../services/Querys";
import { Client } from "../../services/types";
interface Props {
  Clients: Client[];
  query: string;
}
export const ClientTable = ({ Clients, query }: Props) => {
  const handleSuccess = () => {
    /* Toast({
      text: "Client erfolgreich hinzugefügt",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    }); */
  };

  const handleError = () => {
    console.log("Error");
  };
  const deleteClient = useDeleteClient({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const handleDelete = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    deleteClient.mutate({ id: id });
  };
  const navigate = useNavigate();
  //Filtered Items based on query Term
  const filteredItems = useMemo(
    () =>
      Clients?.filter((item) => {
        if (query.length === 0) {
          return item;
        } else if (
          item.pc_name?.toLowerCase().includes(query?.toLowerCase()) ||
          item.ip_address.includes(query?.toLowerCase())
        ) {
          return item;
        }
      }),
    [query, Clients]
  );
  if (filteredItems.length === 0)
    return (
      <div className="h-full text-center text-2xl dark:text-dark-text-base ">
        Keine Ergebnisse zur Suche
      </div>
    );
  return (
    <>
      <div className="overlow-x-auto scrollbarContainer md:1/2 mt-5 mb-10 w-full cursor-pointer overflow-y-auto rounded-lg border border-gray-700 shadow-md dark:bg-dark-secondary lg:h-2/6">
        <table className="  w-full border-collapse overflow-x-auto bg-light-primary text-left text-sm  dark:bg-dark-secondary">
          <thead className="sticky top-0  cursor-default bg-gray-50 text-lg font-bold dark:bg-dark-secondary dark:text-dark-text-hover">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">
                Name
              </th>
              <th scope="col" className=" px-6 py-4 font-medium">
                IP Adresse
              </th>
              <th
                scope="col"
                className="hidden px-6 py-4 text-center font-medium lg:table-cell"
              >
                Austellungs Client
              </th>
              <th
                scope="col"
                className="hidden px-6 py-4 text-center font-medium lg:table-cell"
              >
                Anzahl Videos
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 border-t border-gray-700 text-lg dark:text-dark-text-hover">
            {filteredItems.map((client) => (
              <tr
                onClick={() => navigate(`/admin/clients/${client.id}`)}
                key={client.id}
                className="hover:bg-gray-50 hover:dark:bg-zinc-800"
              >
                <td className="flex gap-3 px-6 py-4 font-normal ">
                  <div>{client.pc_name} </div>
                </td>
                <td className="px-6 py-4">{client.ip_address}</td>
                <td className="hidden justify-center px-6 py-4 lg:flex">
                  <span className="inline-flex   items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-center text-xs font-semibold text-gray-900">
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 rounded-full text-center ",
                        client.is_expo_client ? "bg-green-600" : "bg-red-400"
                      )}
                    ></span>
                    {client.is_expo_client ? "Ja" : "Nein"}
                  </span>
                </td>
                <td className="hidden px-6 py-4 text-center lg:table-cell">
                  {client.Videos?.length}{" "}
                </td>
                <td className="px-6 py-4 dark:text-dark-text-base ">
                  <div className="flex justify-end gap-4">
                    <div
                      onClick={(e) => {
                        handleDelete(e, client.id);
                        e.stopPropagation();
                      }}
                    >
                      <BiTrash
                        size="1.5em"
                        className="dark:hover:text-dark-text-hover"
                      />
                    </div>
                    <BiEdit
                      size="1.5em"
                      className="hidden dark:hover:text-dark-text-hover lg:flex"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
