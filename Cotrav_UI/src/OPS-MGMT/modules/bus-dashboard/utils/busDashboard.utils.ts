import type { Tile } from "../types/busDashboard.types";

export const getTileSpanClass = (span: Tile["span"]): string => {
  switch (span) {
    case "col-12": return "col-span-12";
    case "col-6":  return "col-span-12 md:col-span-6";
    case "col-4":  return "col-span-12 md:col-span-6 xl:col-span-4";
  }
};

export const navigateTo = (path: string, routeMap: Record<string, string>): void => {
  const href = routeMap[path];
  if (href) window.location.href = href;
};