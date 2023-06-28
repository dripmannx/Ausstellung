import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Video } from "../../services/types";

export type Props = {
  clientVideos: Video[];
  setClientVideos: React.Dispatch<React.SetStateAction<Array<Video>>>;
  allVideos: Video[];
};
export default function CheckboxList({
  clientVideos,
  setClientVideos,
  allVideos,
}: Props) {
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
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          padding: "0",

          minWidth: "100%",
        }}
      >
        {allVideos.map((video) => {
          const labelId = `${video.id}`;

          return (
            <ListItem key={video.id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(video)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    /* Check if Video Item is in PCVideos, true= checked, false= not checked */
                    checked={
                      clientVideos.findIndex(
                        (check) => check.id === video.id
                      ) !== -1
                    }
                    tabIndex={-1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${video.title_de}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
