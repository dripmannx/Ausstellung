export type Video = {
  id: number;
  video: string;
  screenshot: string;
  published?: string;
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
export type AddVideo = {
  
  video: File;
  screenshot: File;

  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
export type UpdateVideo = {
  video: File|string;
  screenshot: File|string;
  
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
export type Client = {
  id: number;
  pc_name: string;
  ip_address: string;
  is_expo_client: boolean;
  Videos: Video[];
};


import { z } from "zod";
export const VideoInterface = z.object({
  
  title_de: z.string().min(1, { message: "Deutschen Titel angeben" }),
  title_en: z.string().min(1, { message: "Englischen Titel angeben" }),
  text_de: z.string().min(1, { message: "Deutschen Text angeben" }),
  text_en: z.string().min(1, { message: "Englischen Text angeben" }),
});

export const ClientInterface = z.object({
  id: z.number().optional(),
  pc_name: z.string().min(1, { message: "Name angeben" }),
  ip_address: z.string().min(1, { message: "IP Adresse angeben" }),
  is_expo_client: z.boolean(),
 
});
export type stats ={
  videos:number;
  clients:number
}