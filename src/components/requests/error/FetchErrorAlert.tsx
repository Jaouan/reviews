import { useSettingsModal } from "@/components/settings/useSettingsModel";
import { useToastsErrors } from "@/hooks/useToastsErrors";
import { FetchError } from "@/shared";
import { getUnauthorizedTips } from "@/shared/unauthorized-tips/unauthorized-tips";
import { PiWarningCircleBold } from "react-icons/pi";

export type FetchErrorAlertProps = {
  errors?: FetchError[] | null;
};
export const FetchErrorAlert = ({ errors }: FetchErrorAlertProps) => {
  const { show } = useSettingsModal();
  const hasError = !!errors?.length;
  const tokensTips = getUnauthorizedTips(errors);
  useToastsErrors(errors);

  return (
    hasError && (
      <div className="mx-4">
        <div className="m-auto alert alert-soft alert-warning items-start w-fit">
          <PiWarningCircleBold className="mt-1" />
          {tokensTips ? (
            <div>
              Some endpoints seem to be unauthorized, please check your tokens{" "}
              <button className="btn btn-outline btn-xs" onClick={show}>
                settings
              </button>{" "}
              and try again.
              <pre className="p-4 mt-2 bg-base-100 font-mono rounded-box overflow-auto">
                {tokensTips}
              </pre>
            </div>
          ) : (
            <div>
              Some endpoints encountered errors, merge requests may be missing.
            </div>
          )}
        </div>
      </div>
    )
  );
};
