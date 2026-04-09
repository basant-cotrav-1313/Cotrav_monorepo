import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import KeycloakPermissionsModal from "./KeycloakPermissionsModal";

type Props = {
  username: string;
  keycloakUserId: string | null;
  firstName: string;
  lastName: string;
};

const KeycloakPermissionsButton = ({ username, keycloakUserId, firstName, lastName }: Props) => {
  const [open, setOpen] = useState(false);

  if (!keycloakUserId) return <span className="text-slate-300">—</span>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B0E2D]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#0B0E2D] transition-all duration-150 hover:border-[#0B0E2D] hover:bg-[#0B0E2D] hover:text-white active:scale-95 cursor-pointer"
      >
        <ShieldCheck className="h-3 w-3" />
        Permissions
      </button>

      {open && (
        <KeycloakPermissionsModal
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

export default KeycloakPermissionsButton;