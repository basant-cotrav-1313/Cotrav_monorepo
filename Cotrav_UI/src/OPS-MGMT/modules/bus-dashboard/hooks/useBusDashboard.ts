import { useMemo, useState } from "react";
import type { NavGroup } from "../types/busDashboard.types";
import { COUNTS, NAV_GROUPS, ROUTE_MAP, TONE_CLASSES } from "../constants/busDashboard.constants";
import { navigateTo as navigate } from "../utils/busDashboard.utils";

export const useBusDashboard = () => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    busAnalytics: false,
    busInvoices:  false,
    busLogins:    false,
    busVendors:   false,
  });

  const groupTotals = useMemo(
    () =>
      NAV_GROUPS.reduce<Record<NavGroup["id"], number>>(
        (acc, group) => {
          acc[group.id] = group.items.reduce((sum, item) => sum + COUNTS[item.countKey], 0);
          return acc;
        },
        { busAnalytics: 0, busInvoices: 0, busLogins: 0, busVendors: 0 }
      ),
    []
  );

  const busNavigationGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        id:    group.id,
        title: group.title,
        total: groupTotals[group.id],
        items: group.items.map((item) => ({
          label:          item.label,
          path:           item.path,
          count:          COUNTS[item.countKey],
          countClassName: item.tone ? TONE_CLASSES[item.tone] : "text-slate-700",
        })),
      })),
    [groupTotals]
  );

  const toggleGroup = (groupId: string) =>
    setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

  const navigateTo = (path: string) => navigate(path, ROUTE_MAP);

  return {
    collapsed,
    toggleGroup,
    navigateTo,
    busNavigationGroups,
  };
};