import { useMemo } from "react";

type TUseSearchParams = <T = Record<string, any>>(url?: string, opt?: { unique: boolean }) => T;

const parseSearchParams = (url: string, unique: boolean) => {
  const urlSearch = new URL(url);
  const params: Record<string, string | string[]> = {};

  for (const [key, value] of urlSearch.searchParams) {
    const currentValue = params[key];

    if (unique || typeof currentValue === "undefined") {
      params[key] = value;
      continue;
    }

    if (Array.isArray(currentValue)) {
      if (!currentValue.includes(value)) {
        params[key] = [...currentValue, value];
      }

      continue;
    }

    if (currentValue !== value) {
      params[key] = [currentValue, value];
    }
  }

  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      !Array.isArray(value) ? JSON.parse(value) : value.map((items) => JSON.parse(items)),
    ]),
  );
};

export const useSearchParams: TUseSearchParams = <T>(
  url = location.href,
  opt = { unique: true },
) => {
  return useMemo(() => {
    return parseSearchParams(url, opt?.unique ?? true) as T;
  }, [opt?.unique, url]);
};
