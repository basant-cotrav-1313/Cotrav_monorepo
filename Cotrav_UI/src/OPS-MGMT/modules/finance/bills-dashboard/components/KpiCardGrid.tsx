import { KPI_CARDS } from "../constants/billsDashboard.constants";
import KpiCardItem from "./KpiCardItem";

const KpiCardGrid = () => (
  <div className="grid grid-cols-12 gap-3">
    {KPI_CARDS.map((card) => (
      <KpiCardItem key={card.title} card={card} />
    ))}
  </div>
);

export default KpiCardGrid;