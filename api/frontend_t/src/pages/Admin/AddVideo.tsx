import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import Input from "../../components/Inputs/Input";

import Alert from "../../components/Alert/Alert";

import { BiCheckCircle } from "react-icons/bi";
import Toast from "../../components/Toast";
import { usePostVideos } from "../../services/RequestVideos";

export const getVideoValidator = z.object({
  video: z.instanceof(File, { message: "Kein Video ausgewählt" }),
  screenshot: z.instanceof(File, {
    message: "Kein Screenshot ausgewählt",
  }),
  published: z.string().optional(),
  title_de: z.string().max(200, { message: "Titel DE zu lang" }),
  title_en: z.string().max(200, { message: "Titel EN zu lang" }),
  text_de: z.string().max(2000, { message: "Text DE zu lang" }),
  text_en: z.string().max(2000, { message: "Text EN zu lang" }),
});
export type Video = {
  video: File;
  screenshot: File;

  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
type Props = {};
const AddVideo: React.FC<Props> = () => {
  const navigate = useNavigate();

  // Type Casting, then you can get the params passed via router

  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });

  const [videoFile, setVideoFile] = useState<File>();
  const [screenshotFile, setScreenshotFile] = useState<File>();
  const [title_de, setTitle_de] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [text_de, setText_de] = useState("");
  const [text_en, setText_en] = useState("");
  const [progress, setProgress] = useState(0);

  //UPDATE client Logic
  const handleSuccess = () => {
    Toast({
      text: "Video erfolgreich gespeichert",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    });
    navigate("/Admin");
  };
  const handleError = () => {
    console.log("Error");
  };
  const postVideo = usePostVideos({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  // send "values" to database
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form_data = {} as Video;
    const formData = new FormData();
    if (videoFile && screenshotFile) {
      formData.append("video", videoFile);
      formData.append("screenshot", screenshotFile);
      form_data["video"] = videoFile;
      form_data["screenshot"] = screenshotFile;
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

    postVideo.mutate({
      formData: formData,
      setProgress: setProgress,
    });
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

  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-16 w-1/2 rounded bg-white p-5 shadow-lg">
          <h1 className="prose-xl">Neues Video erstellen</h1>
          <Alert
            open={inputError.open}
            title="Fehler bei der Eingabe"
            text={inputError.message}
          />
          <form className="mt-5" onSubmit={onSubmit}>
            {postVideo.isLoading ? (
              <div
                className="radial-progress text-primary"
                style={{ "--value": progress } as React.CSSProperties}
              >
                {progress}%
              </div>
            ) : (
              <>
                <label
                  htmlFor="videoFile"
                  className="form-label mb-2 inline-block text-primary"
                >
                  Video auswählen
                </label>
                <input
                  className="form-control  m-0    mb-5    block    w-full rounded border
    border-solid
    border-gray-300
    bg-white bg-clip-padding
    px-3 py-1.5 text-base
    font-normal
    text-gray-700
    transition
    ease-in-out
    focus:border-accent focus:bg-white focus:text-gray-700 focus:outline-none"
                  type="file"
                  required
                  id="videoFile"
                  onChange={changeVideo}
                  accept="video/*"
                ></input>
                <label
                  htmlFor="videoFile"
                  className="form-label mb-2 inline-block text-primary"
                >
                  Screenshot auswählen
                </label>
                <input
                  required
                  className="form-control  m-0    mb-5    block    w-full rounded border
    border-solid
    border-gray-300
    bg-white bg-clip-padding
    px-3 py-1.5 text-base
    font-normal
    text-gray-700
    transition
    ease-in-out
    focus:border-accent focus:bg-white focus:text-gray-700 focus:outline-none"
                  type="file"
                  id="videoFile"
                  onChange={changeScreenshot}
                  accept="image/*"
                ></input>
                <Input
                  label="Deutscher Titel"
                  value={title_de}
                  onChange={setTitle_de}
                  required={true}
                  name="Deutscher Titel"
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
                  textarea
                  label="Englischer Text"
                  value={text_en}
                  onChange={setText_en}
                  required={true}
                  name="text_en"
                  placeholder="Text EN"
                ></Input>

                <div className="justify-left mt-7 flex items-center gap-5"></div>
                <button type="submit" className={`btn-primary btn `}>
                  Video erstellen
                </button>
              </>
            )}
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

export default AddVideo;
