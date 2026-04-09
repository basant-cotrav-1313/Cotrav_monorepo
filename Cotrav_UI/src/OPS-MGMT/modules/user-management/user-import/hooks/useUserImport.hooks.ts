// import { useState, useMemo } from "react";
// import type { RealmTab, LastImport } from "../types/userImport.types";
// import { MOCK_IMPORTED_USERS } from "../constants/userImport.constants";

// export const useUserImport = () => {
//   const [activeRealm, setActiveRealm] = useState<RealmTab>("ops");
//   const [batchName, setBatchName] = useState("");
//   const [identifierType, setIdentifierType] = useState("email");
//   const [identifiers, setIdentifiers] = useState("");
//   const [dryRun, setDryRun] = useState(true);
//   const [lastImport, setLastImport] = useState<LastImport>(null);

//   const normalizedIdentifiers = useMemo(
//     () =>
//       identifiers
//         .split(/\r?\n|,/)
//         .map((value) => value.trim())
//         .filter(Boolean),
//     [identifiers]
//   );

//   const visibleImportedUsers = useMemo(
//     () => MOCK_IMPORTED_USERS.filter((user) => user.realm === activeRealm),
//     [activeRealm]
//   );

//   const handleImport = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLastImport({ realm: activeRealm, total: normalizedIdentifiers.length });
//   };

//   return {
//     activeRealm,
//     setActiveRealm,
//     batchName,
//     setBatchName,
//     identifierType,
//     setIdentifierType,
//     identifiers,
//     setIdentifiers,
//     dryRun,
//     setDryRun,
//     lastImport,
//     normalizedIdentifiers,
//     visibleImportedUsers,
//     handleImport
//   };
// };


// import { useState, useMemo } from "react";
// import axios, { AxiosError } from "axios";
// import type { RealmTab, LastImport } from "../types/userImport.types";
// import { MOCK_IMPORTED_USERS } from "../constants/userImport.constants";

// interface ImportApiResponse {
//   success: string;
//   error: string;
//   message: string;
//   response: {
//     total_existing: number;
//     total_success: number;
//     total_duplicate: number;
//     total_failed: number;
//   };
// }

// export const useUserImport = () => {
//   const [activeRealm, setActiveRealm] = useState<RealmTab>("ops");
//   const [batchName, setBatchName] = useState("");
//   const [identifierType, setIdentifierType] = useState("email");
//   const [identifiers, setIdentifiers] = useState("");
//   const [dryRun, setDryRun] = useState(true);
//   const [lastImport, setLastImport] = useState<LastImport>(null);
//   const [isImporting, setIsImporting] = useState(false);
//   const [importError, setImportError] = useState<string | null>(null);
//   const [importResult, setImportResult] = useState<ImportApiResponse["response"] | null>(null);

//   const normalizedIdentifiers = useMemo(
//     () =>
//       identifiers
//         .split(/\r?\n|,/)
//         .map((value) => value.trim())
//         .filter(Boolean),
//     [identifiers]
//   );

//   const visibleImportedUsers = useMemo(
//     () => MOCK_IMPORTED_USERS.filter((user) => user.realm === activeRealm),
//     [activeRealm]
//   );

//   const handleImport = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsImporting(true);
//     setImportError(null);
//     setImportResult(null);

//     try {
//       const { data } = await axios.post<ImportApiResponse>(
//         "http://192.168.1.47/api/user_management/importAllUserOPSInKeyclok",
//         {
//           realm: activeRealm,
//           batchName,
//           identifierType,
//           identifiers: normalizedIdentifiers,
//           dryRun,
//         }
//       );

//       if (data.success !== "1") {
//         throw new Error(data.error || "Import failed");
//       }

//       setImportResult(data.response);
//       setLastImport({ realm: activeRealm, total: normalizedIdentifiers.length });
//     } catch (err) {
//       const axiosError = err as AxiosError<ImportApiResponse>;
//       const message =
//         axiosError.response?.data?.error ||
//         axiosError.message ||
//         "An unexpected error occurred";
//       setImportError(message);
//     } finally {
//       setIsImporting(false);
//     }
    
//   };

   

//   return {
//     activeRealm,
//     setActiveRealm,
//     batchName,
//     setBatchName,
//     identifierType,
//     setIdentifierType,
//     identifiers,
//     setIdentifiers,
//     dryRun,
//     setDryRun,
//     lastImport,
//     normalizedIdentifiers,
//     visibleImportedUsers,
//     handleImport,
//     isImporting,
//     importError,
//     importResult,
//   };
// };



// import { useState, useMemo } from "react";
// import axios, { AxiosError } from "axios";
// import type { RealmTab, LastImport } from "../types/userImport.types";
// // import { MOCK_IMPORTED_USERS } from "../constants/userImport.constants";

// interface ImportApiResponse {
//   success: string;
//   error: string;
//   message: string;
//   response: {
//     total_existing: number;
//     total_success: number;
//     total_duplicate: number;
//     total_failed: number;
//   };
// }

// type UseUserImportOptions = {
//   onImportSuccess?: () => void;
// };

