import { Form, useZodForm } from "@ui/Form";
import { useEffect, useMemo, useState } from "react";
import { BiArrowBack, BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import {
  allVideosQuery,
  useAddVideo,
  useDeleteVideo,
  useUpdateVideo,
  videoQuery,
} from "../../services/Querys";
import { Video, VideoInterface } from "../../services/types";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import { Input } from "@ui/Input";
import { Loader } from "@ui/Loader";
import NavButton from "@ui/NavButton";
import Progressbar from "@ui/Progressbar";
import { Searchbar } from "@ui/Searchbar";
import { SubmitButton } from "@ui/SubmitButton";
import { TextArea } from "@ui/TextArea";
import { BsFillPlayFill } from "react-icons/bs";

const Videos = () => {
  const { data: Videos } = useQuery(allVideosQuery());
  const [query, setQuery] = useState("");
  if (Videos)
    return (
      <>
        {" "}
        <div className=" mt-5">
          <Container
            title="Videos"
            action={
              <NavButton
                text="Hinzufügen"
                Icon={<BiPlus size={"1.5em"} aria-hidden="true" />}
                path="new"
              />
            }
          >
            <Searchbar
              placeholder="In Videos suchen"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          </Container>
        </div>
        <VideoHelper Videos={Videos} query={query} />
      </>
    );
  return <Loader text="Videos werden geladen..." />;
};
interface Props {
  Videos: Video[];
  query: string;
}
export const VideoHelper = ({ Videos, query }: Props) => {
  const navigate = useNavigate();
  const filteredItems = useMemo(
    () =>
      Videos.filter((item) => {
        if (query === "") {
          return item;
        } else if (
          item.title_de.toLowerCase().includes(query.toLowerCase()) ||
          item.title_en.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return item;
        }
      }),
    [query, Videos]
  );
  const handleSuccess = () => {
    /* Toast({
      text: "Client erfolgreich hinzugefügt",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    }); */

    navigate("/admin/videos");
  };
  const handleError = () => {
    console.log("Error");
  };
  const deleteVideo = useDeleteVideo({
    config: { onSuccess: handleSuccess, onError: handleError },
  });
  return (
    <>
      <div className=" scrollbarContainer mt-5 mb-5 grid  grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((video) => (
          <Container
            onClick={() => navigate(`/admin/videos/${video.id}`)}
            //onClick={() => navigate(`/videos/${video.id}`)}
            key={video.id}
            fontTitle="xl"
            styles="dark:hover:bg-zinc-800 cursor-pointer img-hover-zoom"
            title={video.title_de}
            action={
              <div className="flex gap-4 text-dark-text-base ">
                <BiTrash
                  onClick={(e) => {
                    deleteVideo.mutate({ id: video.id });
                    e.stopPropagation();
                  }}
                  size="1.5em"
                  className="cursor-pointer dark:hover:text-dark-text-hover"
                />
                <BiEdit
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/videos/${video.id}`);
                  }}
                  size="1.5em"
                  className="cursor-pointer dark:hover:text-dark-text-hover "
                />
              </div>
            }
          >
            <div className=" overflow-hidden">
              <img
                loading="lazy"
                role="presentation"
                className=""
                src={`http://localhost:8000${video.screenshot}`}
              ></img>
            </div>
          </Container>
        ))}
      </div>
    </>
  );
};
export default Videos;
export const NewUpdateVideoHelper = () => {
  const { id } = useParams<string>();
  const { data: Video, error } = useQuery(videoQuery({ id }));
  return (
    <div className="my-5">
      <Container
        title={Video ? `Video bearbeiten` : "Neues Video"}
        action={
          <NavButton text="Zurück" Icon={<BiArrowBack size={"1.5em"} />} back />
        }
      >
        <NewEditVideos Video={Video as Video} />
      </Container>
    </div>
  );
};
interface NewEditVideoProps {
  Video?: Video | undefined;
}

