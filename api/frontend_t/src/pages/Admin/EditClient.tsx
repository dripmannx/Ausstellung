import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Client, { Video } from "../../services/types";

import CheckboxList from "../../components/Inputs/CheckboxList";
import Input from "../../components/Inputs/Input";

import { useQueryClient } from "@tanstack/react-query";
import { useTitle } from "ahooks";
import { BiCheckCircle } from "react-icons/bi";
import Alert from "../../components/Alert/Alert";
import Toast from "../../components/Toast";
import {
  useDeleteClients,
  usePatchClients,
} from "../../services/RequestClients";
import NotFound from "../NotFound";

export const getVideoValidator = z.object({
  id: z.number(),
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});
export const getClientValidator = z.object({
  id: z.number().optional(),
  pc_name: z.string().min(4, { message: "Name zu kurz" }),
  ip_address: z
    .string()
    .regex(
      new RegExp(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
      ),
      { message: "IP Adresse nicht im richtigem Format" }
    ),
  is_expo_client: z.boolean(),
  Videos: z.array(getVideoValidator),
});

interface ClientInterface {
  id: number;
  ip_address: string;
  pc_name: string;
  is_expo_client: boolean;
  Videos: Video[];
}

const EditClient = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const { client, allVideos } = location.state as any;

  const { id } = useParams<string>();

  // Type Casting, then you can get the params passed via router
  if (!client || !id) return <NotFound path="/Admin" />;
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
  useTitle("Client: " + client.name);
  const [clientName, setClientName] = useState(client?.pc_name ?? "");
  const [clientIpAddress, setClientIpAddress] = useState(
    client?.ip_address ?? ""
  );
  const [isExpoClient, setIsExpoClient] = useState(
    client?.is_expo_client ?? false
  );
  const [clientVideos, setClientVideos] = useState(client?.Videos ?? []);
  //UPDATE client Logic
  const handleSuccess = () => {
    Toast({
      text: "Aktion erfolgreich",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    });
    queryClient.invalidateQueries({ queryKey: ["current-pc"] });
    navigate("/Admin");
  };
  const handleError = () => {
    console.log("Error");
  };
  const updateClient = usePatchClients({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const deleteClient = useDeleteClients({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteClient.mutate({ clientId: client.id });
  };

  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = {} as Client;
    formData["pc_name"] = clientName;
    formData["ip_address"] = clientIpAddress;
    formData["is_expo_client"] = isExpoClient;
    formData["Videos"] = clientVideos;
    try {
      getClientValidator.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        /* map zod errors to the appropriate form fields */
        console.log(error.errors[0].message);
        setInputError({
          open: true,
          message: error.errors[0].message,
        });
        return;
      }
    }

    updateClient.mutate({ clientId: client.id, formData: formData });
  }

  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-1/2 rounded bg-white p-5 shadow-lg">
          <h1 className="prose-xl">
            Einstelleungen für{" "}
            <span className="text-secondary">{client?.pc_name}</span>
          </h1>
          <Alert
            open={inputError.open}
            title="Fehler bei der Eingabe"
            text={inputError.message}
          />
          <form className="mt-5" onSubmit={onSubmit}>
            <Input
              label="Client Name"
              value={clientName}
              onChange={setClientName}
              required={true}
              name="pc_name"
              placeholder="Ausstellungs Client"
            ></Input>
            <Input
              label="IP Adresse"
              value={clientIpAddress}
              onChange={setClientIpAddress}
              required={true}
              name="ip_address"
              placeholder="192.168.1.1"
            ></Input>
            <label className="flex  cursor-pointer gap-5">
              <span className="label-text">Austellungs Client?</span>
              <input
                type="checkbox"
                checked={isExpoClient}
                className="checkbox-primary checkbox"
                onChange={() => {
                  setIsExpoClient(!isExpoClient);
                }}
              />
            </label>
            {/*             <List pcVideos={client?.Videos} allVideos={allVideos} />{' '}
             */}{" "}
            <CheckboxList
              clientVideos={clientVideos}
              setClientVideos={setClientVideos}
              allVideos={allVideos}
            />{" "}
            <div className="justify-left mt-7 flex items-center gap-5">
              <button
                type="submit"
                className={`btn-primary btn ${
                  updateClient.isLoading ? "loading" : null
                }`}
              >
                Änderung Speichern
              </button>
              <button
                onClick={handleDelete}
                className={`modal-button btn-outline btn-error btn`}
              >
                Löschen
              </button>
            </div>
          </form>
          {/* <AlertDialog
            title_de={`${client?.pc_name}`}
            title_en={`${client?.pc_name}`}
            text_en={`do you really want to delete ${client?.pc_name}? `}
            text_de={`Willst du ${client?.pc_name} wirklich löschen?`}
            handleClose={() => handleClose}
            handleSubmit={() => handleDelete}
            open={open}
          ></AlertDialog> */}
        </div>
      </div>
    </>
  );
};

export default EditClient;
