import { useState, useEffect } from "react";

type Props = {
  isImporting: boolean;
};

const STEPS = [
  { progress: 10, message: "Connecting to Keycloak..." },
  { progress: 30, message: "Validating identifiers..." },
  { progress: 55, message: "Syncing user records..." },
  { progress: 80, message: "Finalizing import..." },
  { progress: 95, message: "Almost done..." },
];

const ImportLoader = ({ isImporting }: Props) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(STEPS[0].message);

  useEffect(() => {
    if (!isImporting) {
      setProgress(0);
      setMessage(STEPS[0].message);
      return;
    }

    let i = 0;
    const iv = setInterval(() => {
      if (i < STEPS.length) {
        setProgress(STEPS[i].progress);
        setMessage(STEPS[i].message);
        i++;
      } else {
        clearInterval(iv);
      }
    }, 900);

    return () => clearInterval(iv);
  }, [isImporting]);

  if (!isImporting) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0E2D]/60 backdrop-blur-sm">
      <div className="flex min-w-[280px] flex-col items-center gap-5 rounded-2xl border border-[#0B0E2D]/10 bg-white px-10 py-9 shadow-2xl">

        {/* Spinner with icon center */}
        <div className="relative h-[56px] w-[56px]">
          <svg viewBox="0 0 56 56" className="h-[56px] w-[56px]" xmlns="http://www.w3.org/2000/svg">
            {/* Track */}
            <circle cx="28" cy="28" r="24" fill="none" stroke="#0B0E2D" strokeOpacity="0.08" strokeWidth="3.5" />
            {/* Spinner arc */}
            <circle cx="28" cy="28" r="24" fill="none" stroke="#0B0E2D" strokeWidth="3.5"
              strokeLinecap="round" strokeDasharray="65 85">
              <animateTransform attributeName="transform" type="rotate"
                from="0 28 28" to="360 28 28" dur="1.1s" repeatCount="indefinite" />
            </circle>
          </svg>
          {/* Upload icon center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#0B0E2D" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 16v-8m0 0-3 3m3-3 3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-black tracking-tight text-[#0B0E2D]">Importing Users</p>
          <p className="mt-1 text-xs font-medium text-[#0B0E2D]/50">{message}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full overflow-hidden rounded-full bg-[#0B0E2D]/8 h-1.5">
          <div
            className="h-1.5 rounded-full bg-[#0B0E2D] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <p className="text-xs font-semibold text-[#0B0E2D]/40">{progress}% complete</p>
      </div>
    </div>
  );
};

export default ImportLoader;