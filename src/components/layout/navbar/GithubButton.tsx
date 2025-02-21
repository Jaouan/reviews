import { IoLogoGithub } from "react-icons/io";

export const GithubButton = () => (
  <div className="tooltip tooltip-bottom" data-tip={"Github"}>
    <a
      href="https://github.com/Jaouan/reviews"
      className="btn btn-ghost btn-circle"
    >
      <IoLogoGithub className="text-2xl" />
    </a>
  </div>
);
