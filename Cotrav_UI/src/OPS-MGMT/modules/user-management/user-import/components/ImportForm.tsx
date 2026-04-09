import React from "react";
import type { RealmTab } from "../types/userImport.types";
import { REALM_META } from "../constants/userImport.constants";

type Props = {
  activeRealm: RealmTab;
  batchName: string;
  setBatchName: (value: string) => void;
  identifierType: string;
  setIdentifierType: (value: string) => void;
  identifiers: string;
  setIdentifiers: (value: string) => void;
  dryRun: boolean;
  setDryRun: (value: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ImportForm = ({
  activeRealm,
  batchName,
  setBatchName,
  identifierType,
  setIdentifierType,
  identifiers,
  setIdentifiers,
  dryRun,
  setDryRun,
  onSubmit
}: Props) => (
  <form onSubmit={onSubmit}>  {/* ✅ grid removed from here */}
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-800">
        {REALM_META[activeRealm].note}
      </p>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Batch Name
        </span>
        <input
          value={batchName}
          onChange={(event) => setBatchName(event.target.value)}
          placeholder={`Example: ${REALM_META[activeRealm].label}-march-import`}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-[#0A7CC5] focus:outline-none"
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Source
          </span>
          <input
            value="Legacy Database"
            readOnly
            className="w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Identifier Type
          </span>
          <select
            value={identifierType}
            onChange={(event) => setIdentifierType(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-[#0A7CC5] focus:outline-none"
          >
            <option value="email">Email</option>
            <option value="employee_id">Employee ID</option>
            <option value="phone">Phone</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Users to Import (comma/new line separated)
        </span>
        <textarea
          value={identifiers}
          onChange={(event) => setIdentifiers(event.target.value)}
          rows={7}
          placeholder="user1@example.com&#10;user2@example.com"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-[#0A7CC5] focus:outline-none"
          required
        />
      </label>

      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={dryRun}
          onChange={(event) => setDryRun(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#0A7CC5] focus:ring-[#0A7CC5]"
        />
        Run as dry-run (validate only, do not create users)
      </label>

      <button
        type="submit"
        className="rounded-md bg-[#0A7CC5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#08679f]"
      >
        {dryRun ? "Validate Import Batch" : "Import to Keycloak Realm"}
      </button>
    </div>
  </form>
);

export default ImportForm;