export const NewEditVideos = ({ Video }: NewEditVideoProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const handleSuccess = () => {
    /* Toast({
      text: "Client erfolgreich hinzugefügt",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    }); */
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000 * 60);
    navigate("/admin/videos");
  };
  const handleError = () => {
    console.log("Error");
  };
  const {
    mutate: addVideoMutate,
    error: addVideoError,
    isError: addVideoIsError,
  } = useAddVideo({
    config: { onSuccess: handleSuccess, onError: handleError },
  });
  const {
    mutate: updateVideoMutate,
    error: updateVideoError,
    isError: updateVideoIsError,
  } = useUpdateVideo({
    config: { onSuccess: handleSuccess, onError: handleError },
  });
  const [videoFile, setVideoFile] = useState<File>();
  const [screenshotFile, setScreenshotFile] = useState<File>();
  const form = useZodForm({
    schema: VideoInterface,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const name = e.target.name;

    if (!fileList) return;
    if (name === "screenshot") {
      setScreenshotFile(fileList[0]);
    } else if (name === "video") {
      setVideoFile(fileList[0]);
    }
    console.log(fileList);
  };

  const onSubmit = (data: {
    title_de: string;
    title_en: string;
    text_de: string;
    text_en: string;
  }) => {
    let formData = new FormData();
    if (videoFile && screenshotFile) {
      console.log("File hinzufefügt");
      formData.append("video", videoFile);
      formData.append("screenshot", screenshotFile);
    } else if ((Video && videoFile) || screenshotFile) {
      if (screenshotFile) {
        formData.append("screenshot", screenshotFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }
    }

    formData.append("title_de", data.title_de);
    formData.append("title_en", data.title_en);
    formData.append("text_de", data.text_de);
    formData.append("text_en", data.text_en);

    if (!Video) {
      addVideoMutate({ newVideo: formData, setProgress: setProgress });
    } else {
      updateVideoMutate({
        newVideo: formData,
        id: Video.id,
        setProgress: setProgress,
      });
    }
  };
  useEffect(() => {
    if (Video !== undefined) {
      form.setValue("title_de", Video.title_de);
      form.setValue("title_en", Video.title_en);
      form.setValue("text_de", Video.text_de);
      form.setValue("text_en", Video.text_en);
    }
  }, [Video]);
  return (
    <>
      {progress !== 0 ? (
        <Progressbar value={progress} />
      ) : (
        <>
          <Form form={form} onSubmit={(data) => onSubmit(data)}>
            {Video && (
              <>
                <div className="text-light-text dark:text-dark-text-base">
                  {Video.video.substring(Video.video.lastIndexOf("/") + 1)}
                </div>
                <Button
                  target={"_blank"}
                  href={`/http://${import.meta.env.VITE_SERVER_ADDRESS}${
                    Video.video
                  }`}
                  /*  onClick={() =>
              navigate(
                `/http://${import.meta.env.VITE_SERVER_ADDRESS}${Video.video}`,
                { replace: true }
              )
            } */
                >
                  <BsFillPlayFill size="2.5em" /> Zum Video
                </Button>
              </>
            )}
            <Input
              required={!Video ? true : false}
              name="video"
              type="file"
              accept="video/*"
              label={Video ? `Video ändern` : `Video`}
              onChange={handleChange}
            />
            <label
              className="mb-2 block text-sm 
            font-medium  text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block 
w-full cursor-pointer rounded-lg border
 border-gray-300 bg-gray-50
  text-sm text-gray-900
   focus:outline-none dark:border-gray-600
    dark:bg-gray-700 dark:text-gray-400
     dark:placeholder-gray-400"
              id="file_input"
              type="file"
            ></input>
            <Input
              required={!Video ? true : false}
              accept="image/*"
              name="screenshot"
              type="file"
              label={Video ? `Screenshot ändern` : `Screenshot`}
              onChange={handleChange}
            />
            <Input label="Title Deutsch" {...form.register("title_de")} />
            <Input label="Title Englisch" {...form.register("title_en")} />
            <TextArea label="Text Deutsch" {...form.register("text_de")} />
            <TextArea label="Text Englisch" {...form.register("text_en")} />
            <SubmitButton disabled={progress !== 0}>
              {Video ? "Änderungen Speichern" : "Video Erstellen"}
            </SubmitButton>
          </Form>
        </>
      )}
    </>
  );
};
