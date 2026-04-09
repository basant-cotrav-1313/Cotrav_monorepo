
// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import {
//   X, CheckCircle, XCircle, Loader2, Save, Shield,
//   User, ChevronDown, ChevronRight, Info,
//   Plane, Hotel, Bus, Train, Car, Utensils, Droplets
// } from "lucide-react";
// import type { RoleAuditResponse, ServicesMap } from "../types/userImport.types";

// // ─── helpers ──────────────────────────────────────────────────────────────────

// const SERVICE_META: Record<string, { label: string; icon: React.ReactNode; color: string; activeBg: string; activeBorder: string; activeText: string; badgeBg: string }> = {
//   flight:      { label: "Flight",       icon: <Plane size={13} />,     color: "#185FA5", activeBg: "bg-blue-50",   activeBorder: "border-blue-300",  activeText: "text-blue-700",  badgeBg: "bg-blue-600"   },
//   hotel:       { label: "Hotel",        icon: <Hotel size={13} />,     color: "#3B6D11", activeBg: "bg-green-50",  activeBorder: "border-green-300", activeText: "text-green-700", badgeBg: "bg-green-600"  },
//   bus:         { label: "Bus",          icon: <Bus size={13} />,       color: "#854F0B", activeBg: "bg-amber-50",  activeBorder: "border-amber-300", activeText: "text-amber-700", badgeBg: "bg-amber-600"  },
//   train:       { label: "Train",        icon: <Train size={13} />,     color: "#534AB7", activeBg: "bg-violet-50", activeBorder: "border-violet-300",activeText: "text-violet-700",badgeBg: "bg-violet-600" },
//   taxi:        { label: "Taxi",         icon: <Car size={13} />,       color: "#993556", activeBg: "bg-rose-50",   activeBorder: "border-rose-300",  activeText: "text-rose-700",  badgeBg: "bg-rose-600"   },
//   meals:       { label: "Meals",        icon: <Utensils size={13} />,  color: "#A32D2D", activeBg: "bg-red-50",    activeBorder: "border-red-300",   activeText: "text-red-700",   badgeBg: "bg-red-600"    },
//   waterbottle: { label: "Water Bottle", icon: <Droplets size={13} />,  color: "#0F6E56", activeBg: "bg-teal-50",   activeBorder: "border-teal-300",  activeText: "text-teal-700",  badgeBg: "bg-teal-600"   },
// };

// const SUB_ROLE_LABELS: Record<string, { label: string; desc: string }> = {
//   basic:   { label: "Basic",   desc: "Core booking operations (create, accept, reject, assign)" },
//   billing: { label: "Billing", desc: "Billing actions like validate, payment, and create bills" },
//   invoice: { label: "Invoice", desc: "Invoice creation, validation, and payment approval" },
//   admin:   { label: "Admin",   desc: "Full access — all permissions combined" },
// };

// function compositeKey(service: string, subRole: string) {
//   return `${service}::${subRole}`;
// }

// function parseSubRoleKey(key: string): string {
//   const parts = key.split("-");
//   return parts[parts.length - 1];
// }

// function isServiceActive(serviceRoles: Record<string, { db_value: number }>) {
//   return Object.values(serviceRoles).some((r) => r.db_value === 1);
// }

// // ─── types ────────────────────────────────────────────────────────────────────

// type CheckedState = Set<string>;

// type Props = {
//   username: string;
//   keycloakUserId: string;
//   firstName: string;
//   lastName: string;
//   onClose: () => void;
// };

// // ─── sub-components ───────────────────────────────────────────────────────────

// function PermissionPill({ perm }: { perm: string }) {
//   return (
//     <span className="px-2 py-0.5 bg-stone-100 border border-stone-300 rounded-full text-[10px] text-stone-600 font-mono whitespace-nowrap">
//       {perm}
//     </span>
//   );
// }

// function KcCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
//   return (
//     <div
//       onClick={onChange}
//       className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center cursor-pointer transition-all duration-150 flex-shrink-0
//         ${checked
//           ? "bg-blue-50 border-[1.5px] border-blue-500"
//           : "bg-slate-50 border-[1.5px] border-slate-300 hover:border-blue-300"
//         }`}
//     >
//       {checked && (
//         <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
//           stroke="#378ADD" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 13l4 4L19 7" />
//         </svg>
//       )}
//     </div>
//   );
// }

// function DbCheckbox({ checked }: { checked: boolean }) {
//   return (
//     <div
//       className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 cursor-not-allowed
//         ${checked
//           ? "bg-green-50 border-[1.5px] border-green-400"
//           : "bg-slate-100 border-[1.5px] border-slate-200"
//         }`}
//       title="DB access is managed externally and cannot be changed here"
//     >
//       {checked && (
//         <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
//           stroke="#639922" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 13l4 4L19 7" />
//         </svg>
//       )}
//     </div>
//   );
// }

// // ─── main component ───────────────────────────────────────────────────────────

// const RoleAuditModal = ({ username, keycloakUserId, firstName, lastName, onClose }: Props) => {
//   const [services, setServices]       = useState<ServicesMap>({});
//   const [dbChecked, setDbChecked]     = useState<CheckedState>(new Set());
//   const [kcChecked, setKcChecked]     = useState<CheckedState>(new Set());
//   const [expanded, setExpanded]       = useState<Set<string>>(new Set());
//   const [isLoading, setIsLoading]     = useState(true);
//   const [isSaving, setIsSaving]       = useState(false);
//   const [error, setError]             = useState<string | null>(null);
//   const [saveError, setSaveError]     = useState<string | null>(null);
//   const [saveSuccess, setSaveSuccess] = useState(false);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const { data } = await axios.get<RoleAuditResponse>(
//           "/api/user_management/getUserRolesAudit",
//           { params: { keycloak_id: keycloakUserId } }
//         );
//         const svc = data.services ?? {};
//         setServices(svc);

