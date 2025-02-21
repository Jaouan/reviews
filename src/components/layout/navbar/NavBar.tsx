import { TbArrowMergeAltLeft } from "react-icons/tb";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GithubButton } from "./GithubButton";
import { SettingsButton } from "./SettingsButton";

export const NavBar = () => (
  <header className="sticky top-0 z-10">
    <div className="navbar backdrop-blur-3xl flex justify-between">
      <a className="btn btn-ghost text-2xl">
        <TbArrowMergeAltLeft />
        Reviews
      </a>
      <div className="flex gap-2">
        <GithubButton />
        <SettingsButton />
        <ThemeSwitcher />
      </div>
    </div>
  </header>
);
