import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  X, CheckCircle, XCircle, Loader2, Save, ShieldCheck, User,
  ChevronRight, Car, Plane, Hotel, Bus, TrainFront, CreditCard,
  UtensilsCrossed, Settings2, Droplets, Lock, Receipt, LayoutGrid,
  Crown, AlertCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type SubRole = "Basic" | "Billing" | "Invoice" | "Admin";
type SubRoleState = "none" | "some" | "all";

type ModulePermissions = { [subRole in SubRole]?: string[] };
type RolesData = { [module: string]: ModulePermissions };

interface PermissionsResponse {
  success: string;
  roles: RolesData;
}

type Props = {
  username: string;
  keycloakUserId: string;
  firstName: string;
  lastName: string;
  onClose: () => void;
};

// ── Design tokens ─────────────────────────────────────────────────────────────

const brand = "#0B0E2D";
const brandLight = "#E8E9F3";
const brandMid = "#C7C9E0";
const brandFaint = "#F4F5FB";

// ── Module lucide icons ───────────────────────────────────────────────────────

const MODULE_ICON: Record<string, React.ReactNode> = {
  Taxi: <Car size={15} />,
  Flight: <Plane size={15} />,
  Hotel: <Hotel size={15} />,
  Bus: <Bus size={15} />,
  Train: <TrainFront size={15} />,
  Visa: <CreditCard size={15} />,
  Meals: <UtensilsCrossed size={15} />,
  Operator: <Settings2 size={15} />,
  Waterbottle: <Droplets size={15} />,
};

const DEFAULT_ICON = <LayoutGrid size={15} />;

// ── Sub-role config ────────────────────────────────────────────────────────────

type SRConfig = { bg: string; text: string; border: string; dot: string; icon: React.ReactNode };

const SUB_ROLES: SubRole[] = ["Basic", "Billing", "Invoice", "Admin"];

