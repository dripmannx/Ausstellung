import { Form, useZodForm } from "@ui/Form";
import { CheckBox, Input } from "@ui/Input";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  allVideosQuery,
  clientQuery,
  useAddClient,
  useUpdateClient,
} from "../../services/Querys";
import { Client, ClientInterface, Video } from "../../services/types";

import { useQuery } from "@tanstack/react-query";
import { Alert } from "@ui/Alert";
import CheckboxList from "@ui/CheckboxList";
import { Container } from "@ui/Container";
import { Loader } from "@ui/Loader";
import NavButton from "@ui/NavButton";
import { SubmitButton } from "@ui/SubmitButton";
import { BiArrowBack } from "react-icons/bi";
import { queryClient } from "../../App";

export function Index() {
  let { id } = useParams<string>();
  const navigate = useNavigate();

  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
  const data = useLoaderData();
  const { data: Videos } = useQuery(allVideosQuery());
  const { data: Client } = useQuery(clientQuery({ id }));

  if (Videos && Client)
    return (
      <div className="mt-5">
      <Container
     
        title={Client ? "Client bearbeiten" : "Neuer Client"}
        action={
          <NavButton text="Zurück" Icon={<BiArrowBack size={"1.5em"} />} back />
        }
      >
        <EditHelper Client={Client as Client} Videos={Videos} />
      </Container></div>
    );
  return <Loader text="Videos werden geladen..." />;
}
interface Props {
  Client: Client;
  Videos: Video[];
}

export function EditHelper({ Videos, Client }: Props) {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
  const [clientVideos, setClientVideos] = useState<Video[]>(Client.Videos);
  const form = useZodForm({
    schema: ClientInterface,
  });
  const handleSuccess = () => {
    /* Toast({
        text: "Client erfolgreich hinzugefügt",
        variant: "success",
        Icon: <BiCheckCircle />,
        TTL: 30,
      }); */
    
    navigate("/admin/clients");
  };
  const handleError = () => {
    console.log("Error");
  };
  const {
    mutate: addClientMutate,
    error: AddClientError,
    isError: AddClientIsError,
  } = useAddClient({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const updateClient = useUpdateClient({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const onSubmit = (data: {
    
    pc_name: string;
    ip_address: string;
    is_expo_client: boolean;
  }) => {
    let formData = { ...data } as Client;

    formData["Videos"] = clientVideos;
    
      updateClient.mutate({
        newClient: formData,
        id: Client.id,
      });
    }

  useEffect(() => {
    //@ts-nocheck
    if (AddClientError?.code == "ERR_BAD_REQUEST")
      setInputError({
        open: true,
        message: "Falsche Eingabe oder Name und IP-Adresse exestieren bereits",
      });
      form.setValue("pc_name", Client.pc_name);
      form.setValue("ip_address", Client.ip_address);
      form.setValue("is_expo_client", Client.is_expo_client);
  }, [Client]);
  return (
    <Form form={form} onSubmit={(data) => onSubmit(data)}>
      <Alert open={inputError.open} text={inputError.message} />
      <Input label="Name" {...form.register("pc_name")} />
      <Input label="IP Adresse" {...form.register("ip_address")} />
      <CheckBox
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
        <SubmitButton>
          {Client ? "Änderungen Speichern" : "Client Erstellen"}
        </SubmitButton>
      </div>
    </Form>
  );
}
