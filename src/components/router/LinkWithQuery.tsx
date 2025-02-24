import { Link as RouterLink } from "react-router";

export type LinkWithQueryProps = {
  to: string;
  children: React.ReactNode;
};
export const LinkWithQuery = ({ to, children }: LinkWithQueryProps) => (
  <RouterLink to={`${to}${window.location.search ?? ""}`}>
    {children}
  </RouterLink>
);
