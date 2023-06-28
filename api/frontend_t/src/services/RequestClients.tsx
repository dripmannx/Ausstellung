import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import Client from "./types";
const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response;
};
export default fetchData;

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
  id: z.number(),
  pc_name: z.string(),
  ip_address: z
    .string()
    .regex(
      new RegExp(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
      )
    ),
  is_expo_client: z.boolean(),
  Videos: z.array(getVideoValidator),
});

export function useGetCurrentClient() {
  return useQuery<Client>(
    ["current-pc"],
    async () => {
      return await axios
        .get(`http://${import.meta.env.VITE_SERVER_ADDRESS}/api/current-pc`)
        .then((res) => res.data);
    },
    {
      onError() {
        console.log("Error");
      },
      //2 Minutes to refresh
      staleTime: 60 * 2000,
    }
  );
}
export function useGetAllClients() {
  return useQuery<Array<Client>>(
    ["all-pcs"],
    async () => {
      return await axios
        .get(`http://${import.meta.env.VITE_SERVER_ADDRESS}/api/all-pcs`)
        .then((res) => res.data);
    },
    {
      onError(err) {},
    }
  );
}
export function useGetClient(id: string | undefined) {
  if (id === undefined) return;
  return useQuery(["pc-by-id"], async () => {
    const res = await (
      await fetch(`http://${import.meta.env.VITE_SERVER_ADDRESS}/api/pc/${id}`)
    ).json();
    return getClientValidator.parse(res);
  });
}
interface configInterface {
  config: { onSuccess: () => void; onError: () => void };
}

interface mutationInterface {
  clientId: number;
  formData: Client;
}
export function usePatchClients({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ clientId, formData }: mutationInterface) => {
      await axios.patch(
        `http://${import.meta.env.VITE_SERVER_ADDRESS}/api/pc/${clientId}`,
        formData
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["all-pcs"] });
        queryClient.refetchQueries({ queryKey: ["current-pc"] });
        queryClient.invalidateQueries({
          queryKey: ["current-pc-videos"],
        });

        //wait for closing to display success

        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log("error");
      },
    }
  );
}
interface deleteClient {
  clientId: number;
}
export function useDeleteClients({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ clientId }: deleteClient) => {
      await axios.delete(
        `http://${import.meta.env.VITE_SERVER_ADDRESS}/api/pc/${clientId}`
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries(["current-pc-videos", "all-pcs"]);
        //wait for closing to display success
        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log("error");
      },
    }
  );
}
interface PostClients {
  formData: Client;
}
export function usePostClients({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ formData }: PostClients) => {
      await axios
        .post(
          `http://${import.meta.env.VITE_SERVER_ADDRESS}/api/all-pcs`,
          formData
        )
        .then((resp) => resp.data);
    },
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries(["all-pcs"]);
        //wait for closing to display success
        config.onSuccess();
      },
      onError: (error: AxiosError) => {
        console.log(error?.response?.data);
      },
    }
  );
}
