import { MdPlayCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Video } from "../services/types";
import LanguageDisplayer from "../utils/Language/Language/LanguageDisplayer";

type Props = {
  Video: Video;
};

const VideoOverviewCard = ({ Video, ...rest }: Props) => {
  let imageurl = `http://${import.meta.env.VITE_SERVER_ADDRESS}${
    Video.screenshot
  }`;
  const navigate = useNavigate();
  console.log(imageurl);
  return (
    <div className="card flex w-[90%] flex-col gap-1">
      <div className="flex  flex-row bg-primary p-3">
        <div>
          <hr className="h-[0.2rem] w-14 border-none bg-secondary outline-none" />
          <span className="card-title h-fit w-1/2 text-4xl text-white">
            <LanguageDisplayer de={Video.title_de} en={Video.title_en} />
          </span>
        </div>

        <div
          style={{
            backgroundImage: `url('http://${
              import.meta.env.VITE_SERVER_ADDRESS
            }${Video.screenshot}')`,
          }}
        ></div>
      </div>
      <div
        className={`card-body bg-white px-2  bg-[url('http://${
          import.meta.env.VITE_SERVER_ADDRESS
        }${Video.screenshot}')] `}
      >
        <div>
          <LanguageDisplayer de={Video.text_de} en={Video.text_en} />
        </div>
      </div>
      <div className="card-actions  flex w-full justify-end ">
        {" "}
        <button
          onClick={() => {
            navigate("/Video", {
              replace: false,
              state: { video: Video },
            });
          }}
          className="btn-primary btn gap-2  rounded-none px-12"
        >
          <MdPlayCircle size="2em" />
          Abspielen
        </button>
      </div>
    </div>
  );
};

export default VideoOverviewCard;
