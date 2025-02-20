export const delay = async (time: number = 1000) =>
  await new Promise((resolve) => setTimeout(resolve, time));
