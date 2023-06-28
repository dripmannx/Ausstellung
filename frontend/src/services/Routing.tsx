import Clients, { NewClient } from "../pages/Client/Clients";
import Videos, { NewUpdateVideoHelper } from "../pages/Video/videos";
import {
  allClientsLoader,
  allVideosLoader,
  clientVideosLoader,
  statsLoader,
  videoLoader,
} from "./Querys";

import { QueryClient } from "@tanstack/react-query";
import NotFound from "@ui/NotFound";
import { createBrowserRouter } from "react-router-dom";
import { Admin } from "../pages/Admin";
import { Index } from "../pages/Client";
import Landing from "../pages/Landing/Landing";
import { VideoPage } from "../pages/VideoPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 2000,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/admin",
    loader: statsLoader(queryClient),
    element: <Admin />,
    errorElement: (
      <div className="h-screen w-screen  dark:bg-dark-primary">
        <NotFound text="Fehler Beim Laden" />
      </div>
    ),
    children: [
      {
        path: "clients",

        children: [
          {
            index: true,
            loader: allClientsLoader(queryClient),
            element: <Clients />,
          },
          {
            path: "new",
            element: <NewClient />,
            // ⬇️ this is the loader for the detail route
            /*  loader: allVideosLoader, */
            loader: allVideosLoader(queryClient),
          },
          {
            path: ":id",
            element: <Index />,
            // ⬇️ this is the loader for the detail route
            /*  loader: allVideosLoader, */
            loader: allVideosLoader(queryClient),
          },
        ],
      },
      {
        path: "videos",
        children: [
          {
            index: true,
            loader: allVideosLoader(queryClient),
            errorElement: <NotFound text="Fehler beim Laden der Inhalte" />,
            element: <Videos />,
          },
          {
            //This Route is for a new Video
            path: "new",
            element: <NewUpdateVideoHelper />,
          },
          {
            path: ":id",
            element: <NewUpdateVideoHelper />,
            // ⬇️ this is the loader for the detail route
            /*  loader: videoLoader, */
            loader: ({ params }) => videoLoader(queryClient),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex h-screen w-screen justify-center bg-dark-primary text-light-text dark:text-dark-text-hover">
        <NotFound text="Seite nicht gefunden" />
      </div>
    ),
  },
  {
    path: "/",
    element: <Landing />,
    loader: clientVideosLoader(queryClient),
    children: [
      {
        path: "/video",
        element: <VideoPage />,
      },
    ],
  },
]);
export default router;
