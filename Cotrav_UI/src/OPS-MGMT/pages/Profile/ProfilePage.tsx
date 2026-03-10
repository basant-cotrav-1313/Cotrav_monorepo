import React from "react";
import { Link } from "react-router-dom";
import { getOpsUserProfile } from "@/OPS-MGMT/auth/token";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-semibold text-slate-900">{value || "-"}</p>
  </div>
);

const ProfilePage: React.FC = () => {
  const profile = getOpsUserProfile();

  return (
    <OpsMainLayout pageTitle="My Profile" pageSubtitle="User information and assigned roles">
      <div className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
              <p className="mt-1 text-sm text-slate-600">User information and assigned roles from your access token.</p>
            </div>
            <Link
              to="/ops-mgmt/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Username" value={profile?.username ?? ""} />
            <InfoRow label="Email" value={profile?.email ?? ""} />
            <InfoRow label="First Name" value={profile?.firstName ?? ""} />
            <InfoRow label="Last Name" value={profile?.lastName ?? ""} />
            <InfoRow label="Full Name" value={profile?.fullName ?? ""} />
            <InfoRow label="User ID" value={profile?.userId ?? ""} />
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-800">Assigned Roles</h2>
            {profile && profile.roles.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No profile data found. Please login first to populate user info.
              </p>
            )}
          </div>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default ProfilePage;
