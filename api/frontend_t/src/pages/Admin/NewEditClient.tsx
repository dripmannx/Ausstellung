import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { boolean, object, string, z } from "zod";
import Alert from "../../components/Alert/Alert";
import { Container } from "../../components/Container";
import CheckboxList from "../../components/Inputs/CheckboxList";
import { Form, useZodForm } from "../../components/Inputs/Form";
import { SubmitButton } from "../../components/Inputs/SubmitButton";
import { TextInput } from "../../components/Inputs/TextInput";
import Toast from "../../components/Toast";
import {
  useDeleteClients,
  usePatchClients,
  usePostClients,
} from "../../services/RequestClients";
import Client, { Video } from "../../services/types";

export const newVideoSchema = z.object({
  id: z.number(),
  video: string(),
  screenshot: string(),
  published: string(),
  title_de: string().max(200),
  title_en: string().max(200),
  text_de: string().max(2000),
  text_en: string().max(2000),
});
export const newClientSchema = object({
  ip_address: string()
    .min(1, { message: "IP Adresse muss angegeben sein" })
    .regex(
      new RegExp(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
      ),
      { message: "IP Adresse nicht im richtigem Format" }
    ),
  pc_name: string().min(1, { message: "Name muss angegeben sein" }),
  is_expo_client: boolean(),
});
interface Props {
  Client?: Client;

  Videos: Video[];
}
export function NewEditClient({ Videos, Client }: Props) {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
  const [clientVideos, setClientVideos] = useState<Video[]>(Videos);
  const form = useZodForm({
    schema: newClientSchema,
  });
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
    if (Client) deleteClient.mutate({ clientId: Client.id });
  };
  const onSubmit = (data: {
    pc_name: string;
    ip_address: string;
    is_expo_client: boolean;
  }) => {
    let formData = { ...data } as Client;

    formData["Videos"] = clientVideos;
    if (!Client) {
      postClient.mutate({ formData: formData });
    } else {
      updateClient.mutate({
        formData: formData,
        clientId: Client.id,
      });
    }
  };
  useEffect(() => {
    if (postClient.error?.code == "ERR_BAD_REQUEST")
      setInputError({
        open: true,
        message: "Falsche Eingabe oder Name und IP-Adresse exestieren bereits",
      });
    if (Client !== undefined) {
      form.setValue("pc_name", Client.pc_name);
      form.setValue("ip_address", Client.ip_address);
      form.setValue("is_expo_client", Client.is_expo_client);
    }
    if (Client) {
      setClientVideos(Client.Videos);
    } else {
      setClientVideos(Videos);
    }
  }, [postClient.isError, Client]);
  return (
    <div className="flex w-full justify-center">
      <Container title="Neuer Client">
        <Alert
          open={inputError.open}
          title="Fehler bei der Eingabe"
          text={inputError.message}
        />
        <Form form={form} onSubmit={(data) => onSubmit(data)}>
          <TextInput label="Name" {...form.register("pc_name")} />
          <TextInput label="IP Adresse" {...form.register("ip_address")} />
          <TextInput
            type="checkbox"
            label="Ausstellungs Client"
            {...form.register("is_expo_client")}
          />
          <CheckboxList
            clientVideos={clientVideos}
            setClientVideos={setClientVideos}
            allVideos={Videos}
          />{" "}
          <div className={`${Client ? "justify-left flex gap-7" : "w-full"}  `}>
            <SubmitButton className="btn-primary btn">
              {Client ? "Änderungen Speichern" : "Client Erstellen"}
            </SubmitButton>
            {Client && (
              <button
                onClick={handleDelete}
                className={`btn-outline btn-error btn`}
              >
                Löschen
              </button>
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
}
export default NewEditClient;
