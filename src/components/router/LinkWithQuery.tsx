import { Link as RouterLink } from "react-router";

export type LinkWithQueryProps = {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
};
export const LinkWithQuery = ({
  to,
  onClick,
  children,
}: LinkWithQueryProps) => (
  <RouterLink to={`${to}${window.location.search ?? ""}`} onClick={onClick}>
    {children}
  </RouterLink>
);
