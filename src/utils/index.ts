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

export function formatDate(dateString: Date): string {
  const date = new Date(dateString)

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
