type GitlabMergeRequest = {
  id: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  web_url: string;
  references: {
    full: string;
  };
  source_branch: string;
  target_branch: string;
  blocking_discussions_resolved: boolean;
  has_conflicts: boolean;
  draft: boolean;
};

type GithubPullRequest = {
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  head: {
    ref: string;
  };
  base: {
    ref: string;
  };
  body: string;
  conflicts: boolean;
  draft: boolean;
};

export type MergeRequest = GithubPullRequest &
  GitlabMergeRequest & {
    isNew: boolean;
    updatedDaysAgo: number;
    project: string;
    author: string;
    issue: string;
  };

export type KnownCause = { unauthorized?: boolean; httpStatus?: number };

export type FetchError = {
  cause: KnownCause | unknown;
  endpoint?: string;
};

export type ApiSettings = {
  tokens: Record<string, string>;
  endpoints: string[];
};