//         const dbSet: CheckedState = new Set();
//         const kcSet: CheckedState = new Set();
//         const exp: Set<string>    = new Set();

//         Object.entries(svc).forEach(([svcName, subRoles]) => {
//           // exp.add(svcName); // expand all by default
//           Object.entries(subRoles).forEach(([subKey, role]) => {
//             const key = compositeKey(svcName, subKey);
//             if (role.db_value === 1)             dbSet.add(key);
//             if (role.assigned_in_keycloak === 1) kcSet.add(key);
//           });
//         });

//         setDbChecked(dbSet);
//         setKcChecked(kcSet);
//         setExpanded(exp);
//       } catch (err) {
//         setError((err as AxiosError).message || "Failed to fetch roles");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [keycloakUserId]);

//  const toggleKc = (key: string) => {
//   setKcChecked((prev) => {
//     const n = new Set(prev);

//     if (n.has(key)) {
//       n.delete(key);
//     } else {
//       n.add(key);
//     }

//     return n;
//   });

//   setSaveSuccess(false);
// };

//  const toggleExpand = (svc: string) => {
//   setExpanded((prev) => {
//     const n = new Set(prev);

//     if (n.has(svc)) {
//       n.delete(svc);
//     } else {
//       n.add(svc);
//     }

//     return n;
//   });
// };

//   // const handleSave = async () => {
//   //   setIsSaving(true);
//   //   setSaveError(null);
//   //   setSaveSuccess(false);
//   //   try {
//   //     await axios.post("/api/user_management/assignRoleToUserKeycloak", {
//   //       keycloak_id: keycloakUserId,
//   //       kc_roles: Array.from(kcChecked),
//   //     });
//   //     setSaveSuccess(true);
//   //   } catch (err) {
//   //     setSaveError((err as AxiosError).message || "Failed to save roles");
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };

// //   const handleSave = async () => {
// //   setIsSaving(true);
// //   setSaveError(null);
// //   setSaveSuccess(false);

// //   try {
// //     const roles: Record<string, string[]> = {};

// // kcChecked.forEach((key) => {
// //   const [service, fullSubKey] = key.split("::");

// //   if (!service || !fullSubKey) return;

// //   const subRole = fullSubKey.split("-").pop(); // ✅ fix here
// //   if (!subRole) return;

// //   const moduleKey = service.toLowerCase();
// //   const roleKey = `${moduleKey}-${subRole}`;

// //   if (!roles[moduleKey]) {
// //     roles[moduleKey] = [];
// //   }

// //   roles[moduleKey].push(roleKey);
// // });

// //     console.log({
// //       keycloak_id: keycloakUserId,
// //       roles,
// //     });

// //     await axios.post("/api/user_management/assignRoleToUserKeycloak", {
// //       keycloak_id: keycloakUserId,
// //       roles,
// //     });

// //     setSaveSuccess(true);

// //   } catch (err) {
// //     setSaveError((err as AxiosError).message || "Failed to save roles");
// //   } finally {
// //     setIsSaving(false);
// //   }
// // };

// const handleSave = async () => {
//   setIsSaving(true);
//   setSaveError(null);
//   setSaveSuccess(false);

//   try {
//     const roles: Record<string, Record<string, string[]>> = {};

//     Object.entries(services).forEach(([svcName, subRoles]) => {
//       const moduleKey = svcName.toLowerCase();
//       const moduleRoles: Record<string, string[]> = {};

//       Object.entries(subRoles).forEach(([subKey, role]) => {
//         const cKey = compositeKey(svcName, subKey);

//         // Only include if KC is checked
//         if (!kcChecked.has(cKey)) return;

//         const subLabel = parseSubRoleKey(subKey);
//         const roleKey = `${moduleKey}-${subLabel}`;

//         moduleRoles[roleKey] = role.permissions;
//       });

//       // Skip module if nothing checked
//       if (Object.keys(moduleRoles).length === 0) return;

//       roles[moduleKey] = moduleRoles;
//     });

//     await axios.post("/api/user_management/assignRoleToUserKeycloak", {
//       keycloak_id: keycloakUserId,
//       roles,
//     });

//     setSaveSuccess(true);
//     setTimeout(() => onClose(), 1500);
//   } catch (err) {
//     setSaveError((err as AxiosError).message || "Failed to save roles");
//   } finally {
//     setIsSaving(false);
//   }
// };

//   const activeServices   = Object.entries(services).filter(([, sr]) => isServiceActive(sr)).length;
//   const inactiveServices = Object.keys(services).length - activeServices;
//   const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || username;

//   return (
//     <>
//      {/* @keyframes ramSlideUp { from { opacity: 0; transform: translate(-50%, -50%) } to { opacity: 1; transform: translate(-50%, -50%) } } */}
//       <style>{`
//         @keyframes ramFadeIn  { from { opacity: 0 } to { opacity: 1 } }
//        @keyframes ramSlideUp {
//   from { opacity: 0; transform: scale(0.96); }
//   to   { opacity: 1; transform: scale(1); }
// }

