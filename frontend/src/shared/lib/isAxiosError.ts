import {AxiosError} from 'axios';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return error instanceof AxiosError;
}
