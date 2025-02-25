import { JSX } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { LiaJira } from "react-icons/lia";
import { LuFolderGit } from "react-icons/lu";
import { TbLayoutGrid } from "react-icons/tb";
import {
  MergeRequestsCardsGroupByLayout,
  MergeRequestsCardsGroupByLayoutSkeleton,
} from "./cards/MergeRequestsCardsView";
import {
  MergeRequestsListView,
  MergeRequestsListViewSkeleton,
} from "./MergeRequestsListView";

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
    element: () => <MergeRequestsCardsGroupByLayout groupByKey="project" />,
    skeleton: () => <MergeRequestsCardsGroupByLayoutSkeleton />,
  },
  "by-issue": {
    label: "By issue",
    icon: <LiaJira />,
    element: () => (
      <MergeRequestsCardsGroupByLayout groupByKey="issue" withProjectName />
    ),
    skeleton: () => <MergeRequestsCardsGroupByLayoutSkeleton />,
  },
  "by-author": {
    label: "By author",
    icon: <FaRegUser />,
    element: () => (
      <MergeRequestsCardsGroupByLayout
        groupByKey="author"
        groupClassName="capitalize"
        withProjectName
      />
    ),
    skeleton: () => <MergeRequestsCardsGroupByLayoutSkeleton />,
  },
  compact: {
    label: "Compact",
    icon: <TbLayoutGrid />,
    element: () => <MergeRequestsCardsGroupByLayout withProjectName />,
    skeleton: () => <MergeRequestsCardsGroupByLayoutSkeleton compact />,
  },
  list: {
    label: "List",
    icon: <HiViewList />,
    element: () => <MergeRequestsListView />,
    skeleton: () => <MergeRequestsListViewSkeleton />,
  },
};

export const viewsIds = Object.keys(viewsDefinitions);

export type ViewId = keyof typeof viewsDefinitions;
