import { useState } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import LanguageDisplay from "../components/Language/LanguageDisplay";

export const videoValidator = z.object({
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});
interface VideoInterface {
  id: number;
  video: string;
  screenshot: string;
  published: string;
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
}
type LocationState = {
  video: VideoInterface;
};
export const VideoPage = () => {
  const [load, setLoad] = useState(true);
  const location = useLocation();

  const state = location.state; // Type Casting, then you can get the params passed via router
  const { video } = state as LocationState;
  document.title = video.title_de;
  const videoType = video.video.split(".");
  return (
    <>
      <div className="my-7  ml-5 flex min-h-fit min-w-fit">
        <div className=" flex flex-col gap-5 lg:flex-row ">
          {video.video.endsWith(".svg") ? (
            <>
              {" "}
              <div className=" flex items-center justify-center ">
                <div className="w-[85%] ">
                  <img
                    className=""
                    src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                      video.video
                    }`}
                  ></img>
                </div>
              </div>
            </>
          ) : (
            <>
              <video
                preload="auto"
                onLoadedData={() => setLoad(true)}
                className="h-auto w-[90%] lg:w-[72rem]"
                autoPlay
                loop
                style={{ opacity: load ? 1 : 0 }}
              >
                <source
                  src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                    video.video
                  }`}
                  type={`Video/${videoType[1]}`}
                />
              </video>
              <div className="w-full">
                <p className=" w-[90%] text-xl">
                  <LanguageDisplay de={video.text_de} en={video.text_en} />
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
