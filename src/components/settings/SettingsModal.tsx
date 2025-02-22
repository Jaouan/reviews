import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/stores";
import { EndpointsField } from "./EndpointsField";
import { TokensField } from "./TokensField";
import { useForm } from "react-hook-form";
import { FormValues } from "./form-types";
import { useEvent } from "@/hooks/useEvent";
import { VERSION } from "@/constants";
import { copyShareLink, endpointsStringToArray } from "@/shared";

const tokensToString = (tokens: Record<string, string>) =>
  Object.keys(tokens).length ? JSON.stringify(tokens, null, 2) : "";

const endpointsToString = (endpoints: string[]) => endpoints.join("\n");

export const SettingsModal = () => {
  const { endpoints, tokens, save } = useSettings();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    setTimeout(() => setCopied(false), 1000);
  }, [copied]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      endpoints: endpointsToString(endpoints),
      tokens: tokensToString(tokens),
    },
  });

  useEvent("open-settings", () => modalRef.current?.showModal());

  useEffect(() => {
    setValue("endpoints", endpointsToString(endpoints));
    setValue("tokens", tokensToString(tokens));
  }, [endpoints, tokens]);

  const onSubmit = (values: FormValues) => {
    save({
      endpoints: endpointsStringToArray(values.endpoints),
      tokens: values.tokens?.trim() ? JSON.parse(values.tokens) : {},
    });
    modalRef.current?.close();
  };

  const share = () => {
    copyShareLink(getValues("endpoints"));
    setCopied(true);
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-4">Settings</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TokensField register={register} errors={errors} />
          <EndpointsField register={register} />
          <div className="flex justify-between items-end">
            <span className="text-xs text-base-content/20">v{VERSION}</span>
            <div className="flex gap-2">
              {/* Not a button because it will close the modal */}
              <div
                role="button"
                className={"transition-all btn btn-ghost min-w-22"}
                onClick={share}
              >
                {copied ? "Copied!" : "Share"}
              </div>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop backdrop-blur-xs">
        <button>close</button>
      </form>
    </dialog>
  );
};
