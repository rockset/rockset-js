export const prettyPrint = (obj: any) => {
  return JSON.stringify(obj, null, 2);
};

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

/**
 * Helps typescript infer tuple types correctly
 * @param data data to convert to a tuple
 */
export function tuple<T extends unknown[]>(...data: T) {
  return data;
}
