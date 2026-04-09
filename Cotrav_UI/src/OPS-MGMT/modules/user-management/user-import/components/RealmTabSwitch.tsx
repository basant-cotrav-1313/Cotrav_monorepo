// import type { RealmTab } from "../types/userImport.types";
// import { REALM_META } from "../constants/userImport.constants";

// type Props = {
//   activeRealm: RealmTab;
//   onChange: (realm: RealmTab) => void;
// };

// const RealmTabSwitch = ({ activeRealm, onChange }: Props) => (
//   <div className="mb-5 flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
//     {(["ops", "client"] as RealmTab[]).map((realm) => (
//       <button
//         key={realm}
//         type="button"
//         onClick={() => onChange(realm)}
//         className={`w-full rounded-md px-3 py-2 text-sm font-bold transition ${
//           activeRealm === realm ? "bg-[#0A7CC5] text-white" : "text-slate-700 hover:bg-slate-100"
//         }`}
//       >
//         {REALM_META[realm].label}
//       </button>
//     ))}
//   </div>
// );

// export default RealmTabSwitch;

import { Shield, Users } from "lucide-react";
import type { RealmTab } from "../types/userImport.types";
import { REALM_META } from "../constants/userImport.constants";

type Props = {
  activeRealm: RealmTab;
  onChange: (realm: RealmTab) => void;
  variant?: "default" | "pill";
  recordCount?: number;
};

const REALM_ICON: Record<RealmTab, React.ReactNode> = {
  ops: <Shield className="h-3.5 w-3.5" />,
  client: <Users className="h-3.5 w-3.5" />,
};

const RealmTabSwitch = ({ activeRealm, onChange, variant = "default", recordCount }: Props) => {
  const realms = ["ops", "client"] as RealmTab[];
  const activeIndex = realms.indexOf(activeRealm);

  if (variant === "pill") {
    return (
      <div className="mb-3 flex items-center justify-between">
        <div className="relative flex items-center bg-[#0B0E2D]/10 rounded-full p-0.5 overflow-hidden">
          <div
            className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full bg-[#0B0E2D] shadow-sm shadow-[#0B0E2D]/30 transition-all duration-300 ease-in-out"
            style={{
              width: "calc(50% - 4px)",
              transform: `translateX(${activeIndex === 0 ? "0px" : "calc(100% + 4px)"})`,
            }}
          />
          {realms.map((realm) => (
            <button
              key={realm}
              type="button"
              onClick={() => onChange(realm)}
              className={`relative z-10 w-1/2 rounded-full px-4 py-1 text-xs font-bold text-center transition-colors duration-300 inline-flex items-center justify-center gap-1.5 ${
                activeRealm === realm
                  ? "text-white"
                  : "text-[#0B0E2D]/50 hover:text-[#0B0E2D]"
              }`}
            >
              {REALM_ICON[realm]}
              {REALM_META[realm].label}
            </button>
          ))}
        </div>
        {recordCount !== undefined && (
          <span className="text-xs font-semibold text-slate-500">
            {recordCount} records
          </span>
        )}
      </div>
    );
  }

  // default variant
  return (
    <div className="mb-5 flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
      {realms.map((realm) => (
        <button
          key={realm}
          type="button"
          onClick={() => onChange(realm)}
          className={`w-full rounded-md px-3 py-2 text-sm font-bold transition inline-flex items-center justify-center gap-2 ${
            activeRealm === realm
              ? "bg-[#0B0E2D] text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {REALM_ICON[realm]}
          {REALM_META[realm].label}
        </button>
      ))}
    </div>
  );
};

export default RealmTabSwitch;