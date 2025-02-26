import { Navigate } from "react-router";

export default function Home() {
  return <Navigate to={`/by-project${window.location.search}`} replace />;
}
