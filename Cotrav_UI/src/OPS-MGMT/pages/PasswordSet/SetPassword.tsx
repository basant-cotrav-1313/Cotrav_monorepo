import { useState, useEffect, useRef } from "react";

type Strength = "weak" | "fair" | "good" | "strong";

interface PasswordRule {
  label: string;
  test: (pw: string) => boolean;
}

const rules: PasswordRule[] = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "Number", test: (pw) => /\d/.test(pw) },
  { label: "Special character", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
];

function getStrength(pw: string): { level: Strength; score: number } {
  const score = rules.filter((r) => r.test(pw)).length;
  if (pw.length === 0) return { level: "weak", score: 0 };
  if (score <= 2) return { level: "weak", score };
  if (score === 3) return { level: "fair", score };
  if (score === 4) return { level: "good", score };
  return { level: "strong", score };
}

const strengthConfig: Record<Strength, { label: string; color: string; bars: number }> = {
  weak:   { label: "Weak",   color: "#FF4D6D", bars: 1 },
  fair:   { label: "Fair",   color: "#FF9B3E", bars: 2 },
  good:   { label: "Good",   color: "#7BD4A6", bars: 3 },
  strong: { label: "Strong", color: "#4ECDC4", bars: 4 },
};

// Floating orb positions
const orbs = [
  { size: 340, top: "-80px", left: "-100px", opacity: 0.12, delay: "0s" },
  { size: 240, bottom: "-60px", right: "-60px", opacity: 0.09, delay: "2s" },
  { size: 160, top: "40%", right: "5%", opacity: 0.07, delay: "1s" },
];

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<"pw" | "confirm" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const { level, score } = getStrength(password);
  const cfg = strengthConfig[level];
  const match = password && confirm && password === confirm;
  const mismatch = confirm.length > 0 && password !== confirm;
  const allPassed = rules.every((r) => r.test(password));
  const canSubmit = allPassed && match;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(24px)";
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            containerRef.current.style.opacity = "1";
            containerRef.current.style.transform = "translateY(0)";
          }
        }, 80);
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!canSubmit) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSuccess(true), 600);
  };

  return (
    <div style={styles.page}>
      {/* Background orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #4ECDC4 0%, #6C63FF 60%, transparent 80%)",
            opacity: orb.opacity,
            top: orb.top,
            left: orb.left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
            filter: "blur(40px)",
            animation: `pulse 6s ease-in-out infinite`,
            animationDelay: orb.delay,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div style={styles.grid} />

      {/* Card */}
      <div ref={containerRef} style={{ ...styles.card, animation: shake ? "shake 0.5s ease" : undefined }}>
        {success ? (
          <SuccessState />
        ) : (
          <>
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.iconWrap}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9.24 2 7 4.24 7 7v2H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V7c0-1.66 1.34-3 3-3zm0 9a2 2 0 110 4 2 2 0 010-4z" fill="#0B0E2D"/>
                </svg>
              </div>
              <h1 style={styles.title}>Set New Password</h1>
              <p style={styles.subtitle}>Create a strong password to secure your account</p>
            </div>

            {/* Password Field */}
            <div style={styles.field}>
              <label style={styles.label}>New Password</label>
              <div style={{ ...styles.inputWrap, boxShadow: focused === "pw" ? "0 0 0 2px #4ECDC466" : "none" }}>
                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#A0A5C0"/>
                </svg>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("pw")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter new password"
                  style={styles.input}
                />
                <button onClick={() => setShowPw(!showPw)} style={styles.eye} tabIndex={-1}>
                  {showPw ? <EyeOff /> : <EyeOn />}
                </button>
              </div>

              {/* Strength bars */}
              {password.length > 0 && (
                <div style={styles.strengthRow}>
                  <div style={styles.bars}>
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        style={{
                          ...styles.bar,
                          background: n <= cfg.bars ? cfg.color : "#E0E3F0",
                          transition: "background 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ ...styles.strengthLabel, color: cfg.color }}>{cfg.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Field */}
            <div style={styles.field}>
              <label style={styles.label}>Confirm Password</label>
              <div
                style={{
                  ...styles.inputWrap,
                  boxShadow: focused === "confirm" ? "0 0 0 2px #4ECDC466" : "none",
                  borderColor: mismatch ? "#FF4D6D55" : "transparent",
                }}
              >
                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill={match ? "#4ECDC4" : "#A0A5C0"}/>
                </svg>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                  placeholder="Re-enter password"
                  style={styles.input}
                />
                <button onClick={() => setShowConfirm(!showConfirm)} style={styles.eye} tabIndex={-1}>
                  {showConfirm ? <EyeOff /> : <EyeOn />}
                </button>
              </div>
              {mismatch && (
                <span style={styles.error}>Passwords do not match</span>
              )}
              {match && (
                <span style={{ ...styles.error, color: "#4ECDC4" }}>Passwords match ✓</span>
              )}
            </div>

            {/* Rules */}
            <div style={styles.rules}>
              {rules.map((r) => {
                const passed = r.test(password);
                return (
                  <div key={r.label} style={styles.ruleRow}>
                    <div
                      style={{
                        ...styles.ruleIcon,
                        background: passed ? "#E6F9F7" : "#EDEEF8",
                        border: `1px solid ${passed ? "#4ECDC4" : "#D0D4EC"}`,
                      }}
                    >
                      {passed ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4ECDC4"/>
                        </svg>
                      ) : (
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B0B6D4" }} />
                      )}
                    </div>
                    <span style={{ ...styles.ruleText, color: passed ? "#1A7A72" : "#8A90B4" }}>
                      {r.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                ...styles.btn,
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? "pointer" : "not-allowed",
                transform: submitted ? "scale(0.97)" : "scale(1)",
              }}
            >
              {submitted ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Spinner /> Setting password...
                </span>
              ) : (
                "Set Password"
              )}
            </button>

            <p style={styles.hint}>
              Remember to store it somewhere safe.{" "}
              <span style={{ color: "#0B0E2D", fontWeight: 500, cursor: "pointer" }}>Need help?</span>
            </p>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes successPop { 0%{transform:scale(0.7);opacity:0} 80%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #B0B6D4; }
        input:focus { outline: none; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}

function SuccessState() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem", animation: "successPop 0.5s ease forwards" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#E6F9F7", border: "2px solid #4ECDC4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4ECDC4"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", color: "#0B0E2D", marginBottom: "0.75rem" }}>Password Updated!</h2>
      <p style={{ color: "#7B82A8", fontSize: "0.95rem", lineHeight: 1.6 }}>Your new password has been set successfully.<br/>You can now log in with your new credentials.</p>
      <button style={{ ...styles.btn, marginTop: "2rem", opacity: 1, cursor: "pointer" }}>
        Continue to Login
      </button>
    </div>
  );
}

function EyeOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7.2a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4z" fill="#A0A5C0"/>
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17C11.12 6.63 11.55 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zm6.53 6.53l1.55 1.55c-.05.2-.08.41-.08.62a2.7 2.7 0 002.7 2.7c.21 0 .41-.03.62-.08l1.55 1.55c-.68.33-1.43.53-2.17.53a4.5 4.5 0 01-4.5-4.5c0-.74.2-1.49.53-2.17zm3.93-.72l3.15 3.15.02-.16c0-1.49-1.21-2.7-2.7-2.7l-.47.01z" fill="#A0A5C0"/>
    </svg>
  );
}

function Spinner() {
  return (
    <div style={{ width: 16, height: 16, border: "2px solid #ffffff44", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(11,14,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,14,45,0.04) 1px, transparent 1px)`,
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #E8EBF5",
    borderRadius: 24,
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 8px 48px rgba(11,14,45,0.10)",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    background: "linear-gradient(135deg, #EEF0FA, #E4E7F8)",
    border: "1px solid rgba(11,14,45,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "1.75rem",
    fontWeight: 800,
    color: "#0B0E2D",
    letterSpacing: "-0.3px",
    marginBottom: "0.4rem",
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#7B82A8",
    lineHeight: 1.5,
  },
  field: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "#0B0E2D",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    background: "#F5F6FC",
    border: "1px solid #E0E3F0",
    borderRadius: 12,
    padding: "0 14px",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
  },
  inputIcon: {
    flexShrink: 0,
    marginRight: 10,
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#0B0E2D",
    fontSize: "0.95rem",
    padding: "14px 0",
    fontFamily: "'DM Sans', sans-serif",
  },
  eye: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  strengthRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  bars: {
    display: "flex",
    gap: 4,
    flex: 1,
  },
  bar: {
    height: 4,
    flex: 1,
    borderRadius: 4,
  },
  strengthLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    minWidth: 44,
    textAlign: "right",
  },
  error: {
    display: "block",
    fontSize: "0.78rem",
    color: "#FF4D6D",
    marginTop: "0.4rem",
    paddingLeft: "2px",
  },
  rules: {
    background: "#F5F6FC",
    border: "1px solid #E0E3F0",
    borderRadius: 12,
    padding: "1rem 1.1rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.6rem",
    marginBottom: "1.5rem",
  },
  ruleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  ruleIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.25s ease",
  },
  ruleText: {
    fontSize: "0.78rem",
    transition: "color 0.25s ease",
    lineHeight: 1.3,
  },
  btn: {
    width: "100%",
    padding: "15px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #0B0E2D, #2D3278)",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s ease, transform 0.15s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  hint: {
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#A0A5C0",
    marginTop: "1rem",
  },
};