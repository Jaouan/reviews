import { Error } from "@/components/layout/Error";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { logger } from "@/shared";
import { Outlet, useRouteError } from "react-router";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </>
  );
}
