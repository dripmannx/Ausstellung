import { MdPlayCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LanguageDisplay from "../../components/Language/LanguageDisplay";
import { Video } from "../../services/types";

type Props = {
  Video: Video;
};

const VideoOverviewCard = ({ Video, ...rest }: Props) => {
  let imageurl = `http://${import.meta.env.VITE_SERVER_ADDRESS}${
    Video.screenshot
  }`;
  const navigate = useNavigate();

  return (
    <div className="flex  flex-col gap-1 shadow-lg">
      <div className="flex flex-row bg-primary p-3">
        <div>
          <hr className="h-[0.2rem] w-14 border-none bg-accent outline-none" />
          <span className="card-title h-fit w-1/2 text-4xl text-white">
            <LanguageDisplay de={Video.title_de} en={Video.title_en} />
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
          <LanguageDisplay de={Video.text_de} en={Video.text_en} />
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
          className="flex h-12 flex-row items-center  gap-2 rounded bg-primary px-12 py-2 text-white hover:bg-opacity-90"
        >
          <MdPlayCircle size="2em" />
          <LanguageDisplay de="Abspielen" en="Play" />
        </button>
      </div>
    </div>
  );
};

export default VideoOverviewCard;
