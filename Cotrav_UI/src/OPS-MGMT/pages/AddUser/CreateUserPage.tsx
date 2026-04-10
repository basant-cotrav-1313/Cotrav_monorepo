// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import {
//   ShieldCheck, Check, Loader2, Save, ArrowLeft,
//   Car, Plane, Hotel, Bus, TrainFront, CreditCard,
//   UtensilsCrossed, Settings2, Droplets, Lock, Receipt,
//   LayoutGrid, Crown, ChevronRight, CheckCircle, XCircle, AlertCircle,
//   User, FileText,
// } from "lucide-react";
// import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

// // ── Types ─────────────────────────────────────────────────────────────────────

// type SubRole   = "Basic" | "Billing" | "Invoice" | "Admin";
// type SRState   = "none" | "some" | "all";

// type FormData = {
//   firstName: string;
//   lastName:  string;
//   username:  string;
//   email:     string;
//   phone:     string;
// };

// type FormErrors = Partial<Record<keyof FormData, string>>;

// // ── Design tokens ─────────────────────────────────────────────────────────────

// const brand      = "#0B0E2D";
// const brandLight = "#E8E9F3";
// const brandMid   = "#C7C9E0";
// const brandFaint = "#F4F5FB";

// // ── Permissions data ──────────────────────────────────────────────────────────

// const MODULES_DATA: Record<string, Record<SubRole, string[]>> = {
//   Flight:      { Basic: ["flight.book","flight.accept","flight.assign","flight.reject","flight.create"], Billing: ["flight.bill.create","flight.bill.payment","flight.bill.validate","flight.bill.validateACC"], Invoice: ["flight.inv.create","flight.inv.validate","flight.inv.payment.validate","flight.pro-inv.create"], Admin: [] },
//   Hotel:       { Basic: ["hotel.book","hotel.accept","hotel.assign","hotel.reject","hotel.create"],     Billing: ["hotel.bill.create","hotel.bill.payment","hotel.bill.validate","hotel.bill.validateACC"],   Invoice: ["hotel.inv.create","hotel.inv.validate","hotel.inv.payment.validate","hotel.pro-inv.create"],   Admin: [] },
//   Bus:         { Basic: ["bus.book","bus.accept","bus.assign","bus.reject","bus.create"],               Billing: ["bus.bill.create","bus.bill.payment","bus.bill.validate","bus.bill.validateACC"],             Invoice: ["bus.inv.create","bus.inv.validate","bus.inv.payment.validate","bus.pro-inv.create"],             Admin: [] },
//   Train:       { Basic: ["train.book","train.accept","train.assign","train.reject","train.create"],     Billing: ["train.bill.create","train.bill.payment","train.bill.validate","train.bill.validateACC"],     Invoice: ["train.inv.create","train.inv.validate","train.inv.payment.validate","train.pro-inv.create"],     Admin: [] },
//   Taxi:        { Basic: ["taxi.book","taxi.accept","taxi.assign","taxi.reject","taxi.create"],           Billing: ["taxi.bill.create","taxi.bill.payment","taxi.bill.validate","taxi.bill.validateACC"],         Invoice: ["taxi.inv.create","taxi.inv.validate","taxi.inv.payment.validate","taxi.pro-inv.create"],         Admin: [] },
//   Meals:       { Basic: ["meals.book","meals.accept","meals.assign","meals.reject","meals.create"],     Billing: ["meals.bill.create","meals.bill.payment","meals.bill.validate","meals.bill.validateACC"],     Invoice: ["meals.inv.create","meals.inv.validate","meals.inv.payment.validate","meals.pro-inv.create"],     Admin: [] },
//   Visa:        { Basic: ["visa.book","visa.accept","visa.assign","visa.reject","visa.create"],           Billing: ["visa.bill.create","visa.bill.payment","visa.bill.validate","visa.bill.validateACC"],         Invoice: ["visa.inv.create","visa.inv.validate","visa.inv.payment.validate","visa.pro-inv.create"],         Admin: [] },
//   Operator:    { Basic: ["operator.book","operator.accept","operator.assign","operator.reject","operator.create"], Billing: ["operator.bill.create","operator.bill.payment","operator.bill.validate","operator.bill.validateACC"], Invoice: ["operator.inv.create","operator.inv.validate","operator.inv.payment.validate","operator.pro-inv.create"], Admin: [] },
//   Waterbottle: { Basic: ["waterbottle.book","waterbottle.accept","waterbottle.assign","waterbottle.reject","waterbottle.create"], Billing: ["waterbottle.bill.create","waterbottle.bill.payment","waterbottle.bill.validate","waterbottle.bill.validateACC"], Invoice: ["waterbottle.inv.create","waterbottle.inv.validate","waterbottle.inv.payment.validate","waterbottle.pro-inv.create"], Admin: [] },
// };

// const MODULE_ICON: Record<string, React.ReactNode> = {
//   Flight: <Plane size={15} />, Hotel: <Hotel size={15} />, Bus: <Bus size={15} />,
//   Train: <TrainFront size={15} />, Taxi: <Car size={15} />, Meals: <UtensilsCrossed size={15} />,
//   Visa: <CreditCard size={15} />, Operator: <Settings2 size={15} />, Waterbottle: <Droplets size={15} />,
// };

// type SRConfig = { bg: string; text: string; border: string; dot: string; icon: React.ReactNode };
// const SUB_ROLES: SubRole[] = ["Basic", "Billing", "Invoice", "Admin"];
// const SR: Record<SubRole, SRConfig> = {
//   Basic:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#2563EB", icon: <Lock       size={12} /> },
//   Billing: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA", dot: "#EA580C", icon: <CreditCard size={12} /> },
//   Invoice: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0", dot: "#16A34A", icon: <Receipt    size={12} /> },
//   Admin:   { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF", dot: "#9333EA", icon: <Crown      size={12} /> },
// };

// // ── Helpers ───────────────────────────────────────────────────────────────────

// function fmt(p: string) {
//   return p.split(".").slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
// }

// function getSRState(checked: Set<string>, perms: string[]): SRState {
//   const n = perms.filter(p => checked.has(p)).length;
//   if (n === 0) return "none";
//   if (n === perms.length) return "all";
//   return "some";
// }

// // ── Floating label input ──────────────────────────────────────────────────────

// function FloatInput({
//   id, label, value, onChange, error, type = "text", autoComplete = "off",
// }: {
//   id: string; label: string; value: string;
//   onChange: (v: string) => void;
//   error?: string; type?: string; autoComplete?: string;
// }) {
//   return (
//     <div style={{ position: "relative", marginBottom: error ? "6px" : "22px" }}>
//       <input
//         id={id}
//         type={type}
//         autoComplete={autoComplete}
//         required
//         value={value}
//         onChange={e => onChange(e.target.value)}
//         style={{
//           width: "100%", fontSize: "14px", padding: "14px 16px",
//           outline: "none", border: `2px solid ${error ? "#FCA5A5" : value ? brand : "#C7C9E0"}`,
//           background: "transparent", borderRadius: "14px",
//           color: brand, fontFamily: "'Plus Jakarta Sans', sans-serif",
//           transition: "border-color 0.2s",
//           boxSizing: "border-box",
//         }}
//       />
//       <label
//         htmlFor={id}
//         style={{
//           position: "absolute", left: 0,
//           padding: value ? "0 6px" : "14px 16px",
//           marginLeft: value ? "10px" : "0",
//           top: value ? 0 : "auto",
//           transform: value ? "translateY(-50%)" : "none",
//           pointerEvents: "none",
//           transition: "all 0.25s ease",
//           fontSize: value ? "11px" : "14px",
//           fontWeight: value ? 600 : 400,
//           color: value ? brand : "#9CA3AF",
//           background: value ? "#fff" : "transparent",
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//         }}
//       >
//         {label}
//       </label>
//       {error && (
//         <p style={{ margin: "4px 0 14px 4px", fontSize: "11px", color: "#EF4444", display: "flex", alignItems: "center", gap: "4px" }}>
//           <AlertCircle size={11} /> {error}
//         </p>
//       )}
//     </div>
//   );
// }

// // ── Checkbox ──────────────────────────────────────────────────────────────────

// function Checkbox({ state, dotColor, bgColor, onClick }: {
//   state: SRState | boolean; dotColor: string; bgColor: string;
//   onClick?: (e: React.MouseEvent) => void;
// }) {
//   const checked      = state === true || state === "all";
//   const indeterminate = state === "some";
//   return (
//     <div onClick={onClick} style={{
//       width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
//       border: `1.5px solid ${checked || indeterminate ? dotColor : brandMid}`,
//       background: checked ? dotColor : indeterminate ? bgColor : "#fff",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       cursor: "pointer", transition: "all 0.15s",
//     }}>
//       {checked && (
//         <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 13l4 4L19 7" />
//         </svg>
//       )}
//       {indeterminate && <div style={{ width: "8px", height: "2px", background: dotColor, borderRadius: "1px" }} />}
//     </div>
//   );
// }

// // ── Step indicator ────────────────────────────────────────────────────────────

// function StepIndicator({ current }: { current: number }) {
//   const steps = [
//     { n: 1, label: "User details",  icon: <User size={14} /> },
//     { n: 2, label: "Permissions",   icon: <ShieldCheck size={14} /> },
//     { n: 3, label: "Review",        icon: <FileText size={14} /> },
//   ];
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
//       {steps.map((s, i) => (
//         <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <div style={{
//               width: "36px", height: "36px", borderRadius: "50%",
//               background: s.n < current ? "#10B981" : s.n === current ? brand : brandFaint,
//               border: `2px solid ${s.n < current ? "#10B981" : s.n === current ? brand : brandMid}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               color: s.n <= current ? "#fff" : "#9CA3AF",
//               transition: "all 0.3s",
//             }}>
//               {s.n < current ? <Check size={15} /> : s.icon}
//             </div>
//             <div>
//               <p style={{ margin: 0, fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
//                 Step {s.n}
//               </p>
//               <p style={{ margin: 0, fontSize: "13px", fontWeight: s.n === current ? 700 : 500, color: s.n <= current ? brand : "#9CA3AF", transition: "color 0.3s" }}>
//                 {s.label}
//               </p>
//             </div>
//           </div>
//           {i < steps.length - 1 && (
//             <div style={{ width: "60px", height: "2px", margin: "0 12px", background: current > s.n ? "#10B981" : brandMid, borderRadius: 99, transition: "background 0.3s" }} />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── Main page ─────────────────────────────────────────────────────────────────

// const CreateUserPage = ({ onBack }: { onBack?: () => void }) => {
//   const [step, setStep] = useState(1);

//   // Form state
//   const [form, setForm] = useState<FormData>({ firstName: "", lastName: "", username: "", email: "", phone: "" });
//   const [errors, setErrors] = useState<FormErrors>({});

//   // Permissions state
//   const [checkedPerms, setCheckedPerms] = useState<Set<string>>(new Set());
//   const [selectedModule, setSelectedModule] = useState("Flight");
//   const [activeTab, setActiveTab] = useState<SubRole>("Basic");

//   // Save state
//   const [isSaving,    setIsSaving]    = useState(false);
//   const [saveError,   setSaveError]   = useState<string | null>(null);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   const setField = (k: keyof FormData) => (v: string) => {
//     setForm(f => ({ ...f, [k]: v }));
//     setErrors(e => ({ ...e, [k]: undefined }));
//   };

//   // ── Validation ─────────────────────────────────────────────────────────────
//   const validate = (): boolean => {
//     const e: FormErrors = {};
//     if (!form.firstName.trim())  e.firstName = "First name is required";
//     if (!form.lastName.trim())   e.lastName  = "Last name is required";
//     if (!form.username.trim())   e.username  = "Username is required";
//     // else if (!/^[a-zA-Z0-9._-]{3,}$/.test(form.username))
//     //   e.username = "Min 3 chars, letters/numbers/._- only";
//     else if (!/^[a-zA-Z0-9._@+-]{3,}$/.test(form.username))
//   e.username = "Min 3 chars";
//     if (!form.email.trim())      e.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       e.email = "Enter a valid email address";
//     if (!form.phone.trim())      e.phone = "Phone number is required";
//     else if (!/^[+]?[\d\s\-()]{7,15}$/.test(form.phone))
//       e.phone = "Enter a valid phone number";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = () => {
//     if (step === 1 && !validate()) return;
//     setStep(s => s + 1);
//   };

//   // ── Perm toggles ───────────────────────────────────────────────────────────
//   const togglePerm = (p: string) => {
//     setCheckedPerms(prev => { const n = new Set(prev); n.has(p) ? n.delete(p) : n.add(p); return n; });
//   };

//   const toggleSubRole = (mod: string, sr: SubRole, state: SRState) => {
//     const perms = MODULES_DATA[mod]?.[sr] ?? [];
//     setCheckedPerms(prev => {
//       const n = new Set(prev);
//       state === "all" ? perms.forEach(p => n.delete(p)) : perms.forEach(p => n.add(p));
//       return n;
//     });
//   };

//   // ── Save ───────────────────────────────────────────────────────────────────
//   const handleSave = async () => {
//     setIsSaving(true); setSaveError(null);
//     try {
//       await axios.post("/api/user_management/createUser", {
//         first_name:  form.firstName,
//         last_name:   form.lastName,
//         username:    form.username,
//         email:       form.email,
//         contact_no:  form.phone,
//         permissions: Array.from(checkedPerms),
//       });
//       setSaveSuccess(true);
//     } catch (err) {
//       setSaveError((err as AxiosError).message || "Failed to create user");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // ── Derived ────────────────────────────────────────────────────────────────
//   const modules    = Object.keys(MODULES_DATA);
//   const totalPerms = [...new Set(Object.values(MODULES_DATA).flatMap(m => Object.values(m).flat()))].length;
//   const fullName   = `${form.firstName} ${form.lastName}`.trim();

//   const initials = [form.firstName[0], form.lastName[0]].filter(Boolean).join("").toUpperCase() || "?";

  

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <>

   
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

//         .cup-page * { box-sizing: border-box; }

//         .cup-input-wrap input:focus { border-color: ${brand} !important; }
//         .cup-input-wrap input:focus + label,
//         .cup-input-wrap input:not(:placeholder-shown) + label {
//           transform: translateY(-50%) !important;
//           top: 0 !important;
//           padding: 0 6px !important;
//           margin-left: 10px !important;
//           font-size: 11px !important;
//           font-weight: 600 !important;
//           color: ${brand} !important;
//           background: #fff !important;
//         }

//         .cup-sb-item { transition: all 0.12s; cursor: pointer; }
//         .cup-sb-item:hover:not(.cup-sb-active) { background: #fff !important; }

//         .cup-chip { transition: all 0.12s; cursor: pointer; }
//         .cup-chip:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(11,14,45,0.07); }

//         .cup-tab { transition: all 0.15s; cursor: pointer; }
//         .cup-tab:hover:not(.cup-tab-act) { border-color: ${brandMid} !important; background: ${brandFaint} !important; }

//         .cup-next { transition: all 0.18s; }
//         .cup-next:hover:not(:disabled) { background: #181C4A !important; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(11,14,45,0.25); }
//         .cup-next:active:not(:disabled) { transform: translateY(0); }

//         .cup-back { transition: all 0.15s; }
//         .cup-back:hover { background: ${brandFaint} !important; border-color: ${brandMid} !important; }

//         .cup-scroll::-webkit-scrollbar { width: 3px; }
//         .cup-scroll::-webkit-scrollbar-track { background: transparent; }
//         .cup-scroll::-webkit-scrollbar-thumb { background: ${brandMid}; border-radius: 99px; }

//         @keyframes cup-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//         .cup-animate { animation: cup-fade 0.25s ease forwards; }

//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//  <OpsMainLayout pageTitle="Bus Dashboard" pageSubtitle="Left navigation with action tiles">
//       <div className="cup-page" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh", background: "#F1F3FA", padding: "32px 24px" }}>

//         {/* ── Top bar ── */}
//         <div style={{ maxWidth: "1100px", margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//             {onBack && (
//               <button onClick={onBack} className="cup-back" style={{
//                 display: "flex", alignItems: "center", gap: "6px",
//                 padding: "8px 14px", borderRadius: "10px",
//                 border: `1px solid ${brandMid}`, background: "#fff",
//                 fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer",
//               }}>
//                 <ArrowLeft size={14} /> Back
//               </button>
//             )}
//             <div>
//               <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: brand, letterSpacing: "-0.02em" }}>
//                 Create new user
//               </h1>
//               <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#8B8FA8" }}>
//                 Fill in details, assign permissions, then review before saving
//               </p>
//             </div>
//           </div>

//           {/* Step indicator */}
//           <StepIndicator current={step} />
//         </div>

//         {/* ── Card ── */}
//         <div style={{ maxWidth: "1100px", margin: "0 auto", background: "#fff", borderRadius: "20px", border: `1px solid ${brandMid}`, boxShadow: "0 4px 24px rgba(11,14,45,0.07)", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: "580px" }}>

//           {/* ════ STEP 1 — User details ════ */}
//           {step === 1 && (
//             <div className="cup-animate" style={{ flex: 1, display: "flex" }}>
//               {/* Left decorative panel */}
//               <div style={{ width: "300px", flexShrink: 0, background: brand, padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                 <div>
//                   <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
//                     <User size={24} color="#fff" />
//                   </div>
//                   <h2 style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
//                     User details
//                   </h2>
//                   <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
//                     Enter the basic information for the new user account.
//                   </p>
//                 </div>

//                 {/* Fields summary */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                   {[
//                     { label: "Full name",    value: fullName || "—" },
//                     { label: "Username",     value: form.username || "—" },
//                     { label: "Email",        value: form.email    || "—" },
//                     { label: "Phone",        value: form.phone    || "—" },
//                   ].map(({ label, value }) => (
//                     <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
//                       <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
//                       <span style={{ fontSize: "12px", fontWeight: 600, color: value === "—" ? "rgba(255,255,255,0.25)" : "#fff", fontFamily: value === "—" ? "inherit" : "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right: form */}
//               <div style={{ flex: 1, padding: "40px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                 <div>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
//                     <div className="cup-input-wrap">
//                       <FloatInput id="firstName" label="First name" value={form.firstName} onChange={setField("firstName")} error={errors.firstName} />
//                     </div>
//                     <div className="cup-input-wrap">
//                       <FloatInput id="lastName" label="Last name" value={form.lastName} onChange={setField("lastName")} error={errors.lastName} />
//                     </div>
//                   </div>
//                   <div className="cup-input-wrap">
//                     <FloatInput id="username" label="Username" value={form.username} onChange={setField("username")} error={errors.username} autoComplete="username" />
//                   </div>
//                   <div className="cup-input-wrap">
//                     <FloatInput id="email" label="Email address" value={form.email} onChange={setField("email")} error={errors.email} type="email" autoComplete="email" />
//                   </div>
//                   <div className="cup-input-wrap">
//                     <FloatInput id="phone" label="Phone number" value={form.phone} onChange={setField("phone")} error={errors.phone} type="tel" />
//                   </div>
//                 </div>

//                 <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                   <button onClick={handleNext} className="cup-next" style={{
//                     display: "flex", alignItems: "center", gap: "8px",
//                     padding: "12px 32px", borderRadius: "12px",
//                     background: brand, border: `1px solid ${brand}`,
//                     fontSize: "13px", fontWeight: 700, color: "#fff", cursor: "pointer",
//                   }}>
//                     Next: Permissions <ShieldCheck size={15} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ════ STEP 2 — Permissions ════ */}
//           {step === 2 && (
//             <div className="cup-animate" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
//               {/* Perm header */}
//               <div style={{ padding: "20px 28px 16px", borderBottom: `1px solid ${brandLight}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                   <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                     <ShieldCheck size={20} color="#fff" />
//                   </div>
//                   <div>
//                     <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: brand }}>Assign permissions</p>
//                     <p style={{ margin: "3px 0 0", fontSize: "11px", color: "#8B8FA8" }}>All unchecked by default — select what this user can access</p>
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px", borderRadius: "10px", background: brandFaint, border: `1px solid ${brandLight}` }}>
//                   <div style={{ width: "100px", height: "4px", borderRadius: 99, background: brandMid, overflow: "hidden" }}>
//                     <div style={{ height: "100%", width: `${totalPerms > 0 ? Math.round(checkedPerms.size / totalPerms * 100) : 0}%`, background: brand, borderRadius: 99, transition: "width 0.3s" }} />
//                   </div>
//                   <span style={{ fontSize: "12px", fontWeight: 800, color: brand }}>{checkedPerms.size}/{totalPerms}</span>
//                 </div>
//               </div>

//               {/* Sidebar + detail */}
//               <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
//                 {/* Sidebar */}
//                 <div className="cup-scroll" style={{ width: "210px", flexShrink: 0, borderRight: `1px solid ${brandLight}`, overflowY: "auto", padding: "14px 10px", background: brandFaint }}>
//                   <p style={{ fontSize: "10px", fontWeight: 700, color: "#8B8FA8", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: "10px" }}>
//                     Modules · {modules.length}
//                   </p>
//                   {modules.map(mod => {
//                     const isActive    = selectedModule === mod;
//                     const allP        = Object.values(MODULES_DATA[mod]).flat();
//                     const checkedInMod = allP.filter(p => checkedPerms.has(p)).length;
//                     const hasAny      = checkedInMod > 0;
//                     const isComplete  = hasAny && checkedInMod === allP.length;
//                     return (
//                       <div
//                         key={mod}
//                         className={`cup-sb-item ${isActive ? "cup-sb-active" : ""}`}
//                         onClick={() => { setSelectedModule(mod); setActiveTab("Basic"); }}
//                         style={{
//                           display: "flex", alignItems: "center", gap: "10px",
//                           padding: "10px", borderRadius: "10px", marginBottom: "3px",
//                           background: isActive ? "#fff" : "transparent",
//                           border: `1px solid ${isActive ? brandMid : "transparent"}`,
//                           boxShadow: isActive ? "0 1px 4px rgba(11,14,45,0.07)" : "none",
//                         }}
//                       >
//                         <div style={{ width: "32px", height: "32px", borderRadius: "9px", flexShrink: 0, background: isActive ? brandLight : "#ECEEF5", display: "flex", alignItems: "center", justifyContent: "center", color: brand }}>
//                           {MODULE_ICON[mod] ?? <LayoutGrid size={15} />}
//                         </div>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <p style={{ margin: 0, fontSize: "12px", fontWeight: isActive ? 700 : 500, color: isActive ? brand : "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod}</p>
//                           <p style={{ margin: "2px 0 0", fontSize: "10px", color: hasAny ? "#16A34A" : "#9CA3AF", fontWeight: hasAny ? 600 : 400 }}>
//                             {hasAny ? `${checkedInMod} / ${allP.length} active` : "No access"}
//                           </p>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
//                           {isComplete ? <CheckCircle size={13} color="#16A34A" /> : hasAny ? <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B" }} /> : null}
//                           <ChevronRight size={13} color={isActive ? brand : "#C7C9E0"} />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Detail pane */}
//                 <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
//                   {/* Module header + tabs */}
//                   <div style={{ padding: "16px 22px 12px", borderBottom: `1px solid ${brandLight}`, flexShrink: 0 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
//                       <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: brandLight, border: `1px solid ${brandMid}`, display: "flex", alignItems: "center", justifyContent: "center", color: brand }}>
//                         {MODULE_ICON[selectedModule] ?? <LayoutGrid size={15} />}
//                       </div>
//                       <div>
//                         <p style={{ margin: 0, fontSize: "13px", fontWeight: 800, color: brand }}>{selectedModule}</p>
//                         <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#8B8FA8" }}>Toggle permissions per sub-role</p>
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                       {SUB_ROLES.map(sr => {
//                         const perms    = MODULES_DATA[selectedModule]?.[sr] ?? [];
//                         const state    = getSRState(checkedPerms, perms);
//                         const c        = SR[sr];
//                         const isActive = activeTab === sr;
//                         const count    = perms.filter(p => checkedPerms.has(p)).length;
//                         return (
//                           <button
//                             key={sr}
//                             type="button"
//                             onClick={() => setActiveTab(sr)}
//                             className={`cup-tab ${isActive ? "cup-tab-act" : ""}`}
//                             style={{
//                               display: "flex", alignItems: "center", gap: "7px",
//                               padding: "7px 14px", borderRadius: "9px",
//                               border: `1.5px solid ${isActive ? c.dot : "#E5E7EB"}`,
//                               background: isActive ? c.bg : "#fff",
//                               color: isActive ? c.text : "#6B7280",
//                               fontSize: "12px", fontWeight: isActive ? 700 : 500,
//                               fontFamily: "'Plus Jakarta Sans', sans-serif",
//                             }}
//                           >
//                             <Checkbox state={state} dotColor={c.dot} bgColor={c.bg}
//                               onClick={e => { e.stopPropagation(); toggleSubRole(selectedModule, sr, state); }} />
//                             <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>{c.icon} {sr}</span>
//                             {count > 0 && (
//                               <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "99px", background: c.dot, color: "#fff", fontWeight: 700 }}>{count}</span>
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Perm chips */}
//                   <div className="cup-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
//                       <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
//                         {activeTab} · {(MODULES_DATA[selectedModule]?.[activeTab] ?? []).length} permissions
//                       </p>
//                       <button
//                         type="button"
//                         onClick={() => toggleSubRole(selectedModule, activeTab, getSRState(checkedPerms, MODULES_DATA[selectedModule]?.[activeTab] ?? []))}
//                         style={{ fontSize: "11px", fontWeight: 600, color: brand, background: brandFaint, border: `1px solid ${brandLight}`, borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//                       >
//                         {getSRState(checkedPerms, MODULES_DATA[selectedModule]?.[activeTab] ?? []) === "all" ? "Deselect all" : "Select all"}
//                       </button>
//                     </div>
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: "8px" }}>
//                       {(MODULES_DATA[selectedModule]?.[activeTab] ?? []).map(perm => {
//                         const isChecked = checkedPerms.has(perm);
//                         const c = SR[activeTab];
//                         return (
//                           <div key={perm} className="cup-chip" onClick={() => togglePerm(perm)} style={{
//                             display: "flex", alignItems: "center", gap: "10px",
//                             padding: "10px 12px", borderRadius: "10px",
//                             border: `1.5px solid ${isChecked ? c.border : "#E5E7EB"}`,
//                             background: isChecked ? c.bg : "#FAFAFA",
//                           }}>
//                             <Checkbox state={isChecked} dotColor={c.dot} bgColor={c.bg} />
//                             <span style={{ fontSize: "12px", fontWeight: isChecked ? 600 : 400, color: isChecked ? c.text : "#4B5563", fontFamily: "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                               {fmt(perm)}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div style={{ padding: "14px 28px", borderTop: `1px solid ${brandLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: brandFaint, flexShrink: 0 }}>
//                 <button onClick={() => setStep(1)} className="cup-back" style={{ padding: "10px 20px", borderRadius: "10px", border: `1px solid ${brandMid}`, background: "#fff", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
//                   <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back
//                 </button>
//                 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                   <span style={{ fontSize: "12px", color: "#8B8FA8" }}>{checkedPerms.size} permission{checkedPerms.size !== 1 ? "s" : ""} selected</span>
//                   <button onClick={handleNext} className="cup-next" style={{ padding: "10px 28px", borderRadius: "10px", background: brand, border: `1px solid ${brand}`, fontSize: "12px", fontWeight: 700, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
//                     Review <ChevronRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ════ STEP 3 — Review ════ */}
//           {step === 3 && (
//             <div className="cup-animate" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <div style={{ padding: "24px 32px", borderBottom: `1px solid ${brandLight}`, display: "flex", alignItems: "center", gap: "14px" }}>
//                 <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <FileText size={20} color="#fff" />
//                 </div>
//                 <div>
//                   <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: brand }}>Review & confirm</p>
//                   <p style={{ margin: "3px 0 0", fontSize: "11px", color: "#8B8FA8" }}>Verify everything looks right before creating the user</p>
//                 </div>
//               </div>

//               <div className="cup-scroll" style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
//                 <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "20px", alignItems: "start" }}>

//                   {/* User details card */}
//                   <div style={{ borderRadius: "14px", border: `1px solid ${brandMid}`, overflow: "hidden" }}>
//                     <div style={{ background: brand, padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
//                       <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 800, color: "#fff" }}>
//                         {initials}
//                       </div>
//                       <div>
//                         <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: "#fff" }}>{fullName || "—"}</p>
//                         <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>@{form.username || "—"}</p>
//                       </div>
//                     </div>
//                     <div style={{ padding: "16px 18px", background: "#fff" }}>
//                       {[
//                         ["Email",    form.email],
//                         ["Phone",    form.phone],
//                         ["Username", form.username],
//                       ].map(([label, value]) => (
//                         <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${brandLight}` }}>
//                           <span style={{ fontSize: "12px", color: "#8B8FA8", fontWeight: 500 }}>{label}</span>
//                           <span style={{ fontSize: "12px", fontWeight: 600, color: brand, fontFamily: "'JetBrains Mono', monospace" }}>{value || "—"}</span>
//                         </div>
//                       ))}
//                       <div style={{ marginTop: "12px", padding: "8px 12px", borderRadius: "8px", background: brandFaint, display: "flex", alignItems: "center", gap: "8px" }}>
//                         <ShieldCheck size={13} color={brand} />
//                         <span style={{ fontSize: "11px", fontWeight: 600, color: brand }}>{checkedPerms.size} permissions assigned</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Permissions summary */}
//                   <div>
//                     <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: 700, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.07em" }}>
//                       Permissions by module
//                     </p>
//                     {checkedPerms.size === 0 ? (
//                       <div style={{ padding: "32px", border: `1px dashed ${brandMid}`, borderRadius: "12px", textAlign: "center" }}>
//                         <ShieldCheck size={28} color="#D1D5DB" style={{ margin: "0 auto 8px" }} />
//                         <p style={{ margin: 0, fontSize: "13px", color: "#9CA3AF" }}>No permissions selected</p>
//                       </div>
//                     ) : (
//                       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                         {modules.map(mod => {
//                           const modPerms = Object.values(MODULES_DATA[mod]).flat().filter(p => checkedPerms.has(p));
//                           if (modPerms.length === 0) return null;
//                           return (
//                             <div key={mod} style={{ borderRadius: "12px", border: `1px solid ${brandLight}`, overflow: "hidden" }}>
//                               <div style={{ padding: "10px 14px", background: brandFaint, display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${brandLight}` }}>
//                                 <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: brandLight, border: `1px solid ${brandMid}`, display: "flex", alignItems: "center", justifyContent: "center", color: brand }}>
//                                   {MODULE_ICON[mod] ?? <LayoutGrid size={13} />}
//                                 </div>
//                                 <span style={{ fontSize: "12px", fontWeight: 700, color: brand }}>{mod}</span>
//                                 <span style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", background: brand, color: "#fff" }}>
//                                   {modPerms.length}
//                                 </span>
//                               </div>
//                               <div style={{ padding: "10px 14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                                 {modPerms.map(p => {
//                                   const sr = (Object.entries(MODULES_DATA[mod]) as [SubRole, string[]][]).find(([, ps]) => ps.includes(p))?.[0] ?? "Basic";
//                                   const c = SR[sr];
//                                   return (
//                                     <span key={p} style={{ fontSize: "11px", padding: "3px 9px", borderRadius: "99px", background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
//                                       {fmt(p)}
//                                     </span>
//                                   );
//                                 })}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div style={{ padding: "16px 32px", borderTop: `1px solid ${brandLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: brandFaint, flexShrink: 0 }}>
//                 <button onClick={() => setStep(2)} className="cup-back" style={{ padding: "10px 20px", borderRadius: "10px", border: `1px solid ${brandMid}`, background: "#fff", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
//                   <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back
//                 </button>

//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
//                   {saveSuccess && (
//                     <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0", fontSize: "12px", fontWeight: 600, color: "#15803D" }}>
//                       <CheckCircle size={13} /> User created successfully!
//                     </div>
//                   )}
//                   {saveError && (
//                     <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", background: "#FFF7F7", border: "1px solid #FECACA", fontSize: "12px", fontWeight: 600, color: "#DC2626" }}>
//                       <XCircle size={13} /> {saveError}
//                     </div>
//                   )}
//                   <button
//                     onClick={handleSave}
//                     disabled={isSaving || saveSuccess}
//                     className="cup-next"
//                     style={{ padding: "11px 32px", borderRadius: "12px", background: saveSuccess ? "#10B981" : brand, border: `1px solid ${saveSuccess ? "#10B981" : brand}`, fontSize: "13px", fontWeight: 700, color: "#fff", cursor: isSaving || saveSuccess ? "not-allowed" : "pointer", opacity: isSaving ? 0.7 : 1, display: "flex", alignItems: "center", gap: "8px" }}
//                   >
//                     {isSaving ? <><Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} /> Creating…</> : saveSuccess ? <><Check size={14} /> Created!</> : <><Save size={14} /> Create user</>}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//       </OpsMainLayout>
//     </>
//   );
// };

// export default CreateUserPage;


import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  ShieldCheck, Check, Loader2, Save, ArrowLeft,
  Car, Plane, Hotel, Bus, TrainFront, CreditCard,
  UtensilsCrossed, Settings2, Droplets, Lock, Receipt,
  LayoutGrid, Crown, ChevronRight, CheckCircle, XCircle, AlertCircle,
  User, FileText,
} from "lucide-react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

// ── Types ─────────────────────────────────────────────────────────────────────

type SubRole   = "Basic" | "Billing" | "Invoice" | "Admin";
type SRState   = "none" | "some" | "all";
type RolesData = Record<string, Record<SubRole, string[]>>;

type FormData = {
  firstName: string;
  lastName:  string;
  username:  string;
  email:     string;
  phone:     string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ── Design tokens ─────────────────────────────────────────────────────────────

const brand      = "#0B0E2D";
const brandLight = "#E8E9F3";
const brandMid   = "#C7C9E0";
const brandFaint = "#F4F5FB";

// ── Module icons ──────────────────────────────────────────────────────────────

const MODULE_ICON: Record<string, React.ReactNode> = {
  Flight:      <Plane           size={15} />,
  Hotel:       <Hotel           size={15} />,
  Bus:         <Bus             size={15} />,
  Train:       <TrainFront      size={15} />,
  Taxi:        <Car             size={15} />,
  Meals:       <UtensilsCrossed size={15} />,
  Visa:        <CreditCard      size={15} />,
  Operator:    <Settings2       size={15} />,
  Waterbottle: <Droplets        size={15} />,
};

// ── Sub-role config ───────────────────────────────────────────────────────────

type SRConfig = { bg: string; text: string; border: string; dot: string; icon: React.ReactNode };

const SUB_ROLES: SubRole[] = ["Basic", "Billing", "Invoice", "Admin"];

const SR: Record<SubRole, SRConfig> = {
  Basic:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#2563EB", icon: <Lock       size={12} /> },
  Billing: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA", dot: "#EA580C", icon: <CreditCard size={12} /> },
  Invoice: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0", dot: "#16A34A", icon: <Receipt    size={12} /> },
  Admin:   { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF", dot: "#9333EA", icon: <Crown      size={12} /> },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(p: string) {
  return p.split(".").slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

function getSRState(checked: Set<string>, perms: string[]): SRState {
  const n = perms.filter(p => checked.has(p)).length;
  if (n === 0) return "none";
  if (n === perms.length) return "all";
  return "some";
}

// ── FloatInput ────────────────────────────────────────────────────────────────

function FloatInput({
  id, label, value, onChange, error, type = "text", autoComplete = "off",
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void;
  error?: string; type?: string; autoComplete?: string;
}) {
  return (
    <div style={{ position: "relative", marginBottom: error ? "6px" : "20px" }}>
      <input
        id={id} type={type} autoComplete={autoComplete} required
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", fontSize: "14px", padding: "13px 16px",
          outline: "none",
          border: `2px solid ${error ? "#FCA5A5" : value ? brand : "#C7C9E0"}`,
          background: "transparent", borderRadius: "12px",
          color: brand, fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: "border-color 0.2s", boxSizing: "border-box",
        }}
      />
      <label htmlFor={id} style={{
        position: "absolute", left: 0,
        padding: value ? "0 6px" : "13px 16px",
        marginLeft: value ? "10px" : "0",
        top: value ? 0 : "auto",
        transform: value ? "translateY(-50%)" : "none",
        pointerEvents: "none", transition: "all 0.25s ease",
        fontSize: value ? "11px" : "14px",
        fontWeight: value ? 600 : 400,
        color: value ? brand : "#9CA3AF",
        background: value ? "#fff" : "transparent",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {label}
      </label>
      {error && (
        <p style={{ margin: "4px 0 12px 4px", fontSize: "11px", color: "#EF4444", display: "flex", alignItems: "center", gap: "4px" }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

function Checkbox({ state, dotColor, bgColor, onClick }: {
  state: SRState | boolean; dotColor: string; bgColor: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const checked       = state === true  || state === "all";
  const indeterminate = state === "some";
  return (
    <div onClick={onClick} style={{
      width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
      border: `1.5px solid ${checked || indeterminate ? dotColor : brandMid}`,
      background: checked ? dotColor : indeterminate ? bgColor : "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", transition: "all 0.15s",
    }}>
      {checked && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
      {indeterminate && (
        <div style={{ width: "8px", height: "2px", background: dotColor, borderRadius: "1px" }} />
      )}
    </div>
  );
}

// ── StepIndicator ─────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: 1, label: "User details", icon: <User       size={14} /> },
    { n: 2, label: "Permissions",  icon: <ShieldCheck size={14} /> },
    { n: 3, label: "Review",       icon: <FileText    size={14} /> },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: s.n < current ? "#10B981" : s.n === current ? brand : brandFaint,
              border: `2px solid ${s.n < current ? "#10B981" : s.n === current ? brand : brandMid}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.n <= current ? "#fff" : "#9CA3AF", transition: "all 0.3s",
            }}>
              {s.n < current ? <Check size={14} /> : s.icon}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Step {s.n}
              </p>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: s.n === current ? 700 : 500, color: s.n <= current ? brand : "#9CA3AF", transition: "color 0.3s" }}>
                {s.label}
              </p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: "48px", height: "2px", margin: "0 10px", background: current > s.n ? "#10B981" : brandMid, borderRadius: 99, transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const CreateUserPage = ({ onBack }: { onBack?: () => void }) => {
  const [step, setStep] = useState(1);

  // Form
  const [form,   setForm]   = useState<FormData>({ firstName: "", lastName: "", username: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  // Roles from API — loaded once on mount
  const [rolesData,    setRolesData]    = useState<RolesData>({});
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError,   setRolesError]   = useState<string | null>(null);

  // Permissions selection
  const [checkedPerms,   setCheckedPerms]   = useState<Set<string>>(new Set());
  const [selectedModule, setSelectedModule] = useState("");
  const [activeTab,      setActiveTab]      = useState<SubRole>("Basic");

  // Save
  const [isSaving,    setIsSaving]    = useState(false);
  const [saveError,   setSaveError]   = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── Fetch all available roles on mount ────────────────────────────────────
  useEffect(() => {
    (async () => {
      setRolesLoading(true);
      setRolesError(null);
      try {
        const { data } = await axios.get<{ success: string; roles: RolesData }>(
          "/api/user_management/getAllKeycloakRoles"
        );
        const fetched = data.roles ?? {};
        // Filter out any ".pro" meta-keys, same pattern as the modal
        const mods = Object.keys(fetched).filter(m => !m.includes(".pro"));
        setRolesData(fetched);
        if (mods.length > 0) setSelectedModule(mods[0]);
        // All permissions start unchecked — this is a new user
      } catch (err) {
        setRolesError((err as AxiosError).message || "Failed to load permissions");
      } finally {
        setRolesLoading(false);
      }
    })();
  }, []);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const setField = (k: keyof FormData) => (v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim())  e.lastName  = "Last name is required";
    if (!form.username.trim())  e.username  = "Username is required";
    else if (!/^[a-zA-Z0-9._@+-]{3,}$/.test(form.username)) e.username = "Min 3 chars";
    if (!form.email.trim())     e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim())     e.phone = "Phone number is required";
    else if (!/^[+]?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validate()) return;
    setStep(s => s + 1);
  };

  // ── Permission toggles ────────────────────────────────────────────────────
  // const togglePerm = (p: string) => {
  //   setCheckedPerms(prev => {
  //     const n = new Set(prev);
  //     n.has(p) ? n.delete(p) : n.add(p);
  //     return n;
  //   });
  // };

  // const toggleSubRole = (mod: string, sr: SubRole, state: SRState) => {
  //   const perms = rolesData[mod]?.[sr] ?? [];
  //   setCheckedPerms(prev => {
  //     const n = new Set(prev);
  //     state === "all"
  //       ? perms.forEach(p => n.delete(p))
  //       : perms.forEach(p => n.add(p));
  //     return n;
  //   });
  // };

  const togglePerm = (p: string) => {
  setCheckedPerms(prev => {
    const n = new Set(prev);
    if (n.has(p)) {
      n.delete(p);
    } else {
      n.add(p);
    }
    return n;
  });
};

const toggleSubRole = (mod: string, sr: SubRole, state: SRState) => {
  const perms = rolesData[mod]?.[sr] ?? [];
  setCheckedPerms(prev => {
    const n = new Set(prev);
    if (state === "all") {
      perms.forEach(p => n.delete(p));
    } else {
      perms.forEach(p => n.add(p));
    }
    return n;
  });
};

const buildPermissionPayload = (): string[] => {
  const result: string[] = [];

  modules.forEach(mod => {
    SUB_ROLES.filter(sr => sr !== "Admin").forEach(sr => {  // ← skip Admin
      const perms = rolesData[mod]?.[sr] ?? [];
      if (perms.length === 0) return;

      const checkedInSR = perms.filter(p => checkedPerms.has(p));

      if (checkedInSR.length === 0) {
        return;
      } else if (checkedInSR.length === perms.length) {
        result.push(`${mod.toLowerCase()}-${sr.toLowerCase()}`);
      } else {
        checkedInSR.forEach(p => result.push(p));
      }
    });
  });

  // dedupe just in case
  return [...new Set(result)];
};

const handleSave = async () => {
  setIsSaving(true); setSaveError(null);
  try {
    await axios.post("/api/user_management/addUserKeyclock", {
      userdetails: {
        username:   form.username,
        email:      form.email,
        first_name: form.firstName,
        last_name:  form.lastName,
        contact_no: form.phone,
      },
      permission: buildPermissionPayload(),  // ← use this instead of Array.from(checkedPerms)
    });
    setSaveSuccess(true);
  } catch (err) {
    setSaveError((err as AxiosError).message || "Failed to create user");
  } finally {
    setIsSaving(false);
  }
};

  // ── Save ──────────────────────────────────────────────────────────────────
//   const handleSave = async () => {
//     setIsSaving(true); setSaveError(null);
//     try {
//       await axios.post("/api/user_management/addUserKeyclock", {
//   userdetails: {                            // ← nested object
//     username:   form.username,
//     email:      form.email,
//     first_name: form.firstName,
//     last_name:  form.lastName,
//     contact_no: form.phone,
//   },
//   permission: Array.from(checkedPerms),    // ← singular, no 's'
// });
//       setSaveSuccess(true);
//     } catch (err) {
//       setSaveError((err as AxiosError).message || "Failed to create user");
//     } finally {
//       setIsSaving(false);
//     }
//   };

  // ── Derived ───────────────────────────────────────────────────────────────
  const modules    = Object.keys(rolesData).filter(m => !m.includes(".pro"));
  const totalPerms = [...new Set(
    Object.values(rolesData).flatMap(m => Object.values(m).flat() as string[])
  )].length;
  const fullName = `${form.firstName} ${form.lastName}`.trim();
  const initials = [form.firstName[0], form.lastName[0]].filter(Boolean).join("").toUpperCase() || "?";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        /* Make OpsMainLayout's content area a flex column so we can stretch inside it */
        .cup-layout-content {
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          height: 100% !important;
        }

        .cup-page * { box-sizing: border-box; }

        .cup-input-wrap input:focus { border-color: ${brand} !important; }

        .cup-sb-item  { transition: all 0.12s; cursor: pointer; }
        .cup-sb-item:hover:not(.cup-sb-active) { background: #fff !important; }

        .cup-chip { transition: all 0.12s; cursor: pointer; }
        .cup-chip:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(11,14,45,0.07); }

        .cup-tab { transition: all 0.15s; cursor: pointer; }
        .cup-tab:hover:not(.cup-tab-act) { border-color: ${brandMid} !important; background: ${brandFaint} !important; }

        .cup-next { transition: all 0.18s; }
        .cup-next:hover:not(:disabled) { background: #181C4A !important; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(11,14,45,0.25); }
        .cup-next:active:not(:disabled) { transform: translateY(0); }

        .cup-back { transition: all 0.15s; }
        .cup-back:hover { background: ${brandFaint} !important; border-color: ${brandMid} !important; }

        .cup-scroll::-webkit-scrollbar       { width: 3px; }
        .cup-scroll::-webkit-scrollbar-track { background: transparent; }
        .cup-scroll::-webkit-scrollbar-thumb { background: ${brandMid}; border-radius: 99px; }

        @keyframes cup-fade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .cup-animate { animation: cup-fade 0.22s ease forwards; }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <OpsMainLayout pageTitle="Create User" pageSubtitle="User management">
        {/*
          This div fills 100% of whatever height OpsMainLayout gives us.
          No hardcoded pixel offsets — it naturally stretches to the available space.
        */}
        <div
          className="cup-page"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            height: "100%",          /* fill the layout's content area */
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",      /* no outer page scroll */
            // background: "#F1F3FA",
            padding: "20px 24px",
            width: "100%",
    maxWidth: "1100px",      // ← cap the width here, adjust to taste
    marginLeft: "auto",
    marginRight: "auto",
          }}
        >
          {/* ── Top bar — fixed height, never scrolls ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "16px",
            flexShrink: 0,           /* never shrinks regardless of viewport */
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {onBack && (
                <button onClick={onBack} className="cup-back" style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 14px", borderRadius: "10px",
                  border: `1px solid ${brandMid}`, background: "#fff",
                  fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer",
                }}>
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              <div>
                <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: brand, letterSpacing: "-0.02em" }}>
                  Create new user
                </h1>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#8B8FA8" }}>
                  Fill in details, assign permissions, then review before saving
                </p>
              </div>
            </div>
            <StepIndicator current={step} />
          </div>

          {/* ── Card — flex: 1 + minHeight: 0 is the magic combo ──
               flex: 1   → grow to fill all remaining vertical space
               minHeight: 0 → allow it to shrink below its content size (crucial for nested scroll)
               overflow: hidden → clip children, each panel handles its own scroll
          ── */}
          <div style={{
            flex: 1,
            minHeight: 0,
            background: "#fff",
            borderRadius: "18px",
            border: `1px solid ${brandMid}`,
            boxShadow: "0 2px 20px rgba(11,14,45,0.06)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            
          }}>

            {/* ════ STEP 1 — User details ════ */}
            {step === 1 && (
              <div className="cup-animate" style={{ flex: 1, display: "flex", minHeight: 0 }}>

                {/* Left: dark decorative panel */}
                <div style={{
                  width: "280px", flexShrink: 0,
                  background: brand,
                  padding: "36px 28px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                      <User size={22} color="#fff" />
                    </div>
                    <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                      User details
                    </h2>
                    <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
                      Enter the basic information for the new user account.
                    </p>
                  </div>

                  {/* Live preview of what's been typed */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { label: "Full name", value: fullName       || "—" },
                      { label: "Username",  value: form.username  || "—" },
                      { label: "Email",     value: form.email     || "—" },
                      { label: "Phone",     value: form.phone     || "—" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                          {label}
                        </span>
                        <p style={{ margin: "3px 0 0", fontSize: "12px", fontWeight: 600, color: value === "—" ? "rgba(255,255,255,0.2)" : "#fff", fontFamily: "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: form — scrolls independently if viewport is very small */}
                <div className="cup-scroll" style={{
                  flex: 1,
                  padding: "36px 44px",
                  overflowY: "auto",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                      <div className="cup-input-wrap">
                        <FloatInput id="firstName" label="First name" value={form.firstName} onChange={setField("firstName")} error={errors.firstName} />
                      </div>
                      <div className="cup-input-wrap">
                        <FloatInput id="lastName" label="Last name" value={form.lastName} onChange={setField("lastName")} error={errors.lastName} />
                      </div>
                    </div>
                    <div className="cup-input-wrap">
                      <FloatInput id="username" label="Username" value={form.username} onChange={setField("username")} error={errors.username} autoComplete="username" />
                    </div>
                    <div className="cup-input-wrap">
                      <FloatInput id="email" label="Email address" value={form.email} onChange={setField("email")} error={errors.email} type="email" autoComplete="email" />
                    </div>
                    <div className="cup-input-wrap">
                      <FloatInput id="phone" label="Phone number" value={form.phone} onChange={setField("phone")} error={errors.phone} type="tel" />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px" }}>
                    <button onClick={handleNext} className="cup-next" style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "11px 28px", borderRadius: "11px",
                      background: brand, border: `1px solid ${brand}`,
                      fontSize: "13px", fontWeight: 700, color: "#fff", cursor: "pointer",
                    }}>
                      Next: Permissions <ShieldCheck size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ════ STEP 2 — Permissions ════ */}
            {step === 2 && (
              <div className="cup-animate" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>

                {/* Sub-header */}
                <div style={{
                  padding: "14px 22px", borderBottom: `1px solid ${brandLight}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexShrink: 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShieldCheck size={18} color="#fff" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 800, color: brand }}>Assign permissions</p>
                      <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#8B8FA8" }}>All unchecked by default — select what this user can access</p>
                    </div>
                  </div>

                  {/* Progress bar — only when data is loaded */}
                  {!rolesLoading && !rolesError && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 14px", borderRadius: "10px", background: brandFaint, border: `1px solid ${brandLight}` }}>
                      <div style={{ width: "90px", height: "4px", borderRadius: 99, background: brandMid, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${totalPerms > 0 ? Math.round(checkedPerms.size / totalPerms * 100) : 0}%`,
                          background: brand, borderRadius: 99, transition: "width 0.3s",
                        }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: brand }}>
                        {checkedPerms.size}/{totalPerms}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── Loading ── */}
                {rolesLoading && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                    <Loader2 size={24} color={brand} style={{ animation: "spin 0.8s linear infinite" }} />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#8B8FA8" }}>Loading permissions…</span>
                  </div>
                )}

                {/* ── Error ── */}
                {!rolesLoading && rolesError && (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", borderRadius: "12px", background: "#FFF7F7", border: "1px solid #FECACA", padding: "16px 20px", maxWidth: "380px" }}>
                      <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: "1px" }} />
                      <div>
                        <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#DC2626" }}>Failed to load permissions</p>
                        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#B91C1C", fontFamily: "'JetBrains Mono', monospace" }}>{rolesError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Content: sidebar + detail ── */}
                {!rolesLoading && !rolesError && (
                  <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

                    {/* Sidebar */}
                    <div className="cup-scroll" style={{
                      width: "205px", flexShrink: 0,
                      borderRight: `1px solid ${brandLight}`,
                      overflowY: "auto",
                      padding: "12px 8px",
                      background: brandFaint,
                    }}>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: "#8B8FA8", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: "8px" }}>
                        Modules · {modules.length}
                      </p>
                      {modules.map(mod => {
                        const isActive     = selectedModule === mod;
                        const allP         = SUB_ROLES.flatMap(sr => rolesData[mod]?.[sr] ?? []);
                        const checkedInMod = allP.filter(p => checkedPerms.has(p)).length;
                        const hasAny       = checkedInMod > 0;
                        const isComplete   = hasAny && checkedInMod === allP.length;
                        return (
                          <div
                            key={mod}
                            className={`cup-sb-item ${isActive ? "cup-sb-active" : ""}`}
                            onClick={() => { setSelectedModule(mod); setActiveTab("Basic"); }}
                            style={{
                              display: "flex", alignItems: "center", gap: "9px",
                              padding: "9px 10px", borderRadius: "10px", marginBottom: "2px",
                              background: isActive ? "#fff" : "transparent",
                              border: `1px solid ${isActive ? brandMid : "transparent"}`,
                              boxShadow: isActive ? "0 1px 4px rgba(11,14,45,0.07)" : "none",
                            }}
                          >
                            <div style={{ width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0, background: isActive ? brandLight : "#ECEEF5", display: "flex", alignItems: "center", justifyContent: "center", color: brand }}>
                              {MODULE_ICON[mod] ?? <LayoutGrid size={14} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ margin: 0, fontSize: "12px", fontWeight: isActive ? 700 : 500, color: isActive ? brand : "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {mod}
                              </p>
                              <p style={{ margin: "1px 0 0", fontSize: "10px", color: hasAny ? "#16A34A" : "#9CA3AF", fontWeight: hasAny ? 600 : 400 }}>
                                {hasAny ? `${checkedInMod} / ${allP.length} active` : "No access"}
                              </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>
                              {isComplete
                                ? <CheckCircle size={12} color="#16A34A" />
                                : hasAny
                                ? <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B" }} />
                                : null}
                              <ChevronRight size={12} color={isActive ? brand : "#C7C9E0"} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detail pane */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                      {/* Module header + sub-role tabs */}
                      <div style={{ padding: "14px 20px 12px", borderBottom: `1px solid ${brandLight}`, flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                          <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: brandLight, border: `1px solid ${brandMid}`, display: "flex", alignItems: "center", justifyContent: "center", color: brand }}>
                            {MODULE_ICON[selectedModule] ?? <LayoutGrid size={14} />}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: "13px", fontWeight: 800, color: brand }}>{selectedModule}</p>
                            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#8B8FA8" }}>Toggle permissions per sub-role</p>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                          {SUB_ROLES.map(sr => {
                            const perms    = rolesData[selectedModule]?.[sr] ?? [];
                            const state    = getSRState(checkedPerms, perms);
                            const c        = SR[sr];
                            const isActive = activeTab === sr;
                            const count    = perms.filter(p => checkedPerms.has(p)).length;
                            return (
                              <button key={sr} type="button"
                                onClick={() => setActiveTab(sr)}
                                className={`cup-tab ${isActive ? "cup-tab-act" : ""}`}
                                style={{
                                  display: "flex", alignItems: "center", gap: "7px",
                                  padding: "6px 13px", borderRadius: "8px",
                                  border: `1.5px solid ${isActive ? c.dot : "#E5E7EB"}`,
                                  background: isActive ? c.bg : "#fff",
                                  color: isActive ? c.text : "#6B7280",
                                  fontSize: "12px", fontWeight: isActive ? 700 : 500,
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}
                              >
                                <Checkbox state={state} dotColor={c.dot} bgColor={c.bg}
                                  onClick={e => { e.stopPropagation(); toggleSubRole(selectedModule, sr, state); }} />
                                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                  {c.icon} {sr}
                                </span>
                                {count > 0 && (
                                  <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "99px", background: c.dot, color: "#fff", fontWeight: 700 }}>
                                    {count}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Permission chips — this is the ONLY scrolling region in this pane */}
                      <div className="cup-scroll" style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                          <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {activeTab} · {(rolesData[selectedModule]?.[activeTab] ?? []).length} permissions
                          </p>
                          <button type="button"
                            onClick={() => toggleSubRole(selectedModule, activeTab, getSRState(checkedPerms, rolesData[selectedModule]?.[activeTab] ?? []))}
                            style={{ fontSize: "11px", fontWeight: 600, color: brand, background: brandFaint, border: `1px solid ${brandLight}`, borderRadius: "6px", padding: "3px 10px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {getSRState(checkedPerms, rolesData[selectedModule]?.[activeTab] ?? []) === "all" ? "Deselect all" : "Select all"}
                          </button>
                        </div>

                        {(rolesData[selectedModule]?.[activeTab] ?? []).length === 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", padding: "40px 0", color: "#9CA3AF" }}>
                            <ShieldCheck size={26} color="#D1D5DB" />
                            <p style={{ margin: 0, fontSize: "13px" }}>No permissions in this sub-role</p>
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "7px" }}>
                            {(rolesData[selectedModule]?.[activeTab] ?? []).map(perm => {
                              const isChecked = checkedPerms.has(perm);
                              const c         = SR[activeTab];
                              return (
                                <div key={perm} className="cup-chip" onClick={() => togglePerm(perm)}
                                  style={{
                                    display: "flex", alignItems: "center", gap: "9px",
                                    padding: "9px 11px", borderRadius: "9px",
                                    border: `1.5px solid ${isChecked ? c.border : "#E5E7EB"}`,
                                    background: isChecked ? c.bg : "#FAFAFA",
                                  }}
                                >
                                  <Checkbox state={isChecked} dotColor={c.dot} bgColor={c.bg} />
                                  <span style={{ fontSize: "11px", fontWeight: isChecked ? 600 : 400, color: isChecked ? c.text : "#4B5563", fontFamily: "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {fmt(perm)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer — always visible, never scrolls */}
                <div style={{
                  padding: "12px 22px", borderTop: `1px solid ${brandLight}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: brandFaint, flexShrink: 0,
                }}>
                  <button onClick={() => setStep(1)} className="cup-back"
                    style={{ padding: "9px 18px", borderRadius: "9px", border: `1px solid ${brandMid}`, background: "#fff", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /> Back
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#8B8FA8" }}>
                      {checkedPerms.size} permission{checkedPerms.size !== 1 ? "s" : ""} selected
                    </span>
                    <button onClick={handleNext} className="cup-next"
                      style={{ padding: "9px 24px", borderRadius: "9px", background: brand, border: `1px solid ${brand}`, fontSize: "12px", fontWeight: 700, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}>
                      Review <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ════ STEP 3 — Review ════ */}
            {step === 3 && (
              <div className="cup-animate" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>

                <div style={{ padding: "18px 28px", borderBottom: `1px solid ${brandLight}`, display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileText size={18} color="#fff" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: 800, color: brand }}>Review & confirm</p>
                    <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#8B8FA8" }}>Verify everything looks right before creating the user</p>
                  </div>
                </div>

                {/* Scrollable review body */}
                <div className="cup-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "18px", alignItems: "start" }}>

                    {/* User card */}
                    <div style={{ borderRadius: "13px", border: `1px solid ${brandMid}`, overflow: "hidden" }}>
                      <div style={{ background: brand, padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#fff" }}>
                          {initials}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: "#fff" }}>{fullName || "—"}</p>
                          <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "'JetBrains Mono', monospace" }}>
                            @{form.username || "—"}
                          </p>
                        </div>
                      </div>
                      <div style={{ padding: "14px 16px", background: "#fff" }}>
                        {[["Email", form.email], ["Phone", form.phone], ["Username", form.username]].map(([label, value]) => (
                          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${brandLight}` }}>
                            <span style={{ fontSize: "12px", color: "#8B8FA8", fontWeight: 500 }}>{label}</span>
                            <span style={{ fontSize: "12px", fontWeight: 600, color: brand, fontFamily: "'JetBrains Mono', monospace" }}>{value || "—"}</span>
                          </div>
                        ))}
                        <div style={{ marginTop: "10px", padding: "7px 11px", borderRadius: "8px", background: brandFaint, display: "flex", alignItems: "center", gap: "7px" }}>
                          <ShieldCheck size={12} color={brand} />
                          {/* <span style={{ fontSize: "11px", fontWeight: 600, color: brand }}>{checkedPerms.size} permissions assigned</span> */}


<span style={{ fontSize: "11px", fontWeight: 600, color: brand }}>{buildPermissionPayload().length} access rights assigned</span>
                        </div>
                      </div>
                    </div>

                    {/* Permissions by module */}
                    {/* Permissions by module */}
<div>
  <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.07em" }}>
    Access Summary
  </p>
  {checkedPerms.size === 0 ? (
    <div style={{ padding: "28px", border: `1px dashed ${brandMid}`, borderRadius: "12px", textAlign: "center" }}>
      <ShieldCheck size={26} color="#D1D5DB" style={{ margin: "0 auto 8px" }} />
      <p style={{ margin: 0, fontSize: "13px", color: "#9CA3AF" }}>No permissions selected</p>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {modules.map(mod => {
        // For each sub-role, determine if it's a full role or partial perms
        const roleKeys: string[]   = [];
        const individualPerms: { perm: string; sr: SubRole }[] = [];

        SUB_ROLES.filter(sr => sr !== "Admin").forEach(sr => {
          const perms      = rolesData[mod]?.[sr] ?? [];
          if (perms.length === 0) return;
          const checkedInSR = perms.filter(p => checkedPerms.has(p));
          if (checkedInSR.length === 0) return;

          if (checkedInSR.length === perms.length) {
            roleKeys.push(`${mod.toLowerCase()}-${sr.toLowerCase()}`);
          } else {
            checkedInSR.forEach(p => individualPerms.push({ perm: p, sr }));
          }
        });

        if (roleKeys.length === 0 && individualPerms.length === 0) return null;

        return (
          <div key={mod} style={{ borderRadius: "11px", border: `1px solid ${brandLight}`, overflow: "hidden" }}>

            {/* Module header */}
            <div style={{ padding: "9px 13px", background: brandFaint, display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${brandLight}` }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: brandLight, border: `1px solid ${brandMid}`, display: "flex", alignItems: "center", justifyContent: "center", color: brand }}>
                {MODULE_ICON[mod] ?? <LayoutGrid size={12} />}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: brand }}>{mod}</span>
              <span style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "99px", background: brand, color: "#fff" }}>
                {roleKeys.length + individualPerms.length}
              </span>
            </div>

            <div style={{ padding: "10px 13px", display: "flex", flexDirection: "column", gap: "8px" }}>

              {/* Roles row */}
              {roleKeys.length > 0 && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: "4px", minWidth: "70px" }}>
                    Roles
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {roleKeys.map(role => (
                      <span key={role} style={{
                        fontSize: "11px", padding: "3px 9px", borderRadius: "99px",
                        background: brand, color: "#fff",
                        fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                        display: "flex", alignItems: "center", gap: "4px",
                      }}>
                        <Crown size={9} /> {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Individual permissions row */}
              {individualPerms.length > 0 && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#8B8FA8", textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: "4px", minWidth: "70px" }}>
                    Permissions
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {individualPerms.map(({ perm, sr }) => {
                      const c = SR[sr];
                      return (
                        <span key={perm} style={{
                          fontSize: "11px", padding: "3px 8px", borderRadius: "99px",
                          background: c.bg, color: c.text, border: `1px solid ${c.border}`,
                          fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
                        }}>
                          {fmt(perm)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ padding: "14px 28px", borderTop: `1px solid ${brandLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: brandFaint, flexShrink: 0 }}>
                  <button onClick={() => setStep(2)} className="cup-back"
                    style={{ padding: "9px 18px", borderRadius: "9px", border: `1px solid ${brandMid}`, background: "#fff", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /> Back
                  </button>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    {saveSuccess && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 13px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0", fontSize: "12px", fontWeight: 600, color: "#15803D" }}>
                        <CheckCircle size={12} /> User created successfully!
                      </div>
                    )}
                    {saveError && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 13px", borderRadius: "8px", background: "#FFF7F7", border: "1px solid #FECACA", fontSize: "12px", fontWeight: 600, color: "#DC2626" }}>
                        <XCircle size={12} /> {saveError}
                      </div>
                    )}
                    <button onClick={handleSave} disabled={isSaving || saveSuccess} className="cup-next"
                      style={{ padding: "10px 28px", borderRadius: "10px", background: saveSuccess ? "#10B981" : brand, border: `1px solid ${saveSuccess ? "#10B981" : brand}`, fontSize: "13px", fontWeight: 700, color: "#fff", cursor: isSaving || saveSuccess ? "not-allowed" : "pointer", opacity: isSaving ? 0.7 : 1, display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      {isSaving
                        ? <><Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} /> Creating…</>
                        : saveSuccess
                        ? <><Check size={13} /> Created!</>
                        : <><Save size={13} /> Create user</>}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>{/* end card */}
        </div>{/* end cup-page */}
      </OpsMainLayout>
    </>
  );
};

export default CreateUserPage;