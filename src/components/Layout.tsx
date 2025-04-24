
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventNotification from "./EventNotification";
import { useEventContext } from "@/context/EventContext";

const Layout = () => {
  const { currentEvent } = useEventContext();

  return (
    <div className="flex min-h-screen flex-col">
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
