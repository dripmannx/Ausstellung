import { useTitle } from "ahooks";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import VideoOverviewCard from "../components/VideoOverviewCard";
import { useGetCurrentClientVideos } from "../services/RequestVideos";

type Props = {};

const Landing: FC<Props> = ({}) => {
  const title = useTitle("Übersicht");
  const Videos = useGetCurrentClientVideos();
  return (
    <>
      <Helper />
    </>
  );
};
export default Landing;
export const Helper = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCurrentClientVideos();
  if (isError) return <div>Fehler</div>;
  if (data !== undefined)
    return (
      <>
        <div className="flex justify-center">
          <div className="mt-10 ml-5 grid grid-cols-1 justify-center  gap-10 md:grid-cols-2 lg:grid-cols-3">
            {data.map((video) => (
              /*  <div
                key={video.id}
                className=" card  w-[90%] bg-base-100 shadow-xl hover:shadow-2xl"
              >
                <figure>
                  <img
                    className="transition  duration-500 ease-in-out hover:scale-110 "
                    src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                      video.screenshot
                    }`}
                    alt={video.title_de}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">
                    <LanguageDisplayer
                      de={video.title_de}
                      en={video.title_en}
                    />
                  </h2>

                  <p>
                    {" "}
                    <LanguageDisplayer de={video.text_de} en={video.text_en} />
                  </p>

                  <div className="card-actions mt-2 justify-end ">
                    <button
                      onClick={() => {
                        navigate("/Video", {
                          replace: false,
                          state: { video: video },
                        });
                      }}
                      className="btn-primary btn w-full gap-1"
                    >
                      <MdPlayCircle size="2em" />

                      <LanguageDisplayer
                        de={
                          video.video.endsWith(".svg")
                            ? "Mehr erfahren"
                            : "Abspielen"
                        }
                        en={
                          video.video.endsWith(".svg") ? "Learn more" : "Play"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div> */
              <VideoOverviewCard Video={video} key={video.id} />
            ))}
          </div>
        </div>{" "}
      </>
    );
  return (
    <div className="flex w-full justify-center">
      <progress className="progress w-1/2"></progress>
    </div>
  );
};
