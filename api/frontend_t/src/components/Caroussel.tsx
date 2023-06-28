// Import Swiper React components
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useGetCurrentClientVideos } from "../services/RequestVideos";
type Props = {};

const Caroussel = (props: Props) => {
  const { data, isError, isLoading } = useGetCurrentClientVideos();
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {data?.map((video) => (
        <SwiperSlide className="h-1/2 ">
          {" "}
          <figure className="relativ">
            <img
              draggable="false"
              className=" stretch h-auto w-full  "
              src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
                video.screenshot
              }`}
              alt={video.title_de}
            />
          </figure>{" "}
          <div className="w-1/2">
            {" "}
            <div className="bg-primary">
              {" "}
              <span className="prose-xl">
                Videoscreenshot für: {video.title_de}
              </span>
            </div>
            <div className="bg-white ">
              <span className="prose prose-lg">{video.text_de}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper> /*  hover:scale-110 transition duration-300 ease-in-out} */
  );
};

export default Caroussel;
