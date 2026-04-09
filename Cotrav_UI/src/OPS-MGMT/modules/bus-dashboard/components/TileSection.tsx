import type { Tile } from "../types/busDashboard.types";
import DashboardTile from "./DashboardTile";

type Props = {
  label: string;
  tiles: Tile[];
  onNavigate: (path: string) => void;
};

const TileSection = ({ label, tiles, onNavigate }: Props) => (
  <>
    <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-600">{label}</p>
    <div className="mt-2 grid grid-cols-12 gap-3">
      {tiles.map((tile) => (
        <DashboardTile key={tile.title} tile={tile} onNavigate={onNavigate} />
      ))}
    </div>
  </>
);

export default TileSection;