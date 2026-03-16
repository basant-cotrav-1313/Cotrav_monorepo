import React, { useMemo, useState } from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

type RealmTab = "ops" | "client";
type ImportStatus = "Imported" | "Failed" | "Pending";

type ImportedUser = {
  realm: RealmTab;
  status: ImportStatus;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

const REALM_META: Record<RealmTab, { label: string; note: string }> = {
  ops: {
    label: "OPS",
    note: "Import internal operations users into the OPS Keycloak realm."
  },
  client: {
    label: "Client",
    note: "Import customer-side users into the Client Keycloak realm."
  }
};

const IMPORTED_USERS: ImportedUser[] = [
  {
    realm: "ops",
    status: "Imported",
    username: "ops.anita",
    firstName: "Anita",
    lastName: "Sharma",
    email: "anita.sharma@cotrav.com",
    mobile: "+91-9876500011"
  },
  {
    realm: "ops",
    status: "Failed",
    username: "ops.rohan",
    firstName: "Rohan",
    lastName: "Yadav",
    email: "rohan.yadav@cotrav.com",
    mobile: "+91-9876500022"
  },
  {
    realm: "ops",
    status: "Pending",
    username: "ops.megha",
    firstName: "Megha",
    lastName: "Kale",
    email: "megha.kale@cotrav.com",
    mobile: "+91-9876500033"
  },
  {
    realm: "client",
    status: "Imported",
    username: "client.aman",
    firstName: "Aman",
    lastName: "Gupta",
    email: "aman.gupta@clientcorp.com",
    mobile: "+91-9899900011"
  },
  {
    realm: "client",
    status: "Imported",
    username: "client.neha",
    firstName: "Neha",
    lastName: "Sethi",
    email: "neha.sethi@clientcorp.com",
    mobile: "+91-9899900022"
  },
  {
    realm: "client",
    status: "Failed",
    username: "client.samir",
    firstName: "Samir",
    lastName: "Khan",
    email: "samir.khan@clientcorp.com",
    mobile: "+91-9899900033"
  }
];

const statusClass: Record<ImportStatus, string> = {
  Imported: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Failed: "border-rose-200 bg-rose-50 text-rose-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700"
};

const UserImportPage: React.FC = () => {
  const [activeRealm, setActiveRealm] = useState<RealmTab>("ops");
  const [batchName, setBatchName] = useState("");
  const [identifierType, setIdentifierType] = useState("email");
  const [identifiers, setIdentifiers] = useState("");
  const [dryRun, setDryRun] = useState(true);
  const [lastImport, setLastImport] = useState<{ realm: RealmTab; total: number } | null>(null);

  const normalizedIdentifiers = useMemo(
    () =>
      identifiers
        .split(/\r?\n|,/)
        .map((value) => value.trim())
        .filter(Boolean),
    [identifiers]
  );

  const visibleImportedUsers = useMemo(
    () => IMPORTED_USERS.filter((user) => user.realm === activeRealm),
    [activeRealm]
  );

  const handleImport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLastImport({ realm: activeRealm, total: normalizedIdentifiers.length });
  };

  return (
    <OpsMainLayout pageTitle="User Management" pageSubtitle="Import users from legacy DB to Keycloak realms">
      <div className="px-6 py-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">Legacy User Import</h1>
              <p className="text-xs text-slate-500">Switch realm and queue a user import batch.</p>
            </div>
            <a
              href="/ops-mgmt/user-management-dashboard"
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
            >
              Back to User Dashboard
            </a>
          </div>

          <div className="mb-5 flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            {(["ops", "client"] as RealmTab[]).map((realm) => (
              <button
                key={realm}
                type="button"
                onClick={() => setActiveRealm(realm)}
                className={`w-full rounded-md px-3 py-2 text-sm font-bold transition ${
                  activeRealm === realm ? "bg-[#0A7CC5] text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {REALM_META[realm].label}
              </button>
            ))}
          </div>

          <form onSubmit={handleImport} className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-800">{REALM_META[activeRealm].note}</p>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Batch Name</span>
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
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Source</span>
                  <input
                    value="Legacy Database"
                    readOnly
                    className="w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Identifier Type</span>
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

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-600">Import Summary</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Realm</dt>
                  <dd className="font-semibold text-slate-800">{REALM_META[activeRealm].label}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Identifier Type</dt>
                  <dd className="font-semibold text-slate-800">{identifierType}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Records</dt>
                  <dd className="font-semibold text-slate-800">{normalizedIdentifiers.length}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Mode</dt>
                  <dd className="font-semibold text-slate-800">{dryRun ? "Dry-run" : "Live import"}</dd>
                </div>
              </dl>

              {lastImport ? (
                <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  Batch queued for {REALM_META[lastImport.realm].label}: {lastImport.total} users.
                </p>
              ) : (
                <p className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                  Submit the form to queue your first import batch.
                </p>
              )}
            </div>
          </form>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-700">
                Imported Users ({REALM_META[activeRealm].label})
              </h2>
              <span className="text-xs font-semibold text-slate-500">{visibleImportedUsers.length} records</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Username</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">First name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Last name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Mobile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {visibleImportedUsers.map((user) => (
                    <tr key={`${user.realm}-${user.username}`}>
                      <td className="px-4 py-2">
                        <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${statusClass[user.status]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-semibold text-slate-800">{user.username}</td>
                      <td className="px-4 py-2 text-slate-700">{user.firstName}</td>
                      <td className="px-4 py-2 text-slate-700">{user.lastName}</td>
                      <td className="px-4 py-2 text-slate-700">{user.email}</td>
                      <td className="px-4 py-2 text-slate-700">{user.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default UserImportPage;
