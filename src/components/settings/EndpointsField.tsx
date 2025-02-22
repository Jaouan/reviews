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
      placeholder={`/api/v4/merge_requests\n/api/v4/projects/{1,2,3}/merge_requests`}
      {...register("endpoints")}
    ></textarea>
    <div className="fieldset-label">
      Enter one endpoint per line. Ensure CORS is enabled.
    </div>
  </fieldset>
);
