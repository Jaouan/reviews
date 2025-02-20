import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./form-types";

type EndpointsFieldProps = {
  register: UseFormRegister<FormValues>;
  errors?: FieldErrors;
};
export const EndpointsField = ({ register }: EndpointsFieldProps) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend text-base">
      Gitlab /merge_requests endpoints:
    </legend>
    <textarea
      className="textarea h-24 w-full"
      placeholder={`/demo.mock.json\n/api/demo.mock.json`}
      {...register("endpoints")}
    ></textarea>
    <div className="fieldset-label">
      Each endpoint on a new line. Ensure CORS is enabled.
    </div>
  </fieldset>
);
