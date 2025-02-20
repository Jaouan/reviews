import { PROD } from "@/constants";

type Logger = {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  table: (...args: any[]) => void;
  dir: (...args: any[]) => void;
};

const consoleLogger: Logger = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
  table: console.table,
  dir: console.dir,
};

const nopeLogger: Logger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  table: () => {},
  dir: () => {},
};

export const logger = PROD ? nopeLogger : consoleLogger;
