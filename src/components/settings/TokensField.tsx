import { isValidJson } from "@/shared";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormValues } from "./form-types";

type TokensFieldProps = {
  register: UseFormRegister<FormValues>;
  errors?: FieldErrors<FormValues>;
};
export const TokensField = ({ register, errors }: TokensFieldProps) => (
  <fieldset className="fieldset flex flex-col">
    <legend className="fieldset-legend text-base">Tokens by endpoint:</legend>
    <textarea
      className={twMerge(
        "textarea h-24 w-full",
        errors?.tokens && "input-error"
      )}
      placeholder={`{
    "https://gitlab.example.com": "123456789"
}`}
      {...register("tokens", {
        validate: (value) => !value?.trim() || isValidJson(value),
      })}
    ></textarea>
    <div className="fieldset-label flex flex-col items-start text-[0.6rem]">
      {errors?.tokens && <div className="text-error block">Invalid json.</div>}
      The key must match the start of the endpoint.
    </div>
  </fieldset>
);
