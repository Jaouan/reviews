import { FetchError, KnownCause } from "@/shared";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useToastsErrors = (errors?: FetchError[] | null) =>
  useEffect(() => {
    errors?.forEach((error) => {
      if ((error.cause as KnownCause)?.unauthorized) {
        toast.error(`Unauthorized to fetch ${error.endpoint ?? "endpoint"}`);
      } else {
        toast.error(`Unable to fetch ${error.endpoint ?? "endpoint"}`);
      }
    });
  }, [errors]);