// .ram-modal {
//   animation: ramSlideUp .25s cubic-bezier(.16,1,.3,1);
// }
//         @keyframes spin       { to { transform: rotate(360deg) } }
//         @keyframes popIn      { from { opacity: 0; transform: scale(.95) } to { opacity: 1; transform: scale(1) } }
//         .ram-backdrop { animation: ramFadeIn .2s ease }
//         .ram-modal    { animation: ramSlideUp .25s cubic-bezier(.16,1,.3,1) }
//         .ram-spin     { animation: spin 0.8s linear infinite }
//         .ram-pop      { animation: popIn .25s cubic-bezier(.16,1,.3,1) }
//         .ram-scroll::-webkit-scrollbar       { width: 4px }
//         .ram-scroll::-webkit-scrollbar-track { background: transparent }
//         .ram-scroll::-webkit-scrollbar-thumb { background: #C7C9E0; border-radius: 99px }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         className="ram-backdrop fixed inset-0 z-50 bg-[rgba(11,14,45,0.55)] backdrop-blur-md"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="ram-modal fixed left-1/2 top-1/2 z-[51] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2
//         flex flex-col max-h-[90vh] bg-white rounded-2xl border border-slate-200
//         shadow-[0_8px_40px_rgba(11,14,45,.18)]">

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
//           <div className="flex items-center gap-2.5">
//             <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
//               <Shield size={16} className="text-[#0B0E2D]" />
//             </div>
//             <div>
//               <h2 className="m-0 text-sm font-semibold text-[#0B0E2D]">Role Assignment</h2>
//               <p className="mt-0.5 text-[11px] text-slate-400 font-mono">{username}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-[#0B0E2D]">
//               <User size={12} /> {fullName}
//             </div>
//             <button
//               onClick={onClose}
//               className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center cursor-pointer text-slate-400 hover:bg-slate-50 transition-colors"
//             >
//               <X size={12} />
//             </button>
//           </div>
//         </div>

//         {/* Info banner */}
//         <div className="mx-5 mt-3.5 px-3.5 py-2.5 bg-blue-50 border border-blue-200 rounded-xl flex gap-2.5 items-start flex-shrink-0">
//           <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
//           <p className="m-0 text-xs text-blue-600 leading-relaxed">
//             Each service can be toggled independently.{" "}
//             <strong>DB</strong> shows current database-level access (read-only — managed externally).{" "}
//             <strong>KC</strong> (Keycloak) controls the login token — you can grant or revoke KC access for any service here, including ones with no current DB access.
//           </p>
//         </div>

