import type { Tile } from "../types/busDashboard.types";
import { COUNTS, TONE_CLASSES, TILE_ACCENT_CLASSES } from "../constants/busDashboard.constants";
import { getTileSpanClass } from "../utils/busDashboard.utils";

type Props = {
  tile: Tile;
  onNavigate: (path: string) => void;
};

const DashboardTile = ({ tile, onNavigate }: Props) => (
  <button
    type="button"
    onClick={() => onNavigate(tile.path)}
    className={`${getTileSpanClass(tile.span)} relative flex min-h-[88px] items-center justify-between gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${TILE_ACCENT_CLASSES[tile.tone]}`}
  >
    <div className="min-w-0 pl-2">
      <p className="truncate text-sm font-bold text-slate-900">{tile.title}</p>
      <p className="mt-1 truncate text-xs text-slate-500">{tile.subtitle}</p>
    </div>
    <span className={`shrink-0 text-3xl font-black ${TONE_CLASSES[tile.tone]}`}>
      {COUNTS[tile.countKey]}
    </span>
  </button>
);

export default DashboardTile;