// // export const useUserImport = () => {
// export const useUserImport = ({ onImportSuccess }: UseUserImportOptions = {}) => {
//   const [activeRealm, setActiveRealm] = useState<RealmTab>("ops");
//   const [batchName, setBatchName] = useState("");
//   const [identifierType, setIdentifierType] = useState("email");
//   const [identifiers, setIdentifiers] = useState("");
//   const [dryRun, setDryRun] = useState(true);
//   const [lastImport, setLastImport] = useState<LastImport>(null);
//   const [isImporting, setIsImporting] = useState(false);
//   const [importError, setImportError] = useState<string | null>(null);
//   const [importResult, setImportResult] = useState<ImportApiResponse["response"] | null>(null);

//   const normalizedIdentifiers = useMemo(
//     () =>
//       identifiers
//         .split(/\r?\n|,/)
//         .map((value) => value.trim())
//         .filter(Boolean),
//     [identifiers]
//   );

//   // const visibleImportedUsers = useMemo(
//   //   () => MOCK_IMPORTED_USERS.filter((user) => user.realm === activeRealm),
//   //   [activeRealm]
//   // );

//   // ← core logic, no event needed
//   const triggerImport = async () => {
//     setIsImporting(true);
//     setImportError(null);
//     setImportResult(null);

//     try {
//       const { data } = await axios.post<ImportApiResponse>(
//         "/api/user_management/importAllUserOPSInKeyclok",
//         {
//           realm: activeRealm,
//           batchName,
//           identifierType,
//           identifiers: normalizedIdentifiers,
//           dryRun,
//         }
//       );

//       if (data.success !== "1") {
//         throw new Error(data.error || "Import failed");
//       }

//       setImportResult(data.response);
//       setLastImport({ realm: activeRealm, total: normalizedIdentifiers.length });
//       onImportSuccess?.();
//     } catch (err) {
//       const axiosError = err as AxiosError<ImportApiResponse>;
//       const message =
//         axiosError.response?.data?.error ||
//         axiosError.message ||
//         "An unexpected error occurred";
//       setImportError(message);
//     } finally {
//       setIsImporting(false);
//     }
//   };

//   // ← for ImportForm's onSubmit
//   const handleImport = (event: React.SyntheticEvent) => {
//     event.preventDefault();
//     triggerImport();
//   };

//   return {
//     activeRealm, setActiveRealm,
//     batchName, setBatchName,
//     identifierType, setIdentifierType,
//     identifiers, setIdentifiers,
//     dryRun, setDryRun,
//     lastImport,
//     normalizedIdentifiers,
//     // visibleImportedUsers,
//     handleImport,   // for ImportForm onSubmit
//     triggerImport,  // for ImportButton onClick
//     isImporting,
//     importError,
//     importResult,
//   };
// };


import { useState, useMemo } from "react";
import axios, { AxiosError } from "axios";
import type { RealmTab, LastImport } from "../types/userImport.types";

interface ImportApiResponse {
  success: string;
  error: string;
  message: string;
  response: {
    total_existing: number;
    total_success: number;
    total_duplicate: number;
    total_failed: number;
  };
}

type UseUserImportOptions = {
  activeRealm: RealmTab;           // ← now required, passed from page
  onImportSuccess?: () => void;
};

export const useUserImport = ({ activeRealm, onImportSuccess }: UseUserImportOptions) => {
  // ← removed useState for activeRealm
  const [batchName, setBatchName] = useState("");
  const [identifierType, setIdentifierType] = useState("email");
  const [identifiers, setIdentifiers] = useState("");
  const [dryRun, setDryRun] = useState(true);
  const [lastImport, setLastImport] = useState<LastImport>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<ImportApiResponse["response"] | null>(null);

  const normalizedIdentifiers = useMemo(
    () =>
      identifiers
        .split(/\r?\n|,/)
        .map((value) => value.trim())
        .filter(Boolean),
    [identifiers]
  );

  const triggerImport = async () => {
    setIsImporting(true);
    setImportError(null);
    setImportResult(null);

    try {
      const { data } = await axios.post<ImportApiResponse>(
        "/api/user_management/importAllUserOPSInKeyclok",
        {
          realm: activeRealm,
          batchName,
          identifierType,
          identifiers: normalizedIdentifiers,
          dryRun,
        }
      );

      if (data.success !== "1") {
        throw new Error(data.error || "Import failed");
      }

      setImportResult(data.response);
      setLastImport({ realm: activeRealm, total: normalizedIdentifiers.length });
      onImportSuccess?.();
    } catch (err) {
      const axiosError = err as AxiosError<ImportApiResponse>;
      setImportError(
        axiosError.response?.data?.error ||
        axiosError.message ||
        "An unexpected error occurred"
      );
    } finally {
      setIsImporting(false);
    }
  };

  const handleImport = (event: React.SyntheticEvent) => {
    event.preventDefault();
    triggerImport();
  };

  return {
    batchName, setBatchName,
    identifierType, setIdentifierType,
    identifiers, setIdentifiers,
    dryRun, setDryRun,
    lastImport,
    normalizedIdentifiers,
    handleImport,
    triggerImport,
    isImporting,
    importError,
    importResult,
  };
};