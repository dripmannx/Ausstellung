import { UseQueryResult } from "@tanstack/react-query";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  useGetAllVideos,
  useGetCurrentClientVideos,
} from "../../services/RequestVideos";
import { Video } from "../../services/types";
import LanguageDisplayer from "../../utils/Language/Language/LanguageDisplayer";
import Alert from "../Alert/Alert";

type Props = { buttonText?: string };

const Card = (props: Props) => {
  const { buttonText } = props;
  const navigate = useNavigate();
  let DataType: UseQueryResult<Video[], unknown>;
  if (buttonText) {
    DataType = useGetAllVideos();
  } else DataType = useGetCurrentClientVideos();
  const { data, error } = DataType;
  console.log(data);
  if (error)
    return (
      <Alert
        variant="warning"
        open
        title="Achtung"
        text="Client exestiert nicht oder anderer Fehler"
      />
    );
  if (data)
    return (
      <>
        {data?.length === 0 ? (
          <div className="flex w-full justify-center">
            <h2>
              <Alert
                open={true}
                title="Warnung"
                text="Keine Videos für dieses Gerät"
                variant="warning"
              />
              {/*  <LanguageDisplayer
                en="No Videos for this device"
                de="Keine Videos für dieses Gerät"
              /> */}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 lg:mb-6 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-24">
            {/* <div
        className="flex flex-col md
    :items-center xs:items-center lg:grid lg:grid-cols-3 lg:gap-6 lg:mb-6"
      > */}

            {data?.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  navigate(buttonText ? `/EditVideo/${video.id}` : "/Video", {
                    replace: false,
                    state: { video: video },
                  });
                }}
                className="text-md  card w-[90%] cursor-pointer bg-base-100 shadow-xl hover:shadow-2xl lg:w-72"
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
                  <h2 className="card-title">
                    <LanguageDisplayer
                      de={video.title_de}
                      en={video.title_en}
                    />
                  </h2>
                  {!buttonText ? (
                    <p>
                      {" "}
                      <LanguageDisplayer
                        de={video.text_de}
                        en={video.text_en}
                      />
                    </p>
                  ) : null}

                  <div className="card-actions mt-2 justify-end ">
                    <button className="btn-primary btn w-full gap-1">
                      {buttonText ? (
                        <AiOutlineEdit size="2.5em" />
                      ) : (
                        <BsFillPlayFill size="2.5em" />
                      )}{" "}
                      {buttonText ? (
                        buttonText
                      ) : (
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
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );

  return <></>;
};
export default Card;
