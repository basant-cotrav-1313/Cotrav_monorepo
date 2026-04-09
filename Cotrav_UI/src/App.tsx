import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Homepage/Home";
import MainLayout from "./Layouts/mainlayout";
import { pages, opsMgmtPages, MapProvider } from ".";
import { clearOpsAuthSession, hasValidOpsSession } from "./OPS-MGMT/auth/token";

type ProtectedOpsRouteProps = {
  children: React.ReactElement;
};

const ProtectedOpsRoute: React.FC<ProtectedOpsRouteProps> = ({ children }) => {
  if (!hasValidOpsSession()) {
    clearOpsAuthSession();
    return <Navigate to="/ops-mgmt/login" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <MapProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/HotelSearch" element={<pages.HotelSearchBootstrap />} />
            <Route path="/HotelRoom" element={<pages.HotelRoomBootstrap />} />
            <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
            <Route path="/HotelDetail" element={<pages.HotelDetailPage />} />
            <Route path="/HotelBooking" element={<pages.HotelBookingPage />} />
            <Route path="/HotelBookingCompleted" element={<pages.HotelBookingCompletedPage />} />
          </Route>

          <Route path="/ops-mgmt/login" element={<opsMgmtPages.OpsMgmtLoginPage />} />
          <Route
            path="/ops-mgmt/dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/taxi-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtTaxiDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/bus-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtBusDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/train-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtTrainDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/hotel-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtHotelDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/flight-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtFlightDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/flight-analytics"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtFlightAnalyticsPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/profile"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtProfilePage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/advanced-search-results"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtAdvancedSearchResultsPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/bills-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtBillsDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/voucher-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtVoucherDashboardPage />
              </ProtectedOpsRoute>
            }
          />
          <Route
            path="/ops-mgmt/user-management-dashboard"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtUserManagementDashboardPage />
              </ProtectedOpsRoute>
            }
          />

          <Route
            path="/ops-mgmt/user-import"
            element={
              <ProtectedOpsRoute>
                <opsMgmtPages.OpsMgmtUserImportPage />
              </ProtectedOpsRoute>
            }
          />

          <Route
  path="/ops-mgmt/add-user"
  element={
    <ProtectedOpsRoute>
      <opsMgmtPages.CreateUserPage />
    </ProtectedOpsRoute>
  }
/>
          <Route path="/auth/set-password" element={<opsMgmtPages.SetPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  );
};

export default App;

