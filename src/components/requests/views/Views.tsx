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
import { RequestsListView, RequestsListViewSkeleton } from "./RequestsListView";
import { MergeRequest } from "@/shared";
import {
  requestsGroupToStringFactory,
  requestsToString,
} from "@/shared/requests/requests-to-str";

type ViewDefinition = {
  label: string;
  icon: JSX.Element;
  element: () => JSX.Element;
  skeleton: () => JSX.Element;
  copyString: (mergeRequests: MergeRequest[]) => string;
};

export const viewsDefinitions: Record<string, ViewDefinition> = {
  "by-project": {
    label: "By project",
    icon: <LuFolderGit />,
    element: () => <RequestsCardsGroupByLayout groupByKey="project" />,
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton />,
    copyString: requestsGroupToStringFactory("project"),
  },
  "by-issue": {
    label: "By issue",
    icon: <LiaJira />,
    element: () => (
      <RequestsCardsGroupByLayout groupByKey="issue" withProjectName />
    ),
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton />,
    copyString: requestsGroupToStringFactory("issue"),
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
    copyString: requestsGroupToStringFactory("author"),
  },
  compact: {
    label: "Compact",
    icon: <TbLayoutGrid />,
    element: () => <RequestsCardsGroupByLayout withProjectName />,
    skeleton: () => <RequestsCardsGroupByLayoutSkeleton compact />,
    copyString: requestsToString,
  },
  list: {
    label: "List",
    icon: <HiViewList />,
    element: () => <RequestsListView />,
    skeleton: () => <RequestsListViewSkeleton />,
    copyString: requestsToString,
  },
};

export const viewsIds = Object.keys(viewsDefinitions);

export type ViewId = keyof typeof viewsDefinitions;
