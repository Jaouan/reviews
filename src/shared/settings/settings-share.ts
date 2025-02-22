import { endpointsStringToArray } from "./settings-serialization";

export const copyShareLink = (endpointsString: string) => {
  navigator.clipboard.writeText(
    `${window.location.origin}/?endpoints=${endpointsStringToArray(
      endpointsString
    ).join(";")}`
  );
};