//         {/* Summary bar */}
//         <div className="flex items-center gap-2 px-5 py-2.5 flex-shrink-0">
//           <span className="text-[11px] text-slate-400">Services:</span>
//           <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-300 rounded-full text-[11px] font-semibold text-green-700">
//             <CheckCircle size={10} /> {activeServices} active
//           </span>
//           <span className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 border border-stone-300 rounded-full text-[11px] font-semibold text-stone-500">
//             <XCircle size={10} /> {inactiveServices} inactive
//           </span>
//           <div className="ml-auto flex items-center gap-4">
//             <span className="flex items-center gap-1.5 text-[10px] text-slate-400 select-none">
//               <span className="w-2.5 h-2.5 rounded-[3px] bg-green-50 border border-green-400 inline-block" />
//               DB = Database (read-only)
//             </span>
//             <span className="flex items-center gap-1.5 text-[10px] text-slate-400 select-none">
//               <span className="w-2.5 h-2.5 rounded-[3px] bg-blue-50 border border-blue-400 inline-block" />
//               KC = Keycloak access
//             </span>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="ram-scroll overflow-y-auto px-5 pb-4 flex-1">
//           {isLoading ? (
//             <div className="flex items-center justify-center gap-2.5 py-16 text-slate-400 text-sm">
//               <Loader2 size={16} className="ram-spin text-[#0B0E2D]" />
//               Loading services and roles…
//             </div>
//           ) : error ? (
//             <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600 font-mono">
//               {error}
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {Object.entries(services).map(([svcName, subRoles]) => {
//                 const meta       = SERVICE_META[svcName];
//                 const active     = isServiceActive(subRoles);
//                 const isOpen     = expanded.has(svcName);
//                 const subEntries = Object.entries(subRoles);
//                 const kcCount    = subEntries.filter(([k]) => kcChecked.has(compositeKey(svcName, k))).length;

//                 return (
//                   <div
//                     key={svcName}
//                     className={`border rounded-xl overflow-hidden ${active ? (meta?.activeBorder ?? "border-slate-300") : "border-slate-200"}`}
//                   >
//                     {/* Service header */}
//                     <div
//                       onClick={() => toggleExpand(svcName)}
//                       className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors
//                         ${active ? `${meta?.activeBg ?? "bg-slate-50"} hover:brightness-95` : "bg-slate-50 hover:bg-slate-100"}`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span style={{ color: active ? meta?.color : "#9ca3af" }} className="flex">
//                           {meta?.icon}
//                         </span>
//                         <span className={`text-[13px] font-semibold ${active ? (meta?.activeText ?? "text-slate-700") : "text-slate-400"}`}>
//                           {meta?.label ?? svcName}
//                         </span>
//                         {active ? (
//                           <span className={`px-2 py-0.5 ${meta?.badgeBg ?? "bg-slate-600"} rounded-full text-[10px] font-semibold text-white`}>
//                             Access granted
//                           </span>
//                         ) : (
//                           <span className="px-2 py-0.5 bg-slate-200 rounded-full text-[10px] text-slate-500">
//                             No DB access
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className={`text-[10px] ${active ? (meta?.activeText ?? "text-slate-500") : "text-slate-400"}`}>
//                           {kcCount}/{subEntries.length} KC assigned
//                         </span>
//                         {isOpen
//                           ? <ChevronDown size={14} className="text-slate-400" />
//                           : <ChevronRight size={14} className="text-slate-400" />
//                         }
//                       </div>
//                     </div>

//                     {/* Sub-roles table */}
//                     {/* {isOpen && ( */}
//                     <div
//   className={`transition-all duration-300 ease-in-out overflow-hidden
//     ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
//   `}
// >
//                       <div>
//                         {/* Column headers */}
//                         <div
//                           className="grid gap-2 px-3.5 py-2 bg-slate-50 border-t border-b border-slate-100"
//                           style={{ gridTemplateColumns: "160px 1fr 52px 52px" }}
//                         >
//                           {[
//                             { label: "Role tier",            center: false },
//                             { label: "Permissions included", center: false },
//                             { label: "DB",                   center: true  },
//                             { label: "KC",                   center: true  },
//                           ].map(({ label, center }) => (
//                             <div
//                               key={label}
//                               className={`text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1
//                                 ${center ? "justify-center" : "justify-start"}`}
//                             >
//                               {label}
//                               {(label === "DB" || label === "KC") && <Info size={9} className="text-slate-300" />}
//                             </div>
//                           ))}
//                         </div>

//                         {/* Rows */}
//                         {subEntries.map(([subKey, role], idx) => {
//                           const cKey     = compositeKey(svcName, subKey);
//                           const isDbOn   = dbChecked.has(cKey);
//                           const isKcOn   = kcChecked.has(cKey);
//                           const subLabel = parseSubRoleKey(subKey);
//                           const subMeta  = SUB_ROLE_LABELS[subLabel];

//                           return (
//                             <div
//                               key={subKey}
//                               className={`grid gap-2 items-start px-3.5 py-3 bg-white hover:bg-slate-50 transition-colors
//                                 ${idx < subEntries.length - 1 ? "border-b border-slate-100" : ""}`}
//                               style={{ gridTemplateColumns: "160px 1fr 52px 52px" }}
//                             >
//                               {/* Role tier + db_role */}
//                               <div>
//                                 <div className="text-xs font-semibold text-[#0B0E2D]">
//                                   {subMeta?.label ?? subLabel}
//                                 </div>
//                                 {subMeta?.desc && (
//                                   <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
//                                     {subMeta.desc}
//                                   </div>
//                                 )}
//                                 <div className="text-[9px] text-slate-400 font-mono mt-1 truncate" title={role.db_role}>
//                                   {role.db_role}
//                                 </div>
//                               </div>

//                               {/* All permissions — no truncation */}
//                               <div className="flex flex-wrap gap-1 pt-0.5">
//                                 {role.permissions.length === 0 ? (
//                                   <span className="text-[10px] text-slate-300 italic">No permissions</span>
//                                 ) : (
//                                   role.permissions.map((p) => <PermissionPill key={p} perm={p} />)
//                                 )}
//                               </div>

//                               {/* DB — always disabled */}
//                               <div className="flex items-center justify-center pt-0.5">
//                                 <DbCheckbox checked={isDbOn} />
//                               </div>

//                               {/* KC — editable */}
//                               <div className="flex items-center justify-center pt-0.5">
//                                 <KcCheckbox checked={isKcOn} onChange={() => toggleKc(cKey)} />
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>

//                       </div>
//                     {/* )} */}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-slate-100 px-5 py-3.5 flex flex-col gap-2.5 flex-shrink-0">
//           {saveSuccess && (
//             <div className="ram-pop flex items-center justify-center gap-1.5 px-3.5 py-2.5
//               bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700">
//               <CheckCircle size={13} />
//               Roles saved successfully — changes will apply on the user's next login.
//             </div>
//           )}
//           {saveError && (
//             <div className="flex items-center justify-center gap-1.5 px-3.5 py-2.5
//               bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600">
//               <XCircle size={13} /> {saveError}
//             </div>
//           )}

//           <p className="m-0 text-[11px] text-slate-400 text-center">
//             Only <strong>KC</strong> can be toggled here. DB access is read-only and managed separately.
//           </p>

//           <div className="flex gap-2">
//             <button
//               onClick={onClose}
//               className="flex-1 py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-100
//                 text-xs font-semibold text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className={`flex-1 py-2.5 px-3.5 rounded-xl border border-[#0B0E2D] bg-[#0B0E2D]
//                 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all
//                 ${isSaving ? "opacity-60 cursor-not-allowed" : "hover:bg-[#181C4A] hover:shadow-lg hover:-translate-y-px cursor-pointer"}`}
//             >
//               {isSaving
//                 ? <><Loader2 size={13} className="ram-spin" /> Saving…</>
//                 : <><Save size={13} /> Save KC Changes</>
//               }
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RoleAuditModal;



import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  X, CheckCircle, XCircle, Loader2, Save, Shield,
  User, ChevronDown, ChevronRight, Info,
  Plane, Hotel, Bus, Train, Car, Utensils, Droplets
} from "lucide-react";
import type { RoleAuditResponse, ServicesMap } from "../types/userImport.types";

// ─── helpers ──────────────────────────────────────────────────────────────────

const SERVICE_META: Record<string, { label: string; icon: React.ReactNode; color: string; activeBg: string; activeBorder: string; activeText: string; badgeBg: string }> = {
  flight:      { label: "Flight",       icon: <Plane size={13} />,     color: "#185FA5", activeBg: "bg-blue-50",   activeBorder: "border-blue-300",  activeText: "text-blue-700",  badgeBg: "bg-blue-600"   },
  hotel:       { label: "Hotel",        icon: <Hotel size={13} />,     color: "#3B6D11", activeBg: "bg-green-50",  activeBorder: "border-green-300", activeText: "text-green-700", badgeBg: "bg-green-600"  },
  bus:         { label: "Bus",          icon: <Bus size={13} />,       color: "#854F0B", activeBg: "bg-amber-50",  activeBorder: "border-amber-300", activeText: "text-amber-700", badgeBg: "bg-amber-600"  },
  train:       { label: "Train",        icon: <Train size={13} />,     color: "#534AB7", activeBg: "bg-violet-50", activeBorder: "border-violet-300",activeText: "text-violet-700",badgeBg: "bg-violet-600" },
  taxi:        { label: "Taxi",         icon: <Car size={13} />,       color: "#993556", activeBg: "bg-rose-50",   activeBorder: "border-rose-300",  activeText: "text-rose-700",  badgeBg: "bg-rose-600"   },
  meals:       { label: "Meals",        icon: <Utensils size={13} />,  color: "#A32D2D", activeBg: "bg-red-50",    activeBorder: "border-red-300",   activeText: "text-red-700",   badgeBg: "bg-red-600"    },
  waterbottle: { label: "Water Bottle", icon: <Droplets size={13} />,  color: "#0F6E56", activeBg: "bg-teal-50",   activeBorder: "border-teal-300",  activeText: "text-teal-700",  badgeBg: "bg-teal-600"   },
};

const SUB_ROLE_LABELS: Record<string, { label: string; desc: string }> = {
  basic:   { label: "Basic",   desc: "Core booking operations (create, accept, reject, assign)" },
  billing: { label: "Billing", desc: "Billing actions like validate, payment, and create bills" },
  invoice: { label: "Invoice", desc: "Invoice creation, validation, and payment approval" },
  admin:   { label: "Admin",   desc: "Full access — all permissions combined" },
};

function compositeKey(service: string, subRole: string) {
  return `${service}::${subRole}`;
}

function parseSubRoleKey(key: string): string {
  const parts = key.split("-");
  return parts[parts.length - 1];
}

function isServiceActive(serviceRoles: Record<string, { db_value: number }>) {
  return Object.values(serviceRoles).some((r) => r.db_value === 1);
}

// check if all non-admin sub-roles of a service are KC checked
function shouldAdminBeChecked(svcName: string, subRoles: Record<string, any>, kcChecked: Set<string>): boolean {
  const nonAdminKeys = Object.keys(subRoles).filter((k) => parseSubRoleKey(k) !== "admin");
  if (nonAdminKeys.length === 0) return false;
  return nonAdminKeys.every((k) => kcChecked.has(compositeKey(svcName, k)));
}

// ─── types ────────────────────────────────────────────────────────────────────

type CheckedState = Set<string>;

type Props = {
  username: string;
  keycloakUserId: string;
  firstName: string;
  lastName: string;
  onClose: () => void;
};

// ─── sub-components ───────────────────────────────────────────────────────────

function PermissionChip({ perm, value }: { perm: string; value: number }) {
  const isOn = value === 1;
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border select-none cursor-default
        ${isOn
          ? "bg-blue-50 border-blue-300 text-blue-700"
          : "bg-stone-100 border-stone-200 text-stone-400"
        }`}
    >
      <div
        className={`w-[10px] h-[10px] rounded-[3px] flex items-center justify-center flex-shrink-0 border
          ${isOn ? "bg-blue-500 border-blue-500" : "bg-white border-stone-300"}`}
      >
        {isOn && (
          <svg width="6" height="6" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {perm}
    </div>
  );
}

// function KcCheckbox({ checked, onChange,}: { checked: boolean; onChange: () => void;}) {
//   return (
//     <div
//       onClick={disabled ? undefined : onChange}
//       className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all duration-150 flex-shrink-0
//         ${disabled
//           ? "cursor-not-allowed opacity-40 bg-slate-100 border-[1.5px] border-slate-200"
//           : checked
//             ? "cursor-pointer bg-blue-50 border-[1.5px] border-blue-500"
//             : "cursor-pointer bg-slate-50 border-[1.5px] border-slate-300 hover:border-blue-300"
//         }`}
//     >
//       {checked && (
//         <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
//           stroke={disabled ? "#94a3b8" : "#378ADD"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 13l4 4L19 7" />
//         </svg>
//       )}
//     </div>
//   );
// }

function KcCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center cursor-pointer transition-all duration-150 flex-shrink-0
        ${checked
          ? "bg-blue-50 border-[1.5px] border-blue-500"
          : "bg-slate-50 border-[1.5px] border-slate-300 hover:border-blue-300"
        }`}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
          stroke="#378ADD" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}

function DbCheckbox({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 cursor-not-allowed
        ${checked
          ? "bg-green-50 border-[1.5px] border-green-400"
          : "bg-slate-100 border-[1.5px] border-slate-200"
        }`}
      title="DB access is managed externally and cannot be changed here"
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
          stroke="#639922" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const RoleAuditModal = ({ username, keycloakUserId, firstName, lastName, onClose }: Props) => {
  const [services, setServices]           = useState<ServicesMap>({});
  const [dbChecked, setDbChecked]         = useState<CheckedState>(new Set());
  const [kcChecked, setKcChecked]         = useState<CheckedState>(new Set());
  const [expanded, setExpanded]           = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading]         = useState(true);
  const [isSaving, setIsSaving]           = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [saveError, setSaveError]         = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess]     = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<RoleAuditResponse>(
          "/api/user_management/getUserRolesAudit",
          { params: { keycloak_id: keycloakUserId } }
        );
        const svc = data.services ?? {};
        setServices(svc);

        const dbSet: CheckedState = new Set();
        const kcSet: CheckedState = new Set();
        const exp: Set<string>    = new Set();

        Object.entries(svc).forEach(([svcName, subRoles]) => {
          Object.entries(subRoles).forEach(([subKey, role]) => {
            const key = compositeKey(svcName, subKey);
            if (role.db_value === 1)             dbSet.add(key);
            if (role.assigned_in_keycloak === 1) kcSet.add(key);
          });
        });

        setDbChecked(dbSet);
        setKcChecked(kcSet);
        setExpanded(exp);
      } catch (err) {
        setError((err as AxiosError).message || "Failed to fetch roles");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keycloakUserId]);

  const toggleKc = (svcName: string, subKey: string) => {
    // const subLabel = parseSubRoleKey(subKey);

    // admin cannot be manually toggled
    // if (subLabel === "admin") return;

    setKcChecked((prev) => {
      const n = new Set(prev);
      const key = compositeKey(svcName, subKey);

      if (n.has(key)) {
        n.delete(key);
      } else {
        n.add(key);
      }

      // recalculate admin for this service
      // const subRoles = services[svcName] ?? {};
      // const adminKey = Object.keys(subRoles).find((k) => parseSubRoleKey(k) === "admin");
      // if (adminKey) {
      //   const adminComposite = compositeKey(svcName, adminKey);
      //   const nonAdminKeys = Object.keys(subRoles).filter((k) => parseSubRoleKey(k) !== "admin");
      //   const allChecked = nonAdminKeys.every((k) => n.has(compositeKey(svcName, k)));
      //   if (allChecked) {
      //     n.add(adminComposite);
      //   } else {
      //     n.delete(adminComposite);
      //   }
      // }

      return n;
    });

    setSaveSuccess(false);
  };

  const toggleExpand = (svc: string) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(svc)) n.delete(svc); else n.add(svc);
      return n;
    });
  };

  // const handleSave = async () => {
  //   setIsSaving(true);
  //   setSaveError(null);
  //   setSaveSuccess(false);

  //   try {
  //     const roles: Record<string, Record<string, Record<string, number>>> = {};

  //     Object.entries(services).forEach(([svcName, subRoles]) => {
  //       const moduleKey = svcName.toLowerCase();
  //       const moduleRoles: Record<string, Record<string, number>> = {};

  //       Object.entries(subRoles).forEach(([subKey, role]) => {
  //         const cKey     = compositeKey(svcName, subKey);
  //         const isKcOn   = kcChecked.has(cKey);
  //         const subLabel = parseSubRoleKey(subKey);
  //         const roleKey  = `${moduleKey}-${subLabel}`;

  //         // if KC unchecked → all permissions 0
  //         // if KC checked → use values from API response
  //         const permMap: Record<string, number> = {};
  //         Object.entries(role.permissions).forEach(([perm, val]) => {
  //           permMap[perm] = isKcOn ? val : 0;
  //         });

  //         moduleRoles[roleKey] = permMap;
  //       });

  //       roles[moduleKey] = moduleRoles;
  //     });

  //     await axios.post("/api/user_management/assignRoleToUserKeycloak", {
  //       keycloak_id: keycloakUserId,
  //       roles,
  //     });

  //     setSaveSuccess(true);
  //     setTimeout(() => onClose(), 1500);
  //   } catch (err) {
  //     setSaveError((err as AxiosError).message || "Failed to save roles");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

