// import { KeyRound } from "lucide-react";
// type Props = {
//   username: string;
//   onClick: (username: string) => void;
// };

// const RoleAccessButton = ({ username, onClick }: Props) => (
//   <button
//     type="button"
//     onClick={() => onClick(username)}
//     className="group inline-flex items-center gap-1.5 rounded-lg border border-[#0B0E2D]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#0B0E2D] transition-all duration-150 hover:border-[#0B0E2D] hover:bg-[#0B0E2D] hover:text-white active:scale-95 cursor-pointer"
//   >
//     {/* <svg
//       className="h-3 w-3 transition-colors duration-150 group-hover:text-white"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2.2}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
//       />
//     </svg> */}

//     <KeyRound className="h-3 w-3" />
//     Access
//   </button>
// );

// export default RoleAccessButton;



import { useState } from "react";
import { KeyRound } from "lucide-react";
import RoleAuditModal from "./RoleAuditModal";

type Props = {
  username: string;
  keycloakUserId: string | null;
  firstName:string;
  lastName:string;

};

const RoleAccessButton = ({ username, keycloakUserId,firstName ,lastName }: Props) => {
  const [open, setOpen] = useState(false);

  if (!keycloakUserId) return <span className="text-slate-300">—</span>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B0E2D]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#0B0E2D] transition-all duration-150 hover:border-[#0B0E2D] hover:bg-[#0B0E2D] hover:text-white active:scale-95 cursor-pointer"
      >
        <KeyRound className="h-3 w-3" />
        Access
      </button>

      {open && (
        <RoleAuditModal
          username={username}
          keycloakUserId={keycloakUserId}
          firstName={firstName}   
          lastName={lastName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default RoleAccessButton;