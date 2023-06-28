import React, { useMemo } from "react";
import { Video } from "../../services/types";
import { Searchbar } from "./Searchbar";

type Props = {
  clientVideos: Video[];
  setClientVideos: React.Dispatch<React.SetStateAction<Array<Video>>>;
  allVideos: Video[];
};

export const CheckboxList = ({
  clientVideos,
  setClientVideos,
  allVideos,
}: Props) => {
  console.log(allVideos, clientVideos);
  const [query, setQuery] = React.useState("");
  const filteredItems = useMemo(
    () =>
      allVideos?.filter((item) => {
        if (query.length === 0) {
          return item;
        } else if (
          item.title_de?.toLowerCase().includes(query?.toLowerCase()) ||
          item.title_en.toLowerCase().includes(query?.toLowerCase())
        ) {
          return item;
        }
      }),
    [query, allVideos]
  );
  const handleToggle = (video: Video) => () => {
    const currentIndex = clientVideos.findIndex(
      (check) => check.id === video.id
    );

    const newChecked = [...clientVideos];
    /* If Entry == -1, so doesnt exist, push to State, otherwise splice */
    if (currentIndex === -1) {
      newChecked.push(video);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setClientVideos(newChecked);
  };
  return (
    <>
      <div className="z-10 w-full rounded-lg bg-white shadow dark:bg-zinc-800">
        <div className="p-3">
          <Searchbar
            placeholder="In Videos suchen"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </div>
        {filteredItems.length === 0 && (
          <div className="h-full text-center text-2xl dark:text-dark-text-base ">
            Keine Ergebnisse zur Suche
          </div>
        )}
        <ul className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200">
          {filteredItems.map((video) => (
            <li key={video.id}>
              <div className="flex items-center gap-5 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`item-${video.id}`}
                  type="checkbox"
                  checked={
                    clientVideos.findIndex((check) => check.id === video.id) !==
                    -1
                  }
                  onChange={handleToggle(video)}
                  className="flex h-5 w-5  rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                />
                <label
                  className="w-full"
                  htmlFor={`item-${video.id}`}
                >{`${video.title_de} | ${video.title_en}`}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CheckboxList;
