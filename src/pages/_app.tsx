import { Error } from "@/components/layout/Error";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/navbar/NavBar";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { logger } from "@/shared";
import { Outlet, useRouteError } from "react-router";
import { ToastContainer, Zoom } from "react-toastify";

export const Catch = () => {
  const error = useRouteError();
  logger.error("App error:", error);
  return <Error />;
};

export const Pending = () => <></>;

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer transition={Zoom} style={{ marginTop: "3rem" }} />
      <SettingsModal />
    </>
  );
}
