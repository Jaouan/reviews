import { Layout } from "@/shared";
import { JSX } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { LiaJira } from "react-icons/lia";
import { LuFolderGit } from "react-icons/lu";
import { TbLayoutGrid } from "react-icons/tb";

type ViewDefinition = {
  label: string;
  icon: JSX.Element;
};
export const views: Record<Layout, ViewDefinition> = {
  "": { label: "By project", icon: <LuFolderGit /> },
  "by-issue": { label: "By issue", icon: <LiaJira /> },
  "by-author": { label: "By author", icon: <FaRegUser /> },
  compact: { label: "Compact", icon: <TbLayoutGrid /> },
  list: { label: "List", icon: <HiViewList /> },
};
