import type { AxiosError } from "axios";
import type { ApiResponse } from "../shared/types/types";

export const classNames = (...className: string []) => {
    return className.filter(Boolean).join(" ")
}

export function extractApiError(error: unknown): string {
  const err = error as AxiosError<ApiResponse<null>>;

  return (
    err.response?.data?.message ||
    err.message ||
    "Something went wrong. Please try again"
  );
}