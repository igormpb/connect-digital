import { isAxiosError } from "axios";

const run = async <E, T>(
  promise: any,
): Promise<[E, T]> => {
  try {
    const data = await promise;
    return [undefined as E, data.data as T];
  } catch (e) {
    const err =
      isAxiosError(e) && e.response && e.response.data ? e.response?.data : e;
    return [err as E, undefined as T];
  }
};

export const handle = async <T>(promise: any): Promise<[any, T]> => {
  return run<any, T>(promise);
};
