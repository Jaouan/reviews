import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./form-types";

type EndpointsFieldProps = {
  register: UseFormRegister<FormValues>;
  overriden: boolean;
  errors?: FieldErrors;
  saveOverride: () => void;
};
export const EndpointsField = ({
  register,
  overriden,
  saveOverride,
}: EndpointsFieldProps) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend text-base">
      Gitlab /merge_requests endpoints:
    </legend>
    <textarea
      className="textarea h-24 w-full"
      placeholder={`/api/v4/merge_requests\n/api/v4/projects/{1,2,3}/merge_requests`}
      {...register("endpoints")}
    ></textarea>
    <div className="fieldset-label text-[0.6rem] flex flex-col">
      {overriden && (
        <div className="text-xs py-2 w-full alert alert-warning alert-soft font-bold flex justify-between items-center">
          Endpoints are overridden by URL query parameters.
          {/* Not a button because it will close the modal */}
          <div role="button" className="btn btn-xs" onClick={saveOverride}>
            Set as settings
          </div>
        </div>
      )}
      Enter one endpoint per line. Define multiple endpoints in one line by
      enclosing variable parameters with {"{x,y}"}.<br />
      Ensure CORS is enabled.
    </div>
  </fieldset>
);
