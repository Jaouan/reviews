import { useEffect, useRef } from "react";
import { useSettings } from "@/stores";
import { EndpointsField } from "./EndpointsField";
import { TokensField } from "./TokensField";
import { useForm } from "react-hook-form";
import { FormValues } from "./form-types";
import { useEvent } from "@/hooks/useEvent";

const tokensToString = (tokens: Record<string, string>) =>
  Object.keys(tokens).length ? JSON.stringify(tokens, null, 2) : "";

const endpointsToString = (endpoints: string[]) => endpoints.join("\n");

export const SettingsModal = () => {
  const { endpoints, tokens, save } = useSettings();
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
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
      endpoints: values.endpoints.split("\n").map((str) => str.trim()),
      tokens: values.tokens?.trim() ? JSON.parse(values.tokens) : {},
    });
    modalRef.current?.close();
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
          <div className="text-end">
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop backdrop-blur-xs">
        <button>close</button>
      </form>
    </dialog>
  );
};
