import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Video } from "../../services/types";

import Input from "../../components/Inputs/Input";

import { useTitle } from "ahooks";
import { BiCheckCircle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import Alert from "../../components/Alert/Alert";
import Collapse from "../../components/Collapse";
import Toast from "../../components/Toast";
import { useDeleteVideos, usePatchVideos } from "../../services/RequestVideos";
import NotFound from "../NotFound";

export const getVideoValidator = z.object({
  id: z.number().optional(),
  video: z.instanceof(File, { message: "Kein Video ausgewählt" }).optional(),
  screenshot: z
    .instanceof(File, {
      message: "Kein Screenshot ausgewählt",
    })
    .optional(),
  published: z.string().optional(),
  title_de: z.string().max(200, { message: "Titel DE zu lang" }),
  title_en: z.string().max(200, { message: "Titel EN zu lang" }),
  text_de: z.string().max(2000, { message: "Text DE zu lang" }),
  text_en: z.string().max(2000, { message: "Text EN zu lang" }),
});
export type VideoInputType = {
  video: File;
  screenshot: File;

  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
type Props = {};
const EditVideo: React.FC<Props> = () => {
  type LocationState = {
    video: Video;
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { video } = location.state as LocationState;
  const { id } = useParams<string>();

  // Type Casting, then you can get the params passed via router
  if (!video || !id) return <NotFound path="/Admin" />;
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
  useTitle("Video: " + video.title_de);
  const [videoString, setVideoString] = useState(video.video ?? "");
  const [screenshot, setScreenshot] = useState(video.screenshot ?? "");
  const [videoFile, setVideoFile] = useState<File>();
  const [screenshotFile, setScreenshotFile] = useState<File>();
  const [title_de, setTitle_de] = useState(video.title_de ?? "");
  const [title_en, setTitle_en] = useState(video.title_en ?? "");
  const [text_de, setText_de] = useState(video.text_de ?? "");
  const [text_en, setText_en] = useState(video.text_en ?? "");
  const [progress, setProgress] = useState(0);
  //UPDATE client Logic
  const handleSuccess = () => {
    Toast({
      text: "Aktion erfolgreich durchgeführt",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    });
    navigate("/Admin");
  };
  const handleError = () => {
    console.log("Error");
  };
  const updateVideo = usePatchVideos({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const deleteVideo = useDeleteVideos({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    video.id ? deleteVideo.mutate({ videoId: video.id }) : null;
  };

  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form_data = {} as VideoInputType;

    const formData = new FormData();
    if (screenshotFile) {
      formData.append("screenshot", screenshotFile);
      form_data["screenshot"] = screenshotFile;
    }
    if (videoFile) {
      form_data["video"] = videoFile;
      formData.append("video", videoFile);
    }

    formData.append("title_de", title_de);
    formData.append("title_en", title_en);
    formData.append("text_de", text_de);
    formData.append("text_en", text_en);

    form_data["title_de"] = title_de;
    form_data["title_en"] = title_en;
    form_data["text_de"] = text_de;
    form_data["text_en"] = text_en;

    try {
      getVideoValidator.parse(form_data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        /* map zod errors to the appropriate form fields */
        console.log(error);
        setInputError({
          open: true,
          message: error.errors[0].message,
        });
        return;
      }
    }

    video.id
      ? updateVideo.mutate({
          videoId: video.id,
          formData: formData,
          setProgress: setProgress,
        })
      : null;
  }

  const changeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setVideoFile(fileList[0]);
  };
  const changeScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setScreenshotFile(fileList[0]);
  };
  console.log(`http://${import.meta.env.VITE_SERVER_ADDRESS}${video.video}`);
  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 rounded bg-white p-5 shadow-lg lg:w-1/2">
          <h1 className="prose-xl">
            Einstelleungen für{" "}
            <span className="text-secondary">{video.title_de}</span>
          </h1>
          <Alert
            open={inputError.open}
            title="Fehler bei der Eingabe"
            text={inputError.message}
          />
          <form className="mt-5" onSubmit={onSubmit}>
            {updateVideo.isLoading ? (
              <>
                {" "}
                <div
                  className="radial-progress text-primary"
                  style={{ "--value": progress } as React.CSSProperties}
                >
                  {progress}%
                </div>
              </>
            ) : (
              <>
                <Collapse
                  title="Video"
                  defaultState={false}
                  width="self-center w-[90%] lg:w-full max-h-fit "
                >
                  <div
                    className="text-xl text-primary
                  "
                  >
                    {video.video.substring(video.video.lastIndexOf("/") + 1)}
                  </div>
                  <a
                    href={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                      video.video
                    }`}
                    className=" btn-primary btn mt-5"
                    target="_blank"
                  >
                    <BsFillPlayFill size="2.5em" /> Zum Video
                  </a>{" "}
                  <br />
                  <div className="form-label mb-2 mt-5 inline-block text-primary">
                    Video ändern?
                  </div>{" "}
                  <br />
                  <input
                    type="file"
                    className="file-input-bordered file-input-primary file-input w-full max-w-xs"
                    id="videoFile"
                    onChange={changeVideo}
                    accept="video/*"
                  />
                </Collapse>
                <Collapse
                  defaultState={false}
                  width="self-center w-[90%] lg:w-full max-h-fit "
                  title="Screenshot"
                >
                  <figure>
                    <img
                      src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                        video.screenshot
                      }`}
                      alt={video.title_de}
                    />
                  </figure>
                  <label
                    htmlFor="imageFile"
                    className="form-label mb-2 mt-5 inline-block text-primary"
                  >
                    Screenshot ändern?
                  </label>
                  <br />
                  <input
                    className="file-input-bordered file-input-primary file-input w-full max-w-xs"
                    type="file"
                    id="videoFile"
                    onChange={changeScreenshot}
                    accept="image/*"
                  />
                </Collapse>
                <Input
                  label="Deutscher Titel"
                  value={title_de}
                  onChange={setTitle_de}
                  required={true}
                  name="title_de"
                  placeholder="Titel DE"
                ></Input>
                <Input
                  label="Englischer Titel"
                  value={title_en}
                  onChange={setTitle_en}
                  required={true}
                  name="title_en"
                  placeholder="Titel EN"
                ></Input>
                <Input
                  textarea
                  label="Deutscher Text"
                  value={text_de}
                  onChange={setText_de}
                  required={true}
                  name="text_de"
                  placeholder="Text DE"
                ></Input>
                <Input
                  label="Englischer Text"
                  textarea
                  value={text_en}
                  onChange={setText_en}
                  required={true}
                  name="text_en"
                  placeholder="Text EN"
                ></Input>
                <div className="justify-left mt-7 flex items-center gap-5">
                  <button
                    type="submit"
                    className={`btn-primary btn ${
                      updateVideo.isLoading ? "loading" : null
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
              </>
            )}
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default EditVideo;
