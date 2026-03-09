import React from "react";

export type FlightNavigationItem = {
  label: string;
  path: string;
  count: number;
  countClassName?: string;
};

export type FlightNavigationGroup = {
  id: string;
  title: string;
  total: number;
  items: FlightNavigationItem[];
};

type FlightNavigationMenuProps = {
  groups: FlightNavigationGroup[];
  collapsed: Record<string, boolean>;
  onToggleGroup: (groupId: string) => void;
  onNavigate: (path: string) => void;
};

const FlightNavigationMenu: React.FC<FlightNavigationMenuProps> = ({
  groups,
  collapsed,
  onToggleGroup,
  onNavigate
}) => {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-3 lg:sticky lg:top-20 lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto">
      <div className="space-y-2.5">
        {groups.map((group) => (
          <div key={group.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => onToggleGroup(group.id)}
              className="flex w-full items-center justify-between border-b border-slate-200 px-2.5 py-2 text-left"
            >
              <span className="text-xs font-black uppercase tracking-wide text-slate-700">{group.title}</span>
              <span className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-500">{group.total}</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-slate-50 text-sm font-black text-slate-700">
                  {collapsed[group.id] ? "+" : "-"}
                </span>
              </span>
            </button>

            {!collapsed[group.id] ? (
              <div className="space-y-1.5 p-1.5">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate(item.path)}
                    className="flex w-full items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 text-left text-xs transition hover:bg-slate-100"
                  >
                    <span className="truncate font-semibold text-slate-800">{item.label}</span>
                    <span
                      className={`shrink-0 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-black ${item.countClassName ?? "text-slate-700"}`}
                    >
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FlightNavigationMenu;
