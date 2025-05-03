
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventNotification from "./EventNotification";
import { useEventContext } from "@/context/EventContext";
import CursorEffect from "./CursorEffect";

const Layout = () => {
  const { currentEvent } = useEventContext();

  return (
    <div className="flex min-h-screen flex-col">
      <CursorEffect />
      <Navbar />
      {currentEvent && <EventNotification event={currentEvent} />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
