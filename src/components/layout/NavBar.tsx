import { TbArrowMergeAltLeft } from "react-icons/tb";
import { Settings } from "../settings/Settings";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavBar = () => (
  <header className="sticky top-0 z-10">
    <div className="navbar backdrop-blur-3xl flex justify-between">
      <a className="btn btn-ghost text-2xl">
        <TbArrowMergeAltLeft />
        Reviews
      </a>
      <div className="flex gap-2">
        <Settings />
        <ThemeSwitcher />
      </div>
    </div>
  </header>
);
