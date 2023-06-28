import { useQuery } from "@tanstack/react-query";
import { Alert } from "@ui/Alert";
import { BiArrowBack } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LanguageDisplay from "../../components/Language/LanguageDisplay";
import { LanguageSwitch } from "../../components/Language/LanguageSwitch";
import enercon_logo from "../../Images/enercon_logo.png";
import { clientVideosLoader, clientVideosQuery } from "../../services/Querys";
import { Video } from "../../services/types";
import Title from "./Title";

type Props = {};

const Landing = ({}: Props) => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof clientVideosLoader>>
  >;
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    ...clientVideosQuery(),
    initialData,
  });
  const location = useLocation();
  console.log(data);
  if (data)
    return (
      <>
        {/**Navbar */}
        <nav className="sticky top-0 left-0 z-[1000] flex h-20 flex-1 items-center justify-center bg-white p-4 shadow-lg">
          {/**left Navbar Item */}
          <div className="mr-auto">
            {" "}
            <img src={enercon_logo} width={170} height="auto"></img>
          </div>
          {/**Middle navbar Item */}
          <div className="text-xl text-primary lg:text-4xl ">
            <Title />
          </div>
          {/**Right Navbar Item */}
          <div className="ml-auto flex flex-row items-center gap-5">
            <LanguageSwitch className="flex cursor-pointer flex-row items-center gap-2 p-4" />
            {location.pathname !== "/" && (
              <button
                onClick={() => navigate(-1)}
                className="flex h-14 flex-row items-center  gap-2 rounded bg-primary py-2 px-10 text-white hover:bg-opacity-90"
              >
                <BiArrowBack size="1.5em" />
                <span className="hidden lg:flex">
                  <LanguageDisplay de="Zurück" en="Back" />
                </span>
              </button>
            )}
          </div>
        </nav>{" "}
        <Outlet />
        {location.pathname === "/" && (
          <LandingHelper Videos={data as Video[]} />
        )}
      </>
    );
  return <div>Loading</div>;
};

export default Landing;
type PropsLandingHelper = {
  Videos: Video[];
};
export const LandingHelper = ({ Videos }: PropsLandingHelper) => {
  if (Videos.length === 0)
    return (
      <div className="flex w-full justify-center">
        <div className="mt-16 w-[70%] self-center">
          <Alert open text="Keine Videos für diesen Client ausgewählt" />
        </div>
      </div>
    );
  return (
    <div
      className="
    flex justify-center "
    >
      <div className="m-8 grid w-full grid-cols-1 justify-center gap-5 opacity-100 lg:grid-cols-3   lg:gap-24 ">
        {Videos.map((video) => (
          <CardLanding video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

interface CardLandingProps {
  video: Video;
}
const CardLanding = ({ video }: CardLandingProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/video", {
          replace: false,
          state: { video: video },
        });
      }}
      className="text-md card bg-base-100 shadow-xl hover:shadow-2xl "
    >
      <figure>
        <img
          loading="eager"
          role="presentation"
          src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
            video.screenshot
          }`}
          alt={video.title_de}
        />
      </figure>
      <div className="card-body rounded-b-[1rem] bg-white">
        <h2 className="card-title text-2xl">
          <LanguageDisplay de={video.title_de} en={video.title_en} />
        </h2>

        <p>
          {" "}
          <LanguageDisplay de={video.text_de} en={video.text_en} />
        </p>

        <div className="card-actions mt-2 justify-end ">
          <button className="flex w-full items-center justify-center gap-2 rounded bg-primary py-1 text-white">
            <BsFillPlayFill size="2.5em" />

            <LanguageDisplay
              de={video.video.endsWith(".svg") ? "Mehr erfahren" : "Abspielen"}
              en={video.video.endsWith(".svg") ? "Learn more" : "Play"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
