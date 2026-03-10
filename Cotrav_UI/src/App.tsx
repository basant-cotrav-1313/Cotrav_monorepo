
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './Homepage/Home'
// import MainLayout from './Layouts/mainlayout';
// import { pages, MapProvider } from '.'; // Import MapProvider

// const App: React.FC = () => {
//   return (
//     <MapProvider> {/* Wrap BrowserRouter with MapProvider */}
//       <BrowserRouter>
//         <Routes>

//           <Route element={<MainLayout />}>
          
//           {/* Home/Landing Page */}
//           <Route path="/" element={<Home />} />

//           {/* Bootstrap route - handles ?taxivaxidata=... */}
//           <Route path="/HotelSearch" element={<pages.HotelSearchBootstrap />} />
          
//           {/* Main search results page */}
//           <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
          
//           {/* Hotel detail page */}
//           <Route path="/HotelDetail" element={<pages.HotelDetailPage />} />

//           {/* Hotel booking page */}
//           <Route path="/HotelBooking" element={<pages.HotelBookingPage />} />

//           {/* Payment page (if payment required) */}
//           {/* <Route path="/HotelPayment" element={<pages.HotelPayment />} /> */}

//           {/* Booking completed page */}
//           <Route path="/HotelBookingCompleted" element={<pages.HotelBookingCompletedPage />} />

//           {/* Cancellation page */}
//           {/* <Route path="/HotelCancellation" element={<pages.HotelCancellation />} /> */}

//           {/* Booking done/confirmation page */}
//           {/* <Route path="/BookingDone" element={<pages.BookingDone />} /> */}

//           </Route>

          
//           {/* 404 fallback - redirect to home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </MapProvider>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Homepage/Home'
import MainLayout from './Layouts/mainlayout';
import { pages, opsMgmtPages, MapProvider } from '.'; // Import MapProvider
import { clearOpsAuthSession, hasValidOpsSession } from './OPS-MGMT/auth/token';

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
          
            {/* Home/Landing Page */}
            <Route path="/" element={<Home />} />

            {/* Bootstrap route - handles Search/Book ?taxivaxidata=... */}
            <Route path="/HotelSearch" element={<pages.HotelSearchBootstrap />} />
            
            {/* Book Now route - handles Book Now ?taxivaxidata=... */}
            <Route path="/HotelRoom" element={<pages.HotelRoomBootstrap />} />
            
            {/* Main search results page */}
            <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
            
            {/* Hotel detail page */}
            <Route path="/HotelDetail" element={<pages.HotelDetailPage />} />

            {/* Hotel booking page */}
            <Route path="/HotelBooking" element={<pages.HotelBookingPage />} />

            {/* Booking completed page */}
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

          {/* 404 fallback - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  );
};

export default App;
