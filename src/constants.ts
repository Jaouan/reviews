export const PROD = import.meta.env.PROD;
export const VERSION = import.meta.env.BUILD_VERSION;
export const DISCLAIMER = toBoolean(import.meta.env.VITE_DISCLAIMER);

function toBoolean(value: string) {
  return ["true", "1", "yes"].includes(value);
}