//   const handleSave = async () => {
//   setIsSaving(true);
//   setSaveError(null);
//   setSaveSuccess(false);

//   try {
//     const roles: Record<string, Record<string, Record<string, number>>> = {};

//     Object.entries(services).forEach(([svcName, subRoles]) => {
//       const moduleKey = svcName.toLowerCase();
//       const moduleRoles: Record<string, Record<string, number>> = {};

//       Object.entries(subRoles).forEach(([subKey, role]) => {
//         const cKey     = compositeKey(svcName, subKey);
//         const isKcOn   = kcChecked.has(cKey);
//         const subLabel = parseSubRoleKey(subKey);
//         const roleKey  = `${moduleKey}-${subLabel}`;

//         const permMap: Record<string, number> = {};
//         Object.keys(role.permissions).forEach((perm) => {
//           // KC checked → all permissions 1, KC unchecked → all permissions 0
//           permMap[perm] = isKcOn ? 1 : 0;
//         });

//         moduleRoles[roleKey] = permMap;
//       });

//       roles[moduleKey] = moduleRoles;
//     });
//     console.log(JSON.stringify(roles, null, 2));
//     await axios.post("/api/user_management/assignRoleToUserKeycloak", {
//       keycloak_id: keycloakUserId,
//       roles,
//     });

