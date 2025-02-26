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
  <fieldset className="fieldset flex flex-col">
    <legend className="fieldset-legend text-base">
      Gitlab /merge_requests and Github /pulls endpoints:
    </legend>
    <textarea
      className="textarea h-24 w-full"
      placeholder={`/api/v4/merge_requests\n/api/v4/projects/{1,2,3}/merge_requests`}
      {...register("endpoints")}
    ></textarea>
    <div className="fieldset-label text-[0.6rem] flex flex-col items-start gap-0">
      {overriden && (
        <div className="text-xs py-2 w-full alert alert-warning alert-soft font-bold flex justify-between items-center mb-1">
          Endpoints are overridden by URL query parameters.
          {/* Not a button because it will close the modal */}
          <div role="button" className="btn btn-xs" onClick={saveOverride}>
            Set as settings
          </div>
        </div>
      )}
      <div>
        Enter one endpoint per line. Define multiple endpoints in one line by
        enclosing variable parameters with {"{x,y}"}.
      </div>
      <div>Ensure CORS is enabled.</div>
    </div>
  </fieldset>
);
