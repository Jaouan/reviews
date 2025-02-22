import { MdErrorOutline } from "react-icons/md";

export const Error = () => (
  <div className="m-auto max-w-128">
    <div role="alert" className="alert alert-error m-4">
      <MdErrorOutline className="text-2xl" />
      <span>Error! Please try again later.</span>
    </div>
  </div>
);
