import { MdErrorOutline } from "react-icons/md";

export const Error = () => (
  <div role="alert" className="alert alert-error m-auto my-4 max-w-128">
    <MdErrorOutline className="text-2xl" />
    <span>Error! Please try again later.</span>
  </div>
);
