import { JSX } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { LiaJira } from "react-icons/lia";
import { LuFolderGit } from "react-icons/lu";
import { TbLayoutGrid } from "react-icons/tb";
import {
  RequestsCardsGroupByLayout,
  RequestsCardsGroupByLayoutSkeleton,
} from "./cards/RequestsCardsView";
import {
  RequestsListView,
  RequestsListViewSkeleton,
} from "./RequestsListView";

type ViewDefinition = {
  label: string;
  icon: JSX.Element;
  element: () => JSX.Element;
  skeleton: () => JSX.Element;
};

export const viewsDefinitions: Record<string, ViewDefinition> = {
  "by-project": {
    label: "By project",
    icon: <LuFolderGit />,
    element: () => <RequestsCardsGroupByLayout groupByKey="project" />,
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton />,
  },
  "by-issue": {
    label: "By issue",
    icon: <LiaJira />,
    element: () => (
      <RequestsCardsGroupByLayout groupByKey="issue" withProjectName />
    ),
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton />,
  },
  "by-author": {
    label: "By author",
    icon: <FaRegUser />,
    element: () => (
      <RequestsCardsGroupByLayout
        groupByKey="author"
        groupClassName="capitalize"
        withProjectName
      />
    ),
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton />,
  },
  compact: {
    label: "Compact",
    icon: <TbLayoutGrid />,
    element: () => <RequestsCardsGroupByLayout withProjectName />,
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton compact />,
  },
  list: {
    label: "List",
    icon: <HiViewList />,
    element: () => <RequestsListView />,
    skeleton: () => <RequestsListViewSkeleton />,
  },
};

export const viewsIds = Object.keys(viewsDefinitions);

export type ViewId = keyof typeof viewsDefinitions;
