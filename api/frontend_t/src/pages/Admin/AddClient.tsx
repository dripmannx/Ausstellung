import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Client, { Video } from "../../services/types";

import CheckboxList from "../../components/Inputs/CheckboxList";
import Input from "../../components/Inputs/Input";

import { BiCheckCircle } from "react-icons/bi";
import Alert from "../../components/Alert/Alert";
import Toast from "../../components/Toast";
import { useGetClient, usePostClients } from "../../services/RequestClients";
import { useGetAllVideos } from "../../services/RequestVideos";
import { NewEditClient } from "./NewEditClient";

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
type errorPC = {
  pcName: Array<string>;
};
type errorIP = {
  ip_address: Array<string>;
};
type errorMe = {
  data: errorPC | errorIP | undefined;
};
export const AddClient = () => {
  const { id } = useParams<string>();

  const getClient = useGetClient(id);

  const getAllVideos = useGetAllVideos();

  if (getAllVideos.data)
    return (
      <NewEditClient Videos={getAllVideos.data} Client={getClient?.data} />
    );
  if (getAllVideos.isLoading || getClient?.isLoading)
    return <progress className="progress w-56"></progress>;
  return (
    <Alert
      variant="error"
      open={true}
      title="Fehler!"
      text="Fehler beim Laden"
    />
  );
};
type Props = { Videos: Video[] };
const AddClientService = ({ Videos }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Type Casting, then you can get the params passed via router
  const [open, setOpen] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientIpAddress, setClientIpAddress] = useState("");
  const [isExpoClient, setIsExpoClient] = useState(false);
  const [clientVideos, setClientVideos] = useState(Videos);

  //UPDATE client Logic
  const handleSuccess = () => {
    Toast({
      text: "Client erfolgreich hinzugefügt",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    });
    navigate("/Admin");
  };
  const handleError = () => {
    console.log("Error");
  };
  const postClient = usePostClients({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
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

        setInputError({
          open: true,
          message: error.errors[0].message,
        });
        return;
      }
    }
    postClient.mutate({ formData: formData });
  }

  useEffect(() => {
    if (postClient.error?.code == "ERR_BAD_REQUEST")
      setInputError({
        open: true,
        message: "Falsche Eingabe oder Name und IP-Adresse exestieren bereits",
      });
  }, [postClient.isError]);

  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-[90%] rounded bg-white p-5 shadow-lg lg:w-1/2">
          <h1 className="prose-xl">Neuen Client erstellen</h1>
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
            ></Input>
            <Input
              label="IP Adresse"
              value={clientIpAddress}
              onChange={setClientIpAddress}
              required={true}
              name="ip_address"
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
              allVideos={Videos}
            />{" "}
            <div className="justify-left mt-7 flex items-center gap-5">
              <button
                type="submit"
                className={`btn-primary btn ${
                  postClient.isLoading ? "loading" : null
                }`}
              >
                Client erstellen
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClient;
