import { isValidJson } from "@/shared";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormValues } from "./form-types";

type TokensFieldProps = {
  register: UseFormRegister<FormValues>;
  errors?: FieldErrors<FormValues>;
};
export const TokensField = ({ register, errors }: TokensFieldProps) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend text-base">Tokens by endpoint:</legend>
    <textarea
      className={twMerge(
        "textarea h-24 w-full",
        errors?.tokens && "input-error"
      )}
      placeholder={`{
    "gitlab.example.com": "123456789"
  }`}
      {...register("tokens", {
        validate: (value) => !value?.trim() || isValidJson(value),
      })}
    ></textarea>
    <div className="fieldset-label flex-col items-start">
      {errors?.tokens && <div className="text-error block">Invalid json.</div>}
      Each endpoint on a new line. Ensure CORS is enabled.
    </div>
  </fieldset>
);
