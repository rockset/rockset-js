export const prettyPrint = (obj: any) => {
  return JSON.stringify(obj, null, 2);
};

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
