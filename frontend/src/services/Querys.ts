import { QueryClient, UseBaseQueryOptions, UseQueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AddVideo, Client, UpdateVideo, Video, stats } from "./types";

import { Params } from "react-router-dom";

const baseURL=`http://${import.meta.env.VITE_SERVER_ADDRESS}`
interface configInterface {
    config: { onSuccess: () => void; onError: () => void };
  }
  export const statsQuery = () => ({
    queryKey: ["stats"],
    queryFn: async (): Promise<stats> => {
      const res = axios
        .get("http://127.0.0.1:8000/api/stats")
        .then((res) => res.data).catch((err)=>console.log(err));
      return res;
    },
  });
export const allVideosQuery = () => ({
    queryKey: ["videos"],
    queryFn: async (): Promise<Video[]> => {
      const res = axios
        .get("http://127.0.0.1:8000/api/all-videos")
        .then((res) => res.data).catch((err)=>console.log(err));
      return res;
    },
  });
  export const allClientsQuery = () => ({
    queryKey: ["clients"],
    queryFn: async (): Promise<Client[]> => {
      const res = axios
        .get("http://127.0.0.1:8000/api/all-pcs")
        .then((res) => res.data).catch((err)=>console.log(err));
      return res;
    },
  });
  export const allVideosLoader = (queryClient: QueryClient) => async () => {
    const query = allVideosQuery();
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  export const statsLoader = (queryClient: QueryClient) => async () => {
    const query = statsQuery();
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  interface LoaderProps {
    id:string
  }
  export const allClientsLoader = (queryClient: QueryClient) => async () => {
    const query = allClientsQuery();
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  export const videoLoader = (queryClient: QueryClient) => async ({params}:any) => {
    const query = videoQuery({id:params.id});
    // ⬇️ return data or fetch it
    if(query?.queryKey)
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  export const clientQuery = ({id}:{id:string|undefined}):UseBaseQueryOptions => ({
    
    queryKey: ["client",id],
    queryFn: async (): Promise<Client> => {
       
      const res = axios
        .get(`${baseURL}/api/pc/${id}`)
        .then((res) => res.data);
      return res;
    },
    enabled:!!id,
    
    
  });
  
  export const useAddClient =  ({config}:configInterface) => {
    const queryClient = useQueryClient()
 
    return useMutation({
      mutationFn:  (newClient:Client) => 
        axios.post(`${baseURL}/api/all-pcs`, newClient),
      onSuccess: async () => {
        config.onSuccess();
    
        // ✅ refetch the comments list for our blog post
       await queryClient.refetchQueries({ queryKey: ['clients'] })
      },
      onError(error:AxiosError, variables, context) {
          console.log(error.response?.data)
          
      },
    })
  }
 
  export const useUpdateClient = ({config}:configInterface) => {
    interface Props {
        newClient:Client
        id:number
    }
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: ({newClient,id}:Props) =>
        axios.patch(`${baseURL}/api/pc/${id}`, newClient),
      onSuccess: () => {
        config.onSuccess();
        // ✅ refetch the comments list for our blog post
        queryClient.refetchQueries({ queryKey: ['clients'] })

      },
    })
  }
  
  export const useDeleteClient= ({config}:configInterface) => {
    interface Props {
    
        id:number
    }
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: ({id}:Props) =>
        axios.delete(`${baseURL}/api/pc/${id}`),
      onSuccess: () => {
        config.onSuccess();
        // ✅ refetch the comments list for our blog post
        queryClient.refetchQueries({ queryKey: ['clients'] })

      },
    })
  }




//-----------------------------------------------------------------Videos--------------------------------------------//
export const clientVideosLoader = (queryClient: QueryClient) => async () => {
  const query = clientVideosQuery();
  // ⬇️ return data or fetch it
  if(query?.queryKey)
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};


export const clientVideosQuery = ():UseBaseQueryOptions => ({

  queryKey: ["client-videos"],
  queryFn: async (): Promise<Video[]|Error> => {
    const res = axios
      .get("http://127.0.0.1:8000/api/current-pc-videos")
      .then((res) => res.data );
    return res;
  },
  staleTime:1000*5*60,
  refetchOnMount:false,
});

export const videoQuery = ({id}:{id:string|undefined}):UseBaseQueryOptions => ({
    
  queryKey: ["video",id],
  queryFn: async (): Promise<Client> => {
     
    const res = axios
      .get(`${baseURL}/api/video/${id}`)
      .then((res) => res.data);
    return res;
  },
  enabled:!!id
  
});
interface mutationInterface {
  newVideo:
  FormData;
  setProgress: (val: number) => void;
}
  export const useAddVideo= ({config}:configInterface) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({newVideo,setProgress}:mutationInterface) =>
        axios.post(`${baseURL}/api/all-videos`, newVideo,{onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );

          if (totalLength !== null) {
            setProgress(
              Math.round((progressEvent.loaded * 100) / totalLength)
            );
          }
        }}),
      onSuccess: () => {
        config.onSuccess();
    
        // ✅ refetch the comments list for our blog post
        queryClient.refetchQueries({ queryKey: ['videos'] })
      },
      onError(error:AxiosError, variables, context) {
          console.log(error.response?.data)
          
      },
    })
  }
 
  export const useUpdateVideo = ({config}:configInterface) => {
    interface Props {
        newVideo:FormData,
        id:number,
        setProgress: (val: number) => void;

    }
    const queryClient = useQueryClient()
    
    return useMutation({
      
      mutationFn: ({newVideo,id,setProgress}:Props) =>
        axios.patch(`${baseURL}/api/video/${id}`, newVideo,{onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );

          if (totalLength !== null) {
            setProgress(
              Math.round((progressEvent.loaded * 100) / totalLength)
            );
          }
        },}),
      onSuccess: () => {
        config.onSuccess();
        // ✅ refetch the comments list for our blog post
        queryClient.refetchQueries({ queryKey: ['videos'] })

      },
    })
  }
  
  export const useDeleteVideo= ({config}:configInterface) => {
    interface Props {
    
        id:number
    }
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: ({id}:Props) =>
        axios.delete(`${baseURL}/api/video/${id}`),
      onSuccess: () => {
        config.onSuccess();
        // ✅ refetch the comments list for our blog post
        queryClient.refetchQueries({ queryKey: ['videos'] })

      },
    })
  }