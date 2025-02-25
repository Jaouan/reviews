import { FetchError, KnownCause } from "../types";

export const getUnauthorizedTips = (errors?: FetchError[] | null) => {
  const hasUnauthorized = errors?.some(
    (error) => (error.cause as KnownCause)?.unauthorized
  );

  if (!hasUnauthorized) return null;

  return JSON.stringify(
    errors
      ?.filter(
        (error) => error.endpoint && (error.cause as KnownCause)?.unauthorized
      )
      .reduce((acc: Record<string, string>, error: FetchError) => {
        acc[error.endpoint ?? "unknown"] = "Bearer <TOKEN>";
        return acc;
      }, {}),
    null,
    2
  );
};
