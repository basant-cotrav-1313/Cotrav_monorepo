import type { SummaryTile } from "../types/voucherDashboard.types";
import { SUMMARY_TILES } from "../constants/voucherDashboard.constants";

const SummaryTileItem = ({ tile }: { tile: SummaryTile }) => (
  <div
    className={`rounded-xl border p-4 shadow-sm ${
      tile.tone === "success"
        ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100"
        : "border-gray-200 bg-white"
    }`}
  >
    <p className={`text-xs ${tile.tone === "success" ? "text-emerald-700" : "text-gray-500"}`}>
      {tile.title}
    </p>
    <p className={`mt-1 font-bold ${tile.tone === "success" ? "text-2xl text-emerald-800" : "text-3xl text-gray-900"}`}>
      {tile.value}
    </p>
  </div>
);

const SummaryTileGrid = () => (
  <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
    {SUMMARY_TILES.map((tile) => (
      <SummaryTileItem key={tile.title} tile={tile} />
    ))}
  </div>
);

export default SummaryTileGrid;