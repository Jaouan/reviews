import { Link } from "react-router";

export default function page404() {
  return (
    <div className="m-auto max-w-128">
      <div role="alert" className="alert m-4 flex justify-between">
        <span>Whoops! The page doesn't exist.</span>
        <Link to="/">
          <button className="btn btn-primary">Go Home</button>
        </Link>
      </div>
    </div>
  );
}
