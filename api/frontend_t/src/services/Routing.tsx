import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar2 from "../components/Navbar/Navbar2";
import AddVideo from "../pages/Admin/AddVideo";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import AddClient from "../pages/Admin/AddClient";
import Admin from "../pages/Admin/Admin";
import EditVideo from "../pages/Admin/EditVideo";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Video from "../pages/Video";
import { TitleContext } from "../utils/Context";
function Routing() {
  const queryClient = new QueryClient();

  return (
    <TitleContext.Provider value="">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar2 />
          <ToastContainer position="top-right" newestOnTop />
          <Routes>
            <Route path="/EditClient/:id" element={<AddClient />}></Route>
            <Route path="/EditVideo/:id" element={<EditVideo />}></Route>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/Admin" element={<Admin />}></Route>
            <Route path="/NewClient" element={<AddClient />}></Route>
            <Route path="/NewVideo" element={<AddVideo />}></Route>
            <Route path="/video" element={<Video />}></Route>
            <Route path="*" element={<NotFound path="/" />}></Route>
          </Routes>
          {/* <Enercon_Footer /> */}
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </TitleContext.Provider>
  );
}

export default Routing;
