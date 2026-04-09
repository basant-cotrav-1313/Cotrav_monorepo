import React from "react";
import type { ReactElement } from "react";
import {
  OpsMgmtAdvancedSearchResultsPage,
  OpsMgmtBillsDashboardPage,
  OpsMgmtDashboardPage,
  OpsMgmtBusDashboardPage,
  OpsMgmtFlightAnalyticsPage,
  OpsMgmtFlightDashboardPage,
  OpsMgmtHotelDashboardPage,
  OpsMgmtLoginPage,
  OpsMgmtProfilePage,
  OpsMgmtTaxiDashboardPage,
  OpsMgmtTrainDashboardPage,
  OpsMgmtVoucherDashboardPage,
  OpsMgmtUserManagementDashboardPage,
  OpsMgmtUserImportPage,
 CreateUserPage
  
} from "@/OPS-MGMT/pages";

console.log("CreateUserPage:", CreateUserPage);

export type OpsMgmtRoute = {
  path: string;
  element: ReactElement;
};

export const opsMgmtRoutes: OpsMgmtRoute[] = [
  { path: "/ops-mgmt/login", element: <OpsMgmtLoginPage /> },
  { path: "/ops-mgmt/dashboard", element: <OpsMgmtDashboardPage /> },
  { path: "/ops-mgmt/taxi-dashboard", element: <OpsMgmtTaxiDashboardPage /> },
  { path: "/ops-mgmt/bus-dashboard", element: <OpsMgmtBusDashboardPage /> },
  { path: "/ops-mgmt/train-dashboard", element: <OpsMgmtTrainDashboardPage /> },
  { path: "/ops-mgmt/hotel-dashboard", element: <OpsMgmtHotelDashboardPage /> },
  { path: "/ops-mgmt/flight-dashboard", element: <OpsMgmtFlightDashboardPage /> },
  { path: "/ops-mgmt/flight-analytics", element: <OpsMgmtFlightAnalyticsPage /> },
  { path: "/ops-mgmt/profile", element: <OpsMgmtProfilePage /> },
  { path: "/ops-mgmt/advanced-search-results", element: <OpsMgmtAdvancedSearchResultsPage /> },
  { path: "/ops-mgmt/bills-dashboard", element: <OpsMgmtBillsDashboardPage /> },
  { path: "/ops-mgmt/voucher-dashboard", element: <OpsMgmtVoucherDashboardPage /> },
  { path: "/ops-mgmt/user-management-dashboard", element: <OpsMgmtUserManagementDashboardPage /> },
  { path: "/ops-mgmt/user-import", element: <OpsMgmtUserImportPage /> },
  { path: "/ops-mgmt/add-user", element: <CreateUserPage /> }
];