const SR: Record<SubRole, SRConfig> = {
  Basic: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#2563EB", icon: <Lock size={12} /> },
  Billing: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA", dot: "#EA580C", icon: <CreditCard size={12} /> },
  Invoice: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0", dot: "#16A34A", icon: <Receipt size={12} /> },
  Admin: { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF", dot: "#9333EA", icon: <Crown size={12} /> },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPerm(perm: string): string {
  return perm.split(".").slice(1)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function getSubRoleState(checked: Set<string>, perms: string[]): SubRoleState {
  const n = perms.filter((p) => checked.has(p)).length;
  if (n === 0) return "none";
  if (n === perms.length) return "all";
  return "some";
}

// ── Checkbox primitive ────────────────────────────────────────────────────────

function Checkbox({
  state, dotColor, bgColor, onClick,
}: {
  state: SubRoleState | boolean;
  dotColor: string;
  bgColor: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const checked = state === true || state === "all";
  const indeterminate = state === "some";
  return (
    <div
      onClick={onClick}
      style={{
        width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
        border: `1.5px solid ${checked || indeterminate ? dotColor : brandMid}`,
        background: checked ? dotColor : indeterminate ? bgColor : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.15s",
      }}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
      {indeterminate && (
        <div style={{ width: "8px", height: "2px", background: dotColor, borderRadius: "1px" }} />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const KeycloakPermissionsModal = ({ username, keycloakUserId, firstName, lastName, onClose }: Props) => {
  const [rolesData, setRolesData] = useState<RolesData>({});
  const [checkedPerms, setCheckedPerms] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [activeTab, setActiveTab] = useState<SubRole>("Basic");
  const [auditData, setAuditData] = useState<any>(null);
  // ── Fetch ──────────────────────────────────────────────────────────────────
  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true); setError(null);
  //     try {
  //       const { data } = await axios.get<PermissionsResponse>(
  //         "/api/user_management/getAllKeycloakRoles",
  //       //   { params: { keycloak_id: keycloakUserId } }
  //       );
  //       const fetched = data.roles ?? {};
  //       setRolesData(fetched);
  //       const assigned = new Set<string>();
  //       Object.values(fetched).forEach((mod) =>
  //         Object.values(mod).forEach((ps) => (ps as string[]).forEach((p) => assigned.add(p)))
  //       );
  //       setCheckedPerms(assigned);
  //       const mods = Object.keys(fetched).filter((m) => !m.includes(".pro"));
  //       if (mods.length > 0) setSelectedModule(mods[0]);
  //     } catch (err) {
  //       setError((err as AxiosError).message || "Failed to fetch permissions");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [keycloakUserId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true); setError(null);
      try {
        // Fire both requests in parallel
        const [rolesRes, auditRes] = await Promise.all([
          axios.get<PermissionsResponse>("/api/user_management/getAllKeycloakRoles"),
          // axios.get("/api/user_management/getUserAccess", {
          axios.get("/api/user_management/getUserRolesAudit", {
            params: { keycloak_id: keycloakUserId },
          }),
        ]);

        setAuditData(auditRes.data);
        
        // ── Doc 3: full permissions map ────────────────────────────────────────
        const fetched = rolesRes.data.roles ?? {};
        setRolesData(fetched);

        // ── Doc 1: flatten all assigned permissions into a Set ─────────────────
        // Structure: response.services[service][subService].permissions = string[]
        const assignedPerms = new Set<string>();
const services = auditRes.data?.services ?? {};

Object.values(services).forEach((service: any) => {
  Object.values(service).forEach((subRole: any) => {
    const perms = subRole?.permissions ?? {};
    Object.entries(perms).forEach(([permKey, permValue]) => {
      if (permValue === 1) {
        assignedPerms.add(permKey);
      }
    });
  });
});

setCheckedPerms(assignedPerms);

        // Set default selected module
        const mods = Object.keys(fetched).filter((m) => !m.includes(".pro"));
        if (mods.length > 0) setSelectedModule(mods[0]);

      } catch (err) {
        setError((err as AxiosError).message || "Failed to fetch permissions");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [keycloakUserId]);

  // ── Toggles ────────────────────────────────────────────────────────────────
  const togglePerm = (perm: string) => {
    setCheckedPerms((prev) => {
      const n = new Set(prev);
      if (n.has(perm)) {
        n.delete(perm);
      } else {
        n.add(perm);
      }
      return n;
    });
    setSaveSuccess(false);
  };

  const toggleSubRole = (mod: string, sr: SubRole, state: SubRoleState) => {
    const perms = rolesData[mod]?.[sr] ?? [];
    setCheckedPerms((prev) => {
      const n = new Set(prev);
      if (state === "all") {
        perms.forEach((p) => n.delete(p));
      } else {
        perms.forEach((p) => n.add(p));
      }
      return n;
    });
    setSaveSuccess(false);
  };

// const handleSave = async () => {
//   setIsSaving(true);
//   setSaveError(null);
//   setSaveSuccess(false);

//   try {
//     const roles: Record<string, Record<string, Record<string, number>>> = {};

//     Object.entries(rolesData).forEach(([moduleName, subRoles]) => {
//       if (moduleName.includes(".pro")) return;

//       const moduleKey = moduleName.toLowerCase();
//       const moduleRoles: Record<string, Record<string, number>> = {}; // ← fixed

//       const nonAdminKeys = Object.keys(subRoles).filter(
//         (sr) => sr.toLowerCase() !== "admin"
//       );
//       const allNonAdminChecked =
//         nonAdminKeys.length > 0 &&
//         nonAdminKeys.every((sr) =>
//           (subRoles[sr as SubRole] ?? []).every((p) => checkedPerms.has(p))
//         );

//       (Object.entries(subRoles) as [SubRole, string[]][]).forEach(([subRole, perms]) => {
//         const subLabel = subRole.toLowerCase();
//         const roleKey  = `${moduleKey}-${subLabel}`;
//         const isAdmin  = subLabel === "admin";

//         const permMap: Record<string, number> = {};
//         perms.forEach((perm) => {
//           permMap[perm] = isAdmin ? (allNonAdminChecked ? 1 : 0) : checkedPerms.has(perm) ? 1 : 0;
//         });

//         moduleRoles[roleKey] = permMap; // ← Record<string,number> into Record<string, Record<string,number>> ✓
//       });

//       roles[moduleKey] = moduleRoles; // ← Record<string, Record<string,number>> into outer ✓
//     });

//     console.log(JSON.stringify(roles, null, 2));

//     await axios.post("/api/user_management/assignRoleToUserKeycloak", {
//       keycloak_id: keycloakUserId,
//       roles,
//     });

//     setSaveSuccess(true);
//     setTimeout(() => onClose(), 1500);
//   } catch (err) {
//     setSaveError((err as AxiosError).message || "Failed to save permissions");
//   } finally {
//     setIsSaving(false);
//   }
// };

  // ── Derived ────────────────────────────────────────────────────────────────
  
  
const handleSave = async () => {
  setIsSaving(true);
  setSaveError(null);
  setSaveSuccess(false);

  try {
    const addpermission: string[] = [];
    const removepermission: string[] = [];

    Object.entries(rolesData).forEach(([moduleName, subRoles]) => {
      if (moduleName.includes(".pro")) return;

      const moduleKey = moduleName.toLowerCase();

      (Object.entries(subRoles) as [SubRole, string[]][]).forEach(([subRole, perms]) => {
        const subLabel = subRole.toLowerCase();

        // Always skip admin
        if (subLabel === "admin") return;

        const roleKey = `${moduleKey}-${subLabel}`;
        const originalPerms = auditData?.services?.[moduleKey]?.[roleKey]?.permissions ?? {};

        const wasFullyChecked = perms.every((p) => originalPerms[p] === 1);
        const wasFullyUnchecked = perms.every((p) => !originalPerms[p] || originalPerms[p] === 0);
        const isNowFullyChecked = perms.every((p) => checkedPerms.has(p));
        const isNowFullyUnchecked = perms.every((p) => !checkedPerms.has(p));

        const hasChanged = perms.some(
          (p) => (originalPerms[p] === 1) !== checkedPerms.has(p)
        );

        // Nothing changed, skip
        if (!hasChanged) return;

        // Case 1: Was fully checked → now partial
        if (wasFullyChecked && !isNowFullyChecked && !isNowFullyUnchecked) {
          removepermission.push(roleKey);
          perms
            .filter((p) => checkedPerms.has(p))
            .forEach((p) => addpermission.push(p));
          return;
        }

        // Case 2: Was fully checked → now fully unchecked
        if (wasFullyChecked && isNowFullyUnchecked) {
          removepermission.push(roleKey);
          return;
        }

        // Case 3: Was fully unchecked → now fully checked
        if (wasFullyUnchecked && isNowFullyChecked) {
          addpermission.push(roleKey);
          return;
        }

        // Case 4: Was fully unchecked → now partial
        if (wasFullyUnchecked && !isNowFullyChecked && !isNowFullyUnchecked) {
          perms
            .filter((p) => checkedPerms.has(p))
            .forEach((p) => addpermission.push(p));
          return;
        }

        // Case 5: Was partial → now different partial (only changed perms)
        perms.forEach((p) => {
          const wasChecked = originalPerms[p] === 1;
          const isChecked = checkedPerms.has(p);
          if (!wasChecked && isChecked) addpermission.push(p);
          if (wasChecked && !isChecked) removepermission.push(p);
        });
      });
    });

    const payload = {
      keycloak_id: keycloakUserId,
      roles: {
        addpermission,
        removepermission,
      },
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    await axios.post("/api/user_management/assignSpecialPermissionToUser", payload);

    setSaveSuccess(true);
    setTimeout(() => onClose(), 1500);
  } catch (err) {
    setSaveError((err as AxiosError).message || "Failed to save permissions");
  } finally {
    setIsSaving(false);
  }
};

  
  const modules = Object.keys(rolesData).filter((m) => !m.includes(".pro"));
  const totalPerms = [...new Set(Object.values(rolesData).flatMap((m) => Object.values(m).flat() as string[]))].length;
  const progress = totalPerms > 0 ? Math.round((checkedPerms.size / totalPerms) * 100) : 0;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Unknown";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .kpm-backdrop { animation: kpmFade  0.2s ease; }
        .kpm-modal    { animation: kpmSlide 0.28s cubic-bezier(0.16,1,0.3,1); }

        @keyframes kpmFade  { from{opacity:0} to{opacity:1} }
        @keyframes kpmSlide {
          from { opacity:0; transform:translate(-50%,-50%) scale(0.96) translateY(12px); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1)    translateY(0);    }
        }
        @keyframes spin { to { transform:rotate(360deg); } }

        .kpm-sb-item:hover:not(.kpm-sb-active) { background: ${brandFaint} !important; }
        .kpm-sb-item  { transition: background 0.12s, border-color 0.12s; }

        .kpm-chip     { transition: all 0.12s; cursor: pointer; }
        .kpm-chip:hover { box-shadow: 0 2px 8px rgba(11,14,45,0.08); transform: translateY(-1px); }

        .kpm-tab      { transition: all 0.15s; cursor: pointer; }
        .kpm-tab:hover:not(.kpm-tab-active) { border-color: ${brandMid} !important; background: ${brandFaint} !important; }

        .kpm-save { transition: all 0.18s; }
        .kpm-save:hover:not(:disabled) { background: #181C4A !important; box-shadow: 0 4px 16px rgba(11,14,45,0.3); transform: translateY(-1px); }
        .kpm-save:active:not(:disabled) { transform: translateY(0); }

        .kpm-cancel { transition: all 0.15s; }
        .kpm-cancel:hover { background: ${brandFaint} !important; border-color: ${brandMid} !important; }

        .kpm-close { transition: all 0.15s; }
        .kpm-close:hover { background: ${brandLight} !important; }

        .kpm-select-all { transition: all 0.15s; cursor: pointer; }
        .kpm-select-all:hover { background: ${brandLight} !important; border-color: ${brandMid} !important; }

        .kpm-scroll::-webkit-scrollbar       { width: 3px; }
        .kpm-scroll::-webkit-scrollbar-track { background: transparent; }
        .kpm-scroll::-webkit-scrollbar-thumb { background: ${brandMid}; border-radius: 99px; }

        .kpm-success { animation: kpmPop 0.3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes kpmPop {
          from { opacity:0; transform:scale(0.92) translateY(4px); }
          to   { opacity:1; transform:scale(1)    translateY(0);   }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="kpm-backdrop fixed inset-0 z-50"
        style={{ background: "rgba(11,14,45,0.55)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="kpm-modal fixed left-1/2 top-1/2 z-50 w-full"
        style={{
          transform: "translate(-50%,-50%)",
          maxWidth: "980px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: "#ffffff",
          border: `1px solid ${brandMid}`,
          borderRadius: "20px",
          boxShadow: "0 8px 8px rgba(11,14,45,0.04), 0 32px 80px rgba(11,14,45,0.18)",
          display: "flex", flexDirection: "column",
          maxHeight: "88vh",
        }}
      >

        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 28px 16px",
          borderBottom: `1px solid ${brandLight}`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "42px", height: "42px", background: brand,
              borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <ShieldCheck size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: brand, letterSpacing: "-0.02em" }}>
                Keycloak Permissions
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: "11px", color: "#8B8FA8", fontFamily: "'JetBrains Mono', monospace" }}>
                {username}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Progress pill */}
            {!isLoading && !error && (
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "8px 16px", borderRadius: "10px",
                background: brandFaint, border: `1px solid ${brandLight}`,
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Access granted
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: brand, marginLeft: "20px" }}>
                      {checkedPerms.size}/{totalPerms}
                    </span>
                  </div>
                  <div style={{ width: "130px", height: "4px", borderRadius: 99, background: brandMid, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${progress}%`, background: brand,
                      borderRadius: 99, transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: "14px", fontWeight: 800, color: brand }}>{progress}%</span>
              </div>
            )}

            {/* Name pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 12px", borderRadius: "10px",
              background: brandFaint, border: `1px solid ${brandLight}`,
              fontSize: "12px", fontWeight: 600, color: brand,
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: brandLight, border: `1px solid ${brandMid}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <User size={13} color={brand} />
              </div>
              {fullName}
            </div>

            {/* Close */}
            <button type="button" onClick={onClose} className="kpm-close" style={{
              width: "36px", height: "36px", borderRadius: "10px",
              border: `1px solid ${brandMid}`, background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#8B8FA8",
            }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", minHeight: 0 }}>

          {/* Loading */}
          {isLoading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", color: "#8B8FA8" }}>
              <Loader2 size={26} color={brand} style={{ animation: "spin 0.8s linear infinite" }} />
              <span style={{ fontSize: "13px", fontWeight: 500 }}>Loading permissions…</span>
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                borderRadius: "12px", background: "#FFF7F7",
                border: "1px solid #FECACA", padding: "16px 20px", maxWidth: "420px",
              }}>
                <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: "1px" }} />
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#DC2626" }}>Failed to load</p>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#B91C1C", fontFamily: "'JetBrains Mono', monospace" }}>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {!isLoading && !error && (
            <>
              {/* ── Sidebar ── */}
              <div className="kpm-scroll" style={{
                width: "224px", flexShrink: 0,
                borderRight: `1px solid ${brandLight}`,
                overflowY: "auto", padding: "16px 10px",
                background: brandFaint,
              }}>
                <p style={{
                  fontSize: "10px", fontWeight: 700, color: "#8B8FA8",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "0 8px", marginBottom: "10px",
                }}>
                  Modules · {modules.length}
                </p>

                {modules.map((mod) => {
                  const isActive = selectedModule === mod;
                  const allModPerms = SUB_ROLES.flatMap((sr) => rolesData[mod]?.[sr] ?? []);
                  const checkedInMod = allModPerms.filter((p) => checkedPerms.has(p)).length;
                  const hasAny = checkedInMod > 0;
                  const isComplete = checkedInMod === allModPerms.length && allModPerms.length > 0;

                  return (
                    <div
                      key={mod}
                      className={`kpm-sb-item ${isActive ? "kpm-sb-active" : ""}`}
                      onClick={() => { setSelectedModule(mod); setActiveTab("Basic"); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px 10px", borderRadius: "10px", marginBottom: "3px",
                        background: isActive ? "#ffffff" : "transparent",
                        border: `1px solid ${isActive ? brandMid : "transparent"}`,
                        boxShadow: isActive ? "0 1px 4px rgba(11,14,45,0.07)" : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
                        background: isActive ? brandLight : "#ECEEF5",
                        border: `1px solid ${isActive ? brandMid : "transparent"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: brand,
                      }}>
                        {MODULE_ICON[mod] ?? DEFAULT_ICON}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          margin: 0, fontSize: "12px",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? brand : "#374151",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {mod}
                        </p>
                        <p style={{ margin: "2px 0 0", fontSize: "10px", color: hasAny ? "#16A34A" : "#9CA3AF", fontWeight: hasAny ? 600 : 400 }}>
                          {hasAny ? `${checkedInMod} / ${allModPerms.length} active` : "No access"}
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                        {isComplete
                          ? <CheckCircle size={13} color="#16A34A" />
                          : hasAny
                            ? <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B" }} />
                            : null}
                        <ChevronRight size={13} color={isActive ? brand : "#C7C9E0"} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Detail pane ── */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
                {selectedModule ? (
                  <>
                    {/* Pane header */}
                    <div style={{ padding: "16px 24px 14px", borderBottom: `1px solid ${brandLight}`, flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "40px", height: "40px", borderRadius: "11px",
                            background: brandLight, border: `1px solid ${brandMid}`,
                            display: "flex", alignItems: "center", justifyContent: "center", color: brand,
                          }}>
                            {MODULE_ICON[selectedModule] ?? DEFAULT_ICON}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: brand, letterSpacing: "-0.01em" }}>
                              {selectedModule}
                            </p>
                            <p style={{ margin: "3px 0 0", fontSize: "11px", color: "#8B8FA8" }}>
                              Select a sub-role tab, then toggle individual permissions
                            </p>
                          </div>
                        </div>

                        {/* Sub-role summary pills */}
                        <div style={{ display: "flex", gap: "6px" }}>
                          {SUB_ROLES.map((sr) => {
                            const state = getSubRoleState(checkedPerms, rolesData[selectedModule]?.[sr] ?? []);
                            const c = SR[sr];
                            return (
                              <div key={sr} style={{
                                display: "flex", alignItems: "center", gap: "5px",
                                padding: "4px 10px", borderRadius: "99px",
                                background: state !== "none" ? c.bg : "#F9FAFB",
                                border: `1px solid ${state !== "none" ? c.border : "#E5E7EB"}`,
                              }}>
                                <div style={{
                                  width: "6px", height: "6px", borderRadius: "50%",
                                  background: state === "all" ? c.dot : state === "some" ? "#F59E0B" : "#D1D5DB",
                                }} />
                                <span style={{ fontSize: "10px", fontWeight: 600, color: state !== "none" ? c.text : "#9CA3AF" }}>
                                  {sr}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sub-role tabs */}
                      <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                        {SUB_ROLES.map((sr) => {
                          const perms = rolesData[selectedModule]?.[sr] ?? [];
                          const state = getSubRoleState(checkedPerms, perms);
                          const c = SR[sr];
                          const isActive = activeTab === sr;
                          const count = perms.filter((p) => checkedPerms.has(p)).length;

                          return (
                            <button
                              key={sr}
                              type="button"
                              onClick={() => setActiveTab(sr)}
                              className={`kpm-tab ${isActive ? "kpm-tab-active" : ""}`}
                              style={{
                                display: "flex", alignItems: "center", gap: "7px",
                                padding: "8px 14px", borderRadius: "9px",
                                border: `1.5px solid ${isActive ? c.dot : "#E5E7EB"}`,
                                background: isActive ? c.bg : "#fff",
                                color: isActive ? c.text : "#6B7280",
                                fontSize: "12px", fontWeight: isActive ? 700 : 500,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                            >
                              <Checkbox
                                state={state} dotColor={c.dot} bgColor={c.bg}
                                onClick={(e) => { e.stopPropagation(); toggleSubRole(selectedModule, sr, state); }}
                              />
                              <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "inherit" }}>
                                {c.icon} {sr}
                              </span>
                              {count > 0 && (
                                <span style={{
                                  fontSize: "10px", padding: "1px 6px", borderRadius: "99px",
                                  background: c.dot, color: "#fff", fontWeight: 700, lineHeight: "16px",
                                }}>
                                  {count}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Permissions grid */}
                    <div className="kpm-scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 24px" }}>
                      {(rolesData[selectedModule]?.[activeTab] ?? []).length === 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", padding: "48px 0", color: "#9CA3AF" }}>
                          <ShieldCheck size={30} color="#D1D5DB" />
                          <p style={{ margin: 0, fontSize: "13px" }}>No permissions in this sub-role</p>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                            <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              {activeTab} permissions &middot; {(rolesData[selectedModule]?.[activeTab] ?? []).length} total
                            </p>
                            <button
                              type="button"
                              className="kpm-select-all"
                              onClick={() => toggleSubRole(selectedModule, activeTab, getSubRoleState(checkedPerms, rolesData[selectedModule]?.[activeTab] ?? []))}
                              style={{
                                fontSize: "11px", fontWeight: 600, color: brand,
                                background: brandFaint, border: `1px solid ${brandLight}`,
                                borderRadius: "6px", padding: "4px 10px", cursor: "pointer",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                            >
                              {getSubRoleState(checkedPerms, rolesData[selectedModule]?.[activeTab] ?? []) === "all"
                                ? "Deselect all" : "Select all"}
                            </button>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "8px" }}>
                            {(rolesData[selectedModule]?.[activeTab] ?? []).map((perm) => {
                              const isChecked = checkedPerms.has(perm);
                              const c = SR[activeTab];
                              return (
                                <div
                                  key={perm}
                                  className="kpm-chip"
                                  onClick={() => togglePerm(perm)}
                                  style={{
                                    display: "flex", alignItems: "center", gap: "10px",
                                    padding: "10px 12px", borderRadius: "10px",
                                    border: `1.5px solid ${isChecked ? c.border : "#E5E7EB"}`,
                                    background: isChecked ? c.bg : "#FAFAFA",
                                  }}
                                >
                                  <Checkbox state={isChecked} dotColor={c.dot} bgColor={c.bg} />
                                  <span style={{
                                    fontSize: "12px", fontWeight: isChecked ? 600 : 400,
                                    color: isChecked ? c.text : "#4B5563",
                                    fontFamily: "'JetBrains Mono', monospace",
                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                  }}>
                                    {formatPerm(perm)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", color: "#9CA3AF" }}>
                    <ShieldCheck size={34} color="#D1D5DB" />
                    <p style={{ margin: 0, fontSize: "13px" }}>Select a module from the sidebar</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          borderTop: `1px solid ${brandLight}`,
          padding: "16px 28px",
          display: "flex", flexDirection: "column", gap: "10px",
          flexShrink: 0,
          background: brandFaint,
          borderRadius: "0 0 20px 20px",
        }}>
          {saveSuccess && (
            <div className="kpm-success" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "10px 14px", borderRadius: "10px",
              background: "#F0FDF4", border: "1px solid #BBF7D0",
              fontSize: "12px", fontWeight: 600, color: "#15803D",
            }}>
              <CheckCircle size={14} /> Permissions saved successfully
            </div>
          )}
          {saveError && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "10px 14px", borderRadius: "10px",
              background: "#FFF7F7", border: "1px solid #FECACA",
              fontSize: "12px", fontWeight: 600, color: "#DC2626",
            }}>
              <XCircle size={14} /> {saveError}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p style={{ margin: 0, fontSize: "11px", color: "#9CA3AF", flex: 1 }}>
              {checkedPerms.size > 0
                ? `${checkedPerms.size} permission${checkedPerms.size !== 1 ? "s" : ""} will be assigned`
                : "No permissions selected"}
            </p>
            <button
              type="button" onClick={onClose} className="kpm-cancel"
              style={{
                padding: "10px 24px", borderRadius: "10px",
                border: `1px solid ${brandMid}`, background: "#fff",
                fontSize: "12px", fontWeight: 700, color: "#374151",
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Cancel
            </button>
            <button
              type="button" onClick={handleSave} disabled={isSaving}
              className="kpm-save"
              style={{
                padding: "10px 28px", borderRadius: "10px",
                border: `1px solid ${brand}`, background: brand,
                fontSize: "12px", fontWeight: 700, color: "#ffffff",
                cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.65 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {isSaving
                ? <><Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} /> Saving…</>
                : <><Save size={13} /> Save Permissions</>}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default KeycloakPermissionsModal;