//     setSaveSuccess(true);
//     setTimeout(() => onClose(), 1500);
//   } catch (err) {
//     setSaveError((err as AxiosError).message || "Failed to save roles");
//   } finally {
//     setIsSaving(false);
//   }
// };


const handleSave = async () => {
  setIsSaving(true);
  setSaveError(null);
  setSaveSuccess(false);

  try {
    const roles: Record<string, Record<string, Record<string, number>>> = {};

    Object.entries(services).forEach(([svcName, subRoles]) => {
      const moduleKey = svcName.toLowerCase();
      const moduleRoles: Record<string, Record<string, number>> = {};

      // pre-calculate if admin should be on for this service
      const nonAdminKeys = Object.keys(subRoles).filter((k) => parseSubRoleKey(k) !== "admin");
      const allNonAdminChecked = nonAdminKeys.length > 0 && nonAdminKeys.every((k) => kcChecked.has(compositeKey(svcName, k)));

      Object.entries(subRoles).forEach(([subKey, role]) => {
        // const cKey     = compositeKey(svcName, subKey);
        const subLabel = parseSubRoleKey(subKey);
        const roleKey  = `${moduleKey}-${subLabel}`;

        // for admin: use derived allNonAdminChecked, for others: use kcChecked
        // const isKcOn = subLabel === "admin" ? allNonAdminChecked : kcChecked.has(cKey);

        const permMap: Record<string, number> = {};
        // Object.keys(role.permissions).forEach((perm) => {
        //   permMap[perm] = isKcOn ? 1 : 0;
        // });

        moduleRoles[roleKey] = permMap;
      });

      roles[moduleKey] = moduleRoles;
    });

    console.log(JSON.stringify(roles, null, 2));

    await axios.post("/api/user_management/assignRoleToUserKeycloak", {
      keycloak_id: keycloakUserId,
      roles,
    });

    setSaveSuccess(true);
    setTimeout(() => onClose(), 1500);
  } catch (err) {
    setSaveError((err as AxiosError).message || "Failed to save roles");
  } finally {
    setIsSaving(false);
  }
};

  const activeServices   = Object.entries(services).filter(([, sr]) => isServiceActive(sr)).length;
  const inactiveServices = Object.keys(services).length - activeServices;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || username;

  return (
    <>
      <style>{`
        @keyframes ramFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ramSlideUp {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ram-modal    { animation: ramSlideUp .25s cubic-bezier(.16,1,.3,1); }
        @keyframes spin  { to { transform: rotate(360deg) } }
        @keyframes popIn { from { opacity: 0; transform: scale(.95) } to { opacity: 1; transform: scale(1) } }
        .ram-backdrop { animation: ramFadeIn .2s ease }
        .ram-spin     { animation: spin 0.8s linear infinite }
        .ram-pop      { animation: popIn .25s cubic-bezier(.16,1,.3,1) }
        .ram-scroll::-webkit-scrollbar       { width: 4px }
        .ram-scroll::-webkit-scrollbar-track { background: transparent }
        .ram-scroll::-webkit-scrollbar-thumb { background: #C7C9E0; border-radius: 99px }
      `}</style>

      {/* Backdrop */}
      <div
        className="ram-backdrop fixed inset-0 z-50 bg-[rgba(11,14,45,0.55)] backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="ram-modal fixed left-1/2 top-1/2 z-[51] w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2
        flex flex-col max-h-[90vh] bg-white rounded-2xl border border-slate-200
        shadow-[0_8px_40px_rgba(11,14,45,.18)]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
              <Shield size={16} className="text-[#0B0E2D]" />
            </div>
            <div>
              <h2 className="m-0 text-sm font-semibold text-[#0B0E2D]">Role Assignment</h2>
              <p className="mt-0.5 text-[11px] text-slate-400 font-mono">{username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-[#0B0E2D]">
              <User size={12} /> {fullName}
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center cursor-pointer text-slate-400 hover:bg-slate-50 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="mx-5 mt-3.5 px-3.5 py-2.5 bg-blue-50 border border-blue-200 rounded-xl flex gap-2.5 items-start flex-shrink-0">
          <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="m-0 text-xs text-blue-600 leading-relaxed">
            Toggle <strong>KC</strong> to grant or revoke Keycloak access per sub-role.{" "}
            <strong>Admin</strong> is automatically granted when all other sub-roles are active.{" "}
            <strong>DB</strong> is read-only and managed externally.
          </p>
        </div>

        {/* Summary bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 flex-shrink-0">
          <span className="text-[11px] text-slate-400">Services:</span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-300 rounded-full text-[11px] font-semibold text-green-700">
            <CheckCircle size={10} /> {activeServices} active
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 border border-stone-300 rounded-full text-[11px] font-semibold text-stone-500">
            <XCircle size={10} /> {inactiveServices} inactive
          </span>
          <div className="ml-auto flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 select-none">
              <span className="w-2.5 h-2.5 rounded-[3px] bg-green-50 border border-green-400 inline-block" />
              DB = Database (read-only)
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 select-none">
              <span className="w-2.5 h-2.5 rounded-[3px] bg-blue-50 border border-blue-400 inline-block" />
              KC = Keycloak access
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="ram-scroll overflow-y-auto px-5 pb-4 flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2.5 py-16 text-slate-400 text-sm">
              <Loader2 size={16} className="ram-spin text-[#0B0E2D]" />
              Loading services and roles…
            </div>
          ) : error ? (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600 font-mono">
              {error}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {Object.entries(services).map(([svcName, subRoles]) => {
                const meta       = SERVICE_META[svcName];
                const active     = isServiceActive(subRoles);
                const isOpen     = expanded.has(svcName);
                const subEntries = Object.entries(subRoles);
                const kcCount    = subEntries.filter(([k]) => kcChecked.has(compositeKey(svcName, k))).length;

                return (
                  <div
                    key={svcName}
                    className={`border rounded-xl overflow-hidden ${active ? (meta?.activeBorder ?? "border-slate-300") : "border-slate-200"}`}
                  >
                    {/* Service header */}
                    <div
                      onClick={() => toggleExpand(svcName)}
                      className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors
                        ${active ? `${meta?.activeBg ?? "bg-slate-50"} hover:brightness-95` : "bg-slate-50 hover:bg-slate-100"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span style={{ color: active ? meta?.color : "#9ca3af" }} className="flex">
                          {meta?.icon}
                        </span>
                        <span className={`text-[13px] font-semibold ${active ? (meta?.activeText ?? "text-slate-700") : "text-slate-400"}`}>
                          {meta?.label ?? svcName}
                        </span>
                        {active ? (
                          <span className={`px-2 py-0.5 ${meta?.badgeBg ?? "bg-slate-600"} rounded-full text-[10px] font-semibold text-white`}>
                            Access granted
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-200 rounded-full text-[10px] text-slate-500">
                            No DB access
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${active ? (meta?.activeText ?? "text-slate-500") : "text-slate-400"}`}>
                          {kcCount}/{subEntries.length} KC assigned
                        </span>
                        {isOpen
                          ? <ChevronDown size={14} className="text-slate-400" />
                          : <ChevronRight size={14} className="text-slate-400" />
                        }
                      </div>
                    </div>

                    {/* Sub-roles table */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden
                        ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div>
                        {/* Column headers */}
                        <div
                          className="grid gap-2 px-3.5 py-2 bg-slate-50 border-t border-b border-slate-100"
                          style={{ gridTemplateColumns: "160px 1fr 52px 52px" }}
                        >
                          {[
                            { label: "Role tier",            center: false },
                            { label: "Permissions included", center: false },
                            { label: "DB",                   center: true  },
                            { label: "KC",                   center: true  },
                          ].map(({ label, center }) => (
                            <div
                              key={label}
                              className={`text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1
                                ${center ? "justify-center" : "justify-start"}`}
                            >
                              {label}
                              {(label === "DB" || label === "KC") && <Info size={9} className="text-slate-300" />}
                            </div>
                          ))}
                        </div>

                        {/* Rows */}
                        {subEntries.map(([subKey, role], idx) => {
                          const cKey     = compositeKey(svcName, subKey);
                          const isDbOn   = dbChecked.has(cKey);
                          const isKcOn   = kcChecked.has(cKey);
                          const subLabel = parseSubRoleKey(subKey);
                          const subMeta  = SUB_ROLE_LABELS[subLabel];
                          const isAdmin  = subLabel === "admin";

                          return (
                            <div
                              key={subKey}
                              className={`grid gap-2 items-start px-3.5 py-3 transition-colors
                                ${isAdmin ? "bg-slate-50" : "bg-white hover:bg-slate-50"}
                                ${idx < subEntries.length - 1 ? "border-b border-slate-100" : ""}`}
                              style={{ gridTemplateColumns: "160px 1fr 52px 52px" }}
                            >
                              {/* Role tier + db_role */}
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <div className="text-xs font-semibold text-[#0B0E2D]">
                                    {subMeta?.label ?? subLabel}
                                  </div>
                                  {isAdmin && (
                                    <span className="px-1.5 py-0.5 bg-violet-100 border border-violet-200 rounded text-[9px] font-semibold text-violet-600">
                                      auto
                                    </span>
                                  )}
                                </div>
                                {subMeta?.desc && (
                                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                    {subMeta.desc}
                                  </div>
                                )}
                                <div className="text-[9px] text-slate-400 font-mono mt-1 truncate" title={role.db_role}>
                                  {role.db_role}
                                </div>
                              </div>

                              {/* Permissions — display only, reflects KC state */}
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {Object.keys(role.permissions).length === 0 ? (
                                  <span className="text-[10px] text-slate-300 italic">No permissions</span>
                                ) : (
                                  Object.entries(role.permissions).map(([perm]) => (
                                    <PermissionChip
                                      key={perm}
                                      perm={perm}
                                      value={isKcOn ? 1 : 0}
                                    />
                                  ))
                                )}
                              </div>

                              {/* DB — always disabled */}
                              <div className="flex items-center justify-center pt-0.5">
                                <DbCheckbox checked={isDbOn} />
                              </div>

                              {/* KC — admin is disabled (auto), others are toggleable */}
                              <div className="flex items-center justify-center pt-0.5">
                                <KcCheckbox
                                  checked={isKcOn}
                                  onChange={() => toggleKc(svcName, subKey)}
                                  // disabled={isAdmin}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-5 py-3.5 flex flex-col gap-2.5 flex-shrink-0">
          {saveSuccess && (
            <div className="ram-pop flex items-center justify-center gap-1.5 px-3.5 py-2.5
              bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700">
              <CheckCircle size={13} />
              Roles saved successfully — changes will apply on the user's next login.
            </div>
          )}
          {saveError && (
            <div className="flex items-center justify-center gap-1.5 px-3.5 py-2.5
              bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600">
              <XCircle size={13} /> {saveError}
            </div>
          )}

          <p className="m-0 text-[11px] text-slate-400 text-center">
            Toggle <strong>KC</strong> to grant or revoke access. <strong>Admin</strong> is auto-assigned when all sub-roles are active.
          </p>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-100
                text-xs font-semibold text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex-1 py-2.5 px-3.5 rounded-xl border border-[#0B0E2D] bg-[#0B0E2D]
                text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all
                ${isSaving ? "opacity-60 cursor-not-allowed" : "hover:bg-[#181C4A] hover:shadow-lg hover:-translate-y-px cursor-pointer"}`}
            >
              {isSaving
                ? <><Loader2 size={13} className="ram-spin" /> Saving…</>
                : <><Save size={13} /> Save KC Changes</>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleAuditModal;