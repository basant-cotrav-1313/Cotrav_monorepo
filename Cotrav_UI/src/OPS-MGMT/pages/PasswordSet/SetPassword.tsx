// import { useState, useEffect, useRef } from "react";

// type Strength = "weak" | "fair" | "good" | "strong";

// interface PasswordRule {
//   label: string;
//   test: (pw: string) => boolean;
// }

// const rules: PasswordRule[] = [
//   { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
//   { label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
//   { label: "Lowercase letter", test: (pw) => /[a-z]/.test(pw) },
//   { label: "Number", test: (pw) => /\d/.test(pw) },
//   { label: "Special character", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
// ];

// function getStrength(pw: string): { level: Strength; score: number } {
//   const score = rules.filter((r) => r.test(pw)).length;
//   if (pw.length === 0) return { level: "weak", score: 0 };
//   if (score <= 2) return { level: "weak", score };
//   if (score === 3) return { level: "fair", score };
//   if (score === 4) return { level: "good", score };
//   return { level: "strong", score };
// }

// const strengthConfig: Record<Strength, { label: string; color: string; bars: number }> = {
//   weak:   { label: "Weak",   color: "#FF4D6D", bars: 1 },
//   fair:   { label: "Fair",   color: "#FF9B3E", bars: 2 },
//   good:   { label: "Good",   color: "#7BD4A6", bars: 3 },
//   strong: { label: "Strong", color: "#4ECDC4", bars: 4 },
// };

// // Floating orb positions
// const orbs = [
//   { size: 340, top: "-80px", left: "-100px", opacity: 0.12, delay: "0s" },
//   { size: 240, bottom: "-60px", right: "-60px", opacity: 0.09, delay: "2s" },
//   { size: 160, top: "40%", right: "5%", opacity: 0.07, delay: "1s" },
// ];

// export default function SetPasswordPage() {
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [focused, setFocused] = useState<"pw" | "confirm" | null>(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [shake, setShake] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const { level, score } = getStrength(password);
//   const cfg = strengthConfig[level];
//   const match = password && confirm && password === confirm;
//   const mismatch = confirm.length > 0 && password !== confirm;
//   const allPassed = rules.every((r) => r.test(password));
//   const canSubmit = allPassed && match;

//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.style.opacity = "0";
//       containerRef.current.style.transform = "translateY(24px)";
//       requestAnimationFrame(() => {
//         setTimeout(() => {
//           if (containerRef.current) {
//             containerRef.current.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//             containerRef.current.style.opacity = "1";
//             containerRef.current.style.transform = "translateY(0)";
//           }
//         }, 80);
//       });
//     }
//   }, []);

//   const handleSubmit = () => {
//     if (!canSubmit) {
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//       return;
//     }
//     setSubmitted(true);
//     setTimeout(() => setSuccess(true), 600);
//   };

//   return (
//     <div style={styles.page}>
//       {/* Background orbs */}
//       {orbs.map((orb, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             width: orb.size,
//             height: orb.size,
//             borderRadius: "50%",
//             background: "radial-gradient(circle, #4ECDC4 0%, #6C63FF 60%, transparent 80%)",
//             opacity: orb.opacity,
//             top: orb.top,
//             left: orb.left,
//             right: (orb as any).right,
//             bottom: (orb as any).bottom,
//             filter: "blur(40px)",
//             animation: `pulse 6s ease-in-out infinite`,
//             animationDelay: orb.delay,
//             pointerEvents: "none",
//           }}
//         />
//       ))}

//       {/* Grid overlay */}
//       <div style={styles.grid} />

//       {/* Card */}
//       <div ref={containerRef} style={{ ...styles.card, animation: shake ? "shake 0.5s ease" : undefined }}>
//         {success ? (
//           <SuccessState />
//         ) : (
//           <>
//             {/* Header */}
//             <div style={styles.header}>
//               <div style={styles.iconWrap}>
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 2C9.24 2 7 4.24 7 7v2H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V7c0-1.66 1.34-3 3-3zm0 9a2 2 0 110 4 2 2 0 010-4z" fill="#0B0E2D"/>
//                 </svg>
//               </div>
//               <h1 style={styles.title}>Set New Password</h1>
//               <p style={styles.subtitle}>Create a strong password to secure your account</p>
//             </div>

//             {/* Password Field */}
//             <div style={styles.field}>
//               <label style={styles.label}>New Password</label>
//               <div style={{ ...styles.inputWrap, boxShadow: focused === "pw" ? "0 0 0 2px #4ECDC466" : "none" }}>
//                 <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#A0A5C0"/>
//                 </svg>
//                 <input
//                   type={showPw ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => setFocused("pw")}
//                   onBlur={() => setFocused(null)}
//                   placeholder="Enter new password"
//                   style={styles.input}
//                 />
//                 <button onClick={() => setShowPw(!showPw)} style={styles.eye} tabIndex={-1}>
//                   {showPw ? <EyeOff /> : <EyeOn />}
//                 </button>
//               </div>

//               {/* Strength bars */}
//               {password.length > 0 && (
//                 <div style={styles.strengthRow}>
//                   <div style={styles.bars}>
//                     {[1, 2, 3, 4].map((n) => (
//                       <div
//                         key={n}
//                         style={{
//                           ...styles.bar,
//                           background: n <= cfg.bars ? cfg.color : "#E0E3F0",
//                           transition: "background 0.3s ease",
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <span style={{ ...styles.strengthLabel, color: cfg.color }}>{cfg.label}</span>
//                 </div>
//               )}
//             </div>

//             {/* Confirm Field */}
//             <div style={styles.field}>
//               <label style={styles.label}>Confirm Password</label>
//               <div
//                 style={{
//                   ...styles.inputWrap,
//                   boxShadow: focused === "confirm" ? "0 0 0 2px #4ECDC466" : "none",
//                   borderColor: mismatch ? "#FF4D6D55" : "transparent",
//                 }}
//               >
//                 <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill={match ? "#4ECDC4" : "#A0A5C0"}/>
//                 </svg>
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={confirm}
//                   onChange={(e) => setConfirm(e.target.value)}
//                   onFocus={() => setFocused("confirm")}
//                   onBlur={() => setFocused(null)}
//                   placeholder="Re-enter password"
//                   style={styles.input}
//                 />
//                 <button onClick={() => setShowConfirm(!showConfirm)} style={styles.eye} tabIndex={-1}>
//                   {showConfirm ? <EyeOff /> : <EyeOn />}
//                 </button>
//               </div>
//               {mismatch && (
//                 <span style={styles.error}>Passwords do not match</span>
//               )}
//               {match && (
//                 <span style={{ ...styles.error, color: "#4ECDC4" }}>Passwords match ✓</span>
//               )}
//             </div>

//             {/* Rules */}
//             <div style={styles.rules}>
//               {rules.map((r) => {
//                 const passed = r.test(password);
//                 return (
//                   <div key={r.label} style={styles.ruleRow}>
//                     <div
//                       style={{
//                         ...styles.ruleIcon,
//                         background: passed ? "#E6F9F7" : "#EDEEF8",
//                         border: `1px solid ${passed ? "#4ECDC4" : "#D0D4EC"}`,
//                       }}
//                     >
//                       {passed ? (
//                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
//                           <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4ECDC4"/>
//                         </svg>
//                       ) : (
//                         <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B0B6D4" }} />
//                       )}
//                     </div>
//                     <span style={{ ...styles.ruleText, color: passed ? "#1A7A72" : "#8A90B4" }}>
//                       {r.label}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Submit */}
//             <button
//               onClick={handleSubmit}
//               disabled={!canSubmit}
//               style={{
//                 ...styles.btn,
//                 opacity: canSubmit ? 1 : 0.5,
//                 cursor: canSubmit ? "pointer" : "not-allowed",
//                 transform: submitted ? "scale(0.97)" : "scale(1)",
//               }}
//             >
//               {submitted ? (
//                 <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <Spinner /> Setting password...
//                 </span>
//               ) : (
//                 "Set Password"
//               )}
//             </button>

//             <p style={styles.hint}>
//               Remember to store it somewhere safe.{" "}
//               <span style={{ color: "#0B0E2D", fontWeight: 500, cursor: "pointer" }}>Need help?</span>
//             </p>
//           </>
//         )}
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
//         @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
//         @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
//         @keyframes spin { to { transform: rotate(360deg) } }
//         @keyframes successPop { 0%{transform:scale(0.7);opacity:0} 80%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         input::placeholder { color: #B0B6D4; }
//         input:focus { outline: none; }
//         button:focus { outline: none; }
//       `}</style>
//     </div>
//   );
// }

// function SuccessState() {
//   return (
//     <div style={{ textAlign: "center", padding: "2rem 1rem", animation: "successPop 0.5s ease forwards" }}>
//       <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#E6F9F7", border: "2px solid #4ECDC4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
//         <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
//           <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4ECDC4"/>
//         </svg>
//       </div>
//       <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", color: "#0B0E2D", marginBottom: "0.75rem" }}>Password Updated!</h2>
//       <p style={{ color: "#7B82A8", fontSize: "0.95rem", lineHeight: 1.6 }}>Your new password has been set successfully.<br/>You can now log in with your new credentials.</p>
//       <button style={{ ...styles.btn, marginTop: "2rem", opacity: 1, cursor: "pointer" }}>
//         Continue to Login
//       </button>
//     </div>
//   );
// }

// function EyeOn() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7.2a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4z" fill="#A0A5C0"/>
//     </svg>
//   );
// }

// function EyeOff() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17C11.12 6.63 11.55 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zm6.53 6.53l1.55 1.55c-.05.2-.08.41-.08.62a2.7 2.7 0 002.7 2.7c.21 0 .41-.03.62-.08l1.55 1.55c-.68.33-1.43.53-2.17.53a4.5 4.5 0 01-4.5-4.5c0-.74.2-1.49.53-2.17zm3.93-.72l3.15 3.15.02-.16c0-1.49-1.21-2.7-2.7-2.7l-.47.01z" fill="#A0A5C0"/>
//     </svg>
//   );
// }

// function Spinner() {
//   return (
//     <div style={{ width: 16, height: 16, border: "2px solid #ffffff44", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
//   );
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     background: "#ffffff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2rem 1rem",
//     fontFamily: "'DM Sans', sans-serif",
//     position: "relative",
//     overflow: "hidden",
//   },
//   grid: {
//     position: "absolute",
//     inset: 0,
//     backgroundImage: `linear-gradient(rgba(11,14,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,14,45,0.04) 1px, transparent 1px)`,
//     backgroundSize: "48px 48px",
//     pointerEvents: "none",
//   },
//   card: {
//     background: "#ffffff",
//     border: "1px solid #E8EBF5",
//     borderRadius: 24,
//     padding: "2.5rem 2rem",
//     width: "100%",
//     maxWidth: 440,
//     boxShadow: "0 8px 48px rgba(11,14,45,0.10)",
//     position: "relative",
//     zIndex: 1,
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "2rem",
//   },
//   iconWrap: {
//     width: 60,
//     height: 60,
//     borderRadius: 16,
//     background: "linear-gradient(135deg, #EEF0FA, #E4E7F8)",
//     border: "1px solid rgba(11,14,45,0.10)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 1.25rem",
//   },
//   title: {
//     fontFamily: "'Syne', sans-serif",
//     fontSize: "1.75rem",
//     fontWeight: 800,
//     color: "#0B0E2D",
//     letterSpacing: "-0.3px",
//     marginBottom: "0.4rem",
//   },
//   subtitle: {
//     fontSize: "0.875rem",
//     color: "#7B82A8",
//     lineHeight: 1.5,
//   },
//   field: {
//     marginBottom: "1.25rem",
//   },
//   label: {
//     display: "block",
//     fontSize: "0.78rem",
//     fontWeight: 500,
//     color: "#0B0E2D",
//     letterSpacing: "0.08em",
//     textTransform: "uppercase",
//     marginBottom: "0.5rem",
//   },
//   inputWrap: {
//     display: "flex",
//     alignItems: "center",
//     background: "#F5F6FC",
//     border: "1px solid #E0E3F0",
//     borderRadius: 12,
//     padding: "0 14px",
//     transition: "box-shadow 0.2s ease, border-color 0.2s ease",
//   },
//   inputIcon: {
//     flexShrink: 0,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     background: "transparent",
//     border: "none",
//     color: "#0B0E2D",
//     fontSize: "0.95rem",
//     padding: "14px 0",
//     fontFamily: "'DM Sans', sans-serif",
//   },
//   eye: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     padding: "4px",
//     display: "flex",
//     alignItems: "center",
//     flexShrink: 0,
//   },
//   strengthRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     marginTop: 8,
//   },
//   bars: {
//     display: "flex",
//     gap: 4,
//     flex: 1,
//   },
//   bar: {
//     height: 4,
//     flex: 1,
//     borderRadius: 4,
//   },
//   strengthLabel: {
//     fontSize: "0.75rem",
//     fontWeight: 600,
//     letterSpacing: "0.05em",
//     textTransform: "uppercase",
//     minWidth: 44,
//     textAlign: "right",
//   },
//   error: {
//     display: "block",
//     fontSize: "0.78rem",
//     color: "#FF4D6D",
//     marginTop: "0.4rem",
//     paddingLeft: "2px",
//   },
//   rules: {
//     background: "#F5F6FC",
//     border: "1px solid #E0E3F0",
//     borderRadius: 12,
//     padding: "1rem 1.1rem",
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "0.6rem",
//     marginBottom: "1.5rem",
//   },
//   ruleRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//   },
//   ruleIcon: {
//     width: 20,
//     height: 20,
//     borderRadius: 6,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//     transition: "all 0.25s ease",
//   },
//   ruleText: {
//     fontSize: "0.78rem",
//     transition: "color 0.25s ease",
//     lineHeight: 1.3,
//   },
//   btn: {
//     width: "100%",
//     padding: "15px",
//     borderRadius: 12,
//     border: "none",
//     background: "linear-gradient(135deg, #0B0E2D, #2D3278)",
//     color: "#fff",
//     fontSize: "0.95rem",
//     fontWeight: 600,
//     fontFamily: "'DM Sans', sans-serif",
//     letterSpacing: "0.02em",
//     transition: "opacity 0.2s ease, transform 0.15s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   hint: {
//     textAlign: "center",
//     fontSize: "0.8rem",
//     color: "#A0A5C0",
//     marginTop: "1rem",
//   },
// };

import { useState, useEffect, useRef } from "react";

// ─── API layer ────────────────────────────────────────────────────────────────
// Replace these base URLs / field names with your actual endpoints

export interface VerifyTokenResponse {
  valid: boolean;
  message?: string;   // e.g. "Token expired", "Invalid token", "User not found"
  code?: string;      // e.g. "TOKEN_EXPIRED" | "INVALID_TOKEN" | "USER_NOT_FOUND"
}

async function verifyToken(keycloak_id: string): Promise<VerifyTokenResponse> {
  const res = await fetch(`/api/verify-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keycloak_id }),
  });
  const data = await res.json();
  // Pass the full response back so the UI can react to message/code
  if (!res.ok) return { valid: false, message: data?.message, code: data?.code };
  return data;
}

async function setUserPasswordKeycloak(keycloak_id: string, password: string): Promise<void> {
  const res = await fetch(`/api/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keycloak_id, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? "Failed to set password. Please try again.");
  }
}
// ─────────────────────────────────────────────────────────────────────────────

type PageState = "verifying" | "invalid_token" | "ready" | "submitting" | "success" | "api_error";
type Strength  = "weak" | "fair" | "good" | "strong";

interface PasswordRule { label: string; test: (pw: string) => boolean }

const rules: PasswordRule[] = [
  { label: "At least 8 characters",  test: (pw) => pw.length >= 8 },
  { label: "Uppercase letter",        test: (pw) => /[A-Z]/.test(pw) },
  { label: "Lowercase letter",        test: (pw) => /[a-z]/.test(pw) },
  { label: "Number",                  test: (pw) => /\d/.test(pw) },
  { label: "Special character",       test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
];

function getStrength(pw: string): { level: Strength; score: number } {
  const score = rules.filter((r) => r.test(pw)).length;
  if (pw.length === 0) return { level: "weak",   score: 0 };
  if (score <= 2)      return { level: "weak",   score };
  if (score === 3)     return { level: "fair",   score };
  if (score === 4)     return { level: "good",   score };
  return                      { level: "strong", score };
}

const strengthConfig: Record<Strength, { label: string; color: string; bars: number }> = {
  weak:   { label: "Weak",   color: "#FF4D6D", bars: 1 },
  fair:   { label: "Fair",   color: "#FF9B3E", bars: 2 },
  good:   { label: "Good",   color: "#7BD4A6", bars: 3 },
  strong: { label: "Strong", color: "#4ECDC4", bars: 4 },
};

const orbs = [
  { size: 340, top: "-80px",    left: "-100px",  right: undefined, bottom: undefined,  opacity: 0.12, delay: "0s" },
  { size: 240, top: undefined,  left: undefined,  right: "-60px",  bottom: "-60px",    opacity: 0.09, delay: "2s" },
  { size: 160, top: "40%",      left: undefined,  right: "5%",     bottom: undefined,  opacity: 0.07, delay: "1s" },
];

function getKeycloakIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  // URL format: /auth/set-password?userId=47cdbe0a-2cbc-4ab3-befa-a34d73fb58e6
  return params.get("userId") ?? null;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SetPasswordPage() {
  const [pageState,  setPageState]  = useState<PageState>("verifying");
  const [keycloakId, setKeycloakId] = useState<string | null>(null);
  const [apiError,   setApiError]   = useState<string>("");
  const [tokenError, setTokenError] = useState<string>(""); // message from verifyToken API

  const [password,    setPassword]    = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused,     setFocused]     = useState<"pw" | "confirm" | null>(null);
  const [shake,       setShake]       = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Step 1 — read userId from URL (?userId=...), then call verifyToken
  useEffect(() => {
    const id = getKeycloakIdFromUrl();
    setKeycloakId(id);

    if (!id) {
      setTokenError("No user ID found in the link. Please use the link sent to your email.");
      setPageState("invalid_token");
      return;
    }

    verifyToken(id)
      .then((res) => {
        if (res.valid) {
          setPageState("ready");
        } else {
          // Use the API's own message if provided, fall back to a sensible default
          setTokenError(res.message ?? "This link is no longer valid.");
          setPageState("invalid_token");
        }
      })
      .catch(() => {
        setTokenError("Unable to verify your link. Please try again or request a new one.");
        setPageState("invalid_token");
      });
  }, []);

  // Entrance animation whenever card content switches
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = "translateY(20px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [pageState]);

  const { level } = getStrength(password);
  const cfg       = strengthConfig[level];
  const match     = password.length > 0 && confirm.length > 0 && password === confirm;
  const mismatch  = confirm.length > 0 && password !== confirm;
  const allPassed = rules.every((r) => r.test(password));
  const canSubmit = allPassed && match && pageState === "ready";

  // Step 2 — call setUserPasswordKeycloak on submit
  const handleSubmit = async () => {
    if (!canSubmit || !keycloakId) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setPageState("submitting");
    setApiError("");
    try {
      await setUserPasswordKeycloak(keycloakId, password);
      setPageState("success");
    } catch (err: any) {
      setApiError(err?.message ?? "Something went wrong. Please try again.");
      setPageState("api_error");
    }
  };

  const retrySubmit = () => { setPageState("ready"); setApiError(""); };

  return (
    <div style={s.page}>
      {orbs.map((orb, i) => (
        <div key={i} style={{
          position: "absolute", width: orb.size, height: orb.size, borderRadius: "50%",
          background: "radial-gradient(circle, #4ECDC4 0%, #6C63FF 60%, transparent 80%)",
          opacity: orb.opacity, top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
          filter: "blur(40px)", animation: "pulse 6s ease-in-out infinite",
          animationDelay: orb.delay, pointerEvents: "none",
        }} />
      ))}
      <div style={s.grid} />

      <div ref={cardRef} style={{ ...s.card, animation: shake ? "shake 0.5s ease" : undefined }}>

        {/* ── Verifying ── */}
        {pageState === "verifying" && <VerifyingState />}

        {/* ── Invalid / expired token ── */}
        {pageState === "invalid_token" && <InvalidTokenState message={tokenError} />}

        {/* ── API error (password set failed) ── */}
        {pageState === "api_error" && (
          <ApiErrorState message={apiError} onRetry={retrySubmit} />
        )}

        {/* ── Success ── */}
        {pageState === "success" && <SuccessState />}

        {/* ── Main form (ready + submitting) ── */}
        {(pageState === "ready" || pageState === "submitting") && (
          <>
            <div style={s.header}>
              <div style={s.iconWrap}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9.24 2 7 4.24 7 7v2H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V7c0-1.66 1.34-3 3-3zm0 9a2 2 0 110 4 2 2 0 010-4z" fill="#0B0E2D"/>
                </svg>
              </div>
              <h1 style={s.title}>Set New Password</h1>
              <p style={s.subtitle}>Create a strong password to secure your account</p>
            </div>

            {/* Password field */}
            <div style={s.field}>
              <label style={s.label}>New Password</label>
              <div style={{ ...s.inputWrap, boxShadow: focused === "pw" ? "0 0 0 2.5px #0B0E2D30" : "none" }}>
                <LockIcon />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("pw")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter new password"
                  disabled={pageState === "submitting"}
                  style={s.input}
                />
                <EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />
              </div>
              {password.length > 0 && (
                <div style={s.strengthRow}>
                  <div style={s.bars}>
                    {[1,2,3,4].map((n) => (
                      <div key={n} style={{ ...s.bar, background: n <= cfg.bars ? cfg.color : "#E0E3F0", transition: "background 0.3s ease" }} />
                    ))}
                  </div>
                  <span style={{ ...s.strengthLabel, color: cfg.color }}>{cfg.label}</span>
                </div>
              )}
            </div>

            {/* Confirm field */}
            <div style={s.field}>
              <label style={s.label}>Confirm Password</label>
              <div style={{ ...s.inputWrap, boxShadow: focused === "confirm" ? "0 0 0 2.5px #0B0E2D30" : "none", borderColor: mismatch ? "#FF4D6D66" : "#E0E3F0" }}>
                <CheckIcon color={match ? "#4ECDC4" : "#A0A5C0"} />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                  placeholder="Re-enter password"
                  disabled={pageState === "submitting"}
                  style={s.input}
                />
                <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
              </div>
              {mismatch && <span style={s.errorText}>Passwords do not match</span>}
              {match    && <span style={{ ...s.errorText, color: "#4ECDC4" }}>Passwords match ✓</span>}
            </div>

            {/* Rules checklist */}
            <div style={s.rules}>
              {rules.map((r) => {
                const passed = r.test(password);
                return (
                  <div key={r.label} style={s.ruleRow}>
                    <div style={{ ...s.ruleIcon, background: passed ? "#E6F9F7" : "#EDEEF8", border: `1px solid ${passed ? "#4ECDC4" : "#D0D4EC"}` }}>
                      {passed
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4ECDC4"/></svg>
                        : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B0B6D4" }} />
                      }
                    </div>
                    <span style={{ ...s.ruleText, color: passed ? "#1A7A72" : "#8A90B4" }}>{r.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{ ...s.btn, opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "not-allowed" }}
            >
              {pageState === "submitting"
                ? <><Spinner /> Setting password…</>
                : "Set Password"
              }
            </button>

            <p style={s.hint}>
              Having trouble?{" "}
              <span style={{ color: "#0B0E2D", fontWeight: 500, cursor: "pointer" }}>Contact support</span>
            </p>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        @keyframes pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes shake   { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes pop     { 0%{transform:scale(0.75);opacity:0} 80%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
        input::placeholder { color:#B0B6D4; }
        input:focus, button:focus { outline:none; }
        input:disabled { opacity:0.6; cursor:not-allowed; }
      `}</style>
    </div>
  );
}

// ─── State screens ────────────────────────────────────────────────────────────

function VerifyingState() {
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F0F2FB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <div style={{ width: 28, height: 28, border: "3px solid #E0E3F0", borderTop: "3px solid #0B0E2D", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#0B0E2D", marginBottom: "0.5rem" }}>Verifying your link</h2>
      <p style={{ color: "#7B82A8", fontSize: "0.9rem", lineHeight: 1.6 }}>Please wait while we confirm your reset link…</p>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: "1.5rem" }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8CCE0", animation: "shimmer 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function InvalidTokenState({ message }: { message: string }) {
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem", animation: "pop 0.45s ease forwards" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#FFF0F3", border: "1.5px solid #FFCCD5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#FF4D6D"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#0B0E2D", marginBottom: "0.5rem" }}>Link expired or invalid</h2>
      <p style={{ color: "#7B82A8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
        {message || "This password reset link is no longer valid."}
      </p>
      <div style={{ background: "#FFF0F3", border: "1px solid #FFCCD5", borderRadius: 10, padding: "0.6rem 1rem", marginBottom: "1.75rem" }}>
        <span style={{ fontSize: "0.8rem", color: "#CC2A47" }}>Please request a new password reset link to continue.</span>
      </div>
      <button style={{ ...s.btn, cursor: "pointer", opacity: 1 }}>Request a new link</button>
      <p style={{ ...s.hint, marginTop: "1rem" }}>
        Need help?{" "}
        <span style={{ color: "#0B0E2D", fontWeight: 500, cursor: "pointer" }}>Contact support</span>
      </p>
    </div>
  );
}

function ApiErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem", animation: "pop 0.45s ease forwards" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#FFF6EC", border: "1.5px solid #FFCFA0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#FF9B3E"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#0B0E2D", marginBottom: "0.5rem" }}>Something went wrong</h2>
      <p style={{ color: "#7B82A8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{message}</p>
      <div style={{ background: "#FFF6EC", border: "1px solid #FFCFA0", borderRadius: 10, padding: "0.6rem 1rem", marginBottom: "1.75rem" }}>
        <span style={{ fontSize: "0.8rem", color: "#B86000" }}>Your link is still valid — you can try again safely.</span>
      </div>
      <button onClick={onRetry} style={{ ...s.btn, cursor: "pointer", opacity: 1 }}>Try again</button>
    </div>
  );
}

function SuccessState() {
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem", animation: "pop 0.45s ease forwards" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E6F9F7", border: "1.5px solid #4ECDC4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4ECDC4"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#0B0E2D", marginBottom: "0.5rem" }}>Password updated!</h2>
      <p style={{ color: "#7B82A8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
        Your new password has been set successfully.<br/>You can now sign in with your new credentials.
      </p>
      <button style={{ ...s.btn, cursor: "pointer", opacity: 1 }}>Continue to Login</button>
    </div>
  );
}

// ─── Reusable atoms ───────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg style={{ flexShrink: 0, marginRight: 10 }} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#A0A5C0"/>
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg style={{ flexShrink: 0, marginRight: 10 }} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill={color}/>
    </svg>
  );
}

function EyeToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} style={s.eye} tabIndex={-1}>
      {show
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17C11.12 6.63 11.55 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zm6.53 6.53l1.55 1.55c-.05.2-.08.41-.08.62a2.7 2.7 0 002.7 2.7c.21 0 .41-.03.62-.08l1.55 1.55c-.68.33-1.43.53-2.17.53a4.5 4.5 0 01-4.5-4.5c0-.74.2-1.49.53-2.17zm3.93-.72l3.15 3.15.02-.16c0-1.49-1.21-2.7-2.7-2.7l-.47.01z" fill="#A0A5C0"/></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7.2a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4z" fill="#A0A5C0"/></svg>
      }
    </button>
  );
}

function Spinner() {
  return (
    <div style={{ width: 16, height: 16, border: "2px solid #ffffff44", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page:         { minHeight: "100vh", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" },
  grid:         { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,14,45,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(11,14,45,0.035) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" },
  card:         { background: "#ffffff", border: "1px solid #E8EBF5", borderRadius: 24, padding: "2.5rem 2rem", width: "100%", maxWidth: 440, boxShadow: "0 8px 48px rgba(11,14,45,0.10)", position: "relative", zIndex: 1 },
  header:       { textAlign: "center", marginBottom: "2rem" },
  iconWrap:     { width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#EEF0FA,#E4E7F8)", border: "1px solid rgba(11,14,45,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" },
  title:        { fontFamily: "'Syne',sans-serif", fontSize: "1.75rem", fontWeight: 800, color: "#0B0E2D", letterSpacing: "-0.3px", marginBottom: "0.4rem" },
  subtitle:     { fontSize: "0.875rem", color: "#7B82A8", lineHeight: 1.5 },
  field:        { marginBottom: "1.25rem" },
  label:        { display: "block", fontSize: "0.78rem", fontWeight: 500, color: "#0B0E2D", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" },
  inputWrap:    { display: "flex", alignItems: "center", background: "#F5F6FC", border: "1px solid #E0E3F0", borderRadius: 12, padding: "0 14px", transition: "box-shadow 0.2s ease, border-color 0.2s ease" },
  input:        { flex: 1, background: "transparent", border: "none", color: "#0B0E2D", fontSize: "0.95rem", padding: "14px 0", fontFamily: "'DM Sans',sans-serif" },
  eye:          { background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", flexShrink: 0 },
  strengthRow:  { display: "flex", alignItems: "center", gap: 10, marginTop: 8 },
  bars:         { display: "flex", gap: 4, flex: 1 },
  bar:          { height: 4, flex: 1, borderRadius: 4 },
  strengthLabel:{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", minWidth: 44, textAlign: "right" },
  errorText:    { display: "block", fontSize: "0.78rem", color: "#FF4D6D", marginTop: "0.4rem", paddingLeft: "2px" },
  rules:        { background: "#F5F6FC", border: "1px solid #E0E3F0", borderRadius: 12, padding: "1rem 1.1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.5rem" },
  ruleRow:      { display: "flex", alignItems: "center", gap: 8 },
  ruleIcon:     { width: 20, height: 20, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s ease" },
  ruleText:     { fontSize: "0.78rem", transition: "color 0.25s ease", lineHeight: 1.3 },
  btn:          { width: "100%", padding: "15px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#0B0E2D,#2D3278)", color: "#fff", fontSize: "0.95rem", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.02em", transition: "opacity 0.2s ease, transform 0.15s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  hint:         { textAlign: "center", fontSize: "0.8rem", color: "#A0A5C0", marginTop: "1rem" },
};