import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/Cotrav_Logo.png";
import { saveOpsAuthSession } from "@/OPS-MGMT/auth/token";
import OpsFooter from "@/OPS-MGMT/components/layout/Footer";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL ?? "http://localhost:4001";
  const authRealm = import.meta.env.VITE_AUTH_REALM ?? "cotrav-OPS";
  const authClientId = import.meta.env.VITE_AUTH_CLIENT_ID ?? "cotrav-OPS-app";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const endpoint = `${authBaseUrl.replace(/\/$/, "")}/auth/login`;

    let payload: Record<string, string>;

    if (loginMethod === "password") {
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Email and password are required.");
        return;
      }

      payload = {
        realm: authRealm,
        clientId: authClientId,
        email: email.trim(),
        password: password.trim()
      };
    } else {
      const identifierValue = identifier.trim();
      if (!identifierValue || !otp.trim()) {
        setErrorMessage("Email/mobile and OTP are required.");
        return;
      }

      const isEmail = identifierValue.includes("@");
      payload = isEmail
        ? {
            realm: authRealm,
            clientId: authClientId,
            email: identifierValue,
            otp: otp.trim()
          }
        : {
            realm: authRealm,
            clientId: authClientId,
            username: identifierValue,
            otp: otp.trim()
          };
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        errorCode?: string;
        access_token?: string;
      };

      if (!response.ok) {
        setErrorMessage(data.message ?? "Login failed. Please check credentials/OTP.");
        return;
      }

      if (data.access_token) {
        saveOpsAuthSession(data.access_token, authClientId);
        setSuccessMessage("Login successful.");
        navigate("/ops-mgmt/dashboard", { replace: true });
        return;
      }

      setSuccessMessage("Login request submitted successfully.");
    } catch {
      setErrorMessage("Unable to reach auth service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-[#243268] shadow-[0_25px_80px_rgba(0,0,0,0.45)] grid grid-cols-1 lg:grid-cols-2 bg-[#0B0E2D]">
          <section className="relative bg-gradient-to-br from-[#0B0E2D] via-[#11183D] to-[#162456] text-white p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#243268]">
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#1F8FD7]/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#52B6F2]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
              <img src={logo} alt="CoTrav Logo" className="h-10 w-auto" />

              <div className="mt-8">
                <div className="w-full border-t border-slate-500/70" />

                <h1 className="mt-5 text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                  OPS Management
                  <span className="block text-[#52B6F2]">Portal</span>
                </h1>

                <p className="mt-5 max-w-lg text-sm md:text-base leading-7 text-slate-300">
                  Manage corporate travel operations, approvals, escalations, and booking workflows from one secure and
                  unified platform.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Bookings</p>
                  <p className="mt-2 text-lg font-semibold text-white">Centralized</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Approvals</p>
                  <p className="mt-2 text-lg font-semibold text-white">Streamlined</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Access</p>
                  <p className="mt-2 text-lg font-semibold text-white">Secure</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-7">
              <p className="text-sm text-slate-400">Secure access for authorized operations users only.</p>
            </div>
          </section>

          <section className="bg-[#F8FAFC] text-slate-900 p-6 md:p-8 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#0B0E2D]">Sign In</h2>
                <p className="mt-2 text-sm text-slate-500">Use your operations credentials to continue.</p>
              </div>

              <div className="grid grid-cols-2 rounded-2xl bg-[#EAF2FB] border border-[#C8D9F0] p-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setLoginMethod("password")}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                    loginMethod === "password"
                      ? "bg-[#0B0E2D] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("otp")}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                    loginMethod === "otp"
                      ? "bg-[#0B0E2D] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  OTP
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(2,6,23,0.06)] p-5">
                <form className="space-y-5" onSubmit={handleLogin}>
                  {loginMethod === "password" ? (
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Work Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@cotrav.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F8FD7] focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="identifier" className="block text-sm font-medium text-slate-700">
                        Email or Mobile Number
                      </label>
                      <input
                        id="identifier"
                        type="text"
                        inputMode="email"
                        placeholder="name@cotrav.com or 9876543210"
                        value={identifier}
                        onChange={(event) => setIdentifier(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F8FD7] focus:border-transparent"
                      />
                    </div>
                  )}

                  {loginMethod === "password" ? (
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F8FD7] focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                          OTP
                        </label>
                        <button type="button" className="text-xs font-semibold text-[#1F8FD7] hover:text-[#0F6DAA] hover:underline">
                          Send OTP
                        </button>
                      </div>
                      <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F8FD7] focus:border-transparent"
                      />
                    </div>
                  )}

                  {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
                  {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-[#0B0E2D] to-[#162456] hover:from-[#09102B] hover:to-[#0F1A45] text-white font-semibold py-3 transition shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? "Signing in..." : loginMethod === "password" ? "Login with Password" : "Login with OTP"}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <a href="#" className="font-medium text-[#1F8FD7] hover:underline">
                    Forgot password?
                  </a>
                  <Link to="/" className="text-slate-500 hover:text-slate-700">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <OpsFooter />
    </div>
  );
};

export default LoginPage;
