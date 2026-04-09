// import type { RealmTab, LastImport } from "../types/userImport.types";
// import { REALM_META } from "../constants/userImport.constants";

// type Props = {
//   activeRealm: RealmTab;
//   identifierType: string;
//   recordCount: number;
//   dryRun: boolean;
//   lastImport: LastImport;
// };

// const ImportSummary = ({
//   activeRealm,
//   identifierType,
//   recordCount,
//   dryRun,
//   lastImport
// }: Props) => (
//   <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//     <h2 className="text-sm font-black uppercase tracking-wide text-slate-600">
//       Import Summary
//     </h2>

//     <dl className="mt-3 space-y-2 text-sm">
//       <div className="flex items-center justify-between">
//         <dt className="text-slate-500">Realm</dt>
//         <dd className="font-semibold text-slate-800">
//           {REALM_META[activeRealm].label}
//         </dd>
//       </div>
//       <div className="flex items-center justify-between">
//         <dt className="text-slate-500">Identifier Type</dt>
//         <dd className="font-semibold text-slate-800">{identifierType}</dd>
//       </div>
//       <div className="flex items-center justify-between">
//         <dt className="text-slate-500">Records</dt>
//         <dd className="font-semibold text-slate-800">{recordCount}</dd>
//       </div>
//       <div className="flex items-center justify-between">
//         <dt className="text-slate-500">Mode</dt>
//         <dd className="font-semibold text-slate-800">
//           {dryRun ? "Dry-run" : "Live import"}
//         </dd>
//       </div>
//     </dl>

//     {lastImport ? (
//       <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
//         Batch queued for {REALM_META[lastImport.realm].label}: {lastImport.total} users.
//       </p>
//     ) : (
//       <p className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
//         Submit the form to queue your first import batch.
//       </p>
//     )}
//   </div>
// );

// export default ImportSummary;


import type { RealmTab, LastImport } from "../types/userImport.types";
import { REALM_META } from "../constants/userImport.constants";

type ImportResult = {
  total_existing: number;
  total_success: number;
  total_duplicate: number;
  total_failed: number;
};

type Props = {
  activeRealm: RealmTab;
  identifierType: string;
  recordCount: number;
  dryRun: boolean;
  lastImport: LastImport;
  importResult?: ImportResult | null;
};

const ImportSummary = ({
  activeRealm,
  identifierType,
  recordCount,
  dryRun,
  lastImport,
  importResult,
}: Props) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <h2 className="text-sm font-black uppercase tracking-wide text-slate-600">
      Import Summary
    </h2>

    <dl className="mt-3 space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <dt className="text-slate-500">Realm</dt>
        <dd className="font-semibold text-slate-800">
          {REALM_META[activeRealm].label}
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-slate-500">Identifier Type</dt>
        <dd className="font-semibold text-slate-800">{identifierType}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-slate-500">Records</dt>
        <dd className="font-semibold text-slate-800">{recordCount}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-slate-500">Mode</dt>
        <dd className="font-semibold text-slate-800">
          {dryRun ? "Dry-run" : "Live import"}
        </dd>
      </div>
    </dl>

    {/* API result breakdown */}
    {importResult ? (
      <dl className="mt-4 space-y-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs">
        <h3 className="mb-2 font-black uppercase tracking-wide text-blue-700">
          Last Import Result
        </h3>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Success</dt>
          <dd className="font-bold text-emerald-600">{importResult.total_success}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Existing</dt>
          <dd className="font-bold text-slate-700">{importResult.total_existing}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Duplicate</dt>
          <dd className="font-bold text-amber-600">{importResult.total_duplicate}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Failed</dt>
          <dd className="font-bold text-red-600">{importResult.total_failed}</dd>
        </div>
      </dl>
    ) : lastImport ? (
      <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
        Batch queued for {REALM_META[lastImport.realm].label}: {lastImport.total} users.
      </p>
    ) : (
      <p className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
        Submit the form to queue your first import batch.
      </p>
    )}
  </div>
);

export default ImportSummary;