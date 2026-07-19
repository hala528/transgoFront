import { Route, Routes } from "react-router-dom";

// Auth
import Login from "./pages/Auth/login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import CodePassword from "./pages/Auth/CodePassword";
import RestPassword from "./pages/Auth/ResetPassword";
import FirstLogin from "./pages/Auth/Firstlogin";
import RequireAuth from "./pages/Auth/RequireAuths";
import Err403 from "./pages/Auth/403";

// Dashboard
import Dashborad from "./pages/dashboard/dashborad";

// Drivers
import ManagmentDriver from "./pages/dashboard/User managment/driversmanagment/Driver";
import AddDriver from "./pages/dashboard/User managment/driversmanagment/AddDriver";
import DetailsDriver from "./pages/dashboard/User managment/driversmanagment/detailsdriver";

// Employees
import ManagmentEmployee from "./pages/dashboard/User managment/employeeManagment/employee";
import AddEmployee from "./pages/dashboard/User managment/employeeManagment/AddEmployee";
import DetailsEmployee from "./pages/dashboard/User managment/employeeManagment/detailsEmployee";

// Passengers
import Passenger from "./pages/dashboard/User managment/passengerManagment/Passenger";
import DetailsPassenger from "./pages/dashboard/User managment/passengerManagment/detailsPassenger";

// Wallet
import FreeWallet from "./pages/dashboard/FreeWalet/Freewallet";
import FinancailLogs from "./pages/dashboard/FreeWalet/financailLogs";
import WalletDriver from "./pages/dashboard/FreeWalet/driver/walletFreedriver";
import LogeDrivers from "./pages/dashboard/FreeWalet/driver/logsDriver";
import WalletPassenger from "./pages/dashboard/FreeWalet/passenger/walletFreepassenger";
import Logpassenger from "./pages/dashboard/FreeWalet/passenger/LogsPassenger";

// Trips
import Trips from "./pages/dashboard/Trip managment/Trips";
import TripDetails from "./pages/dashboard/Trip managment/TripDetails";
import TripTracking from "./pages/dashboard/Trip managment/TripTracking";

// Booking
import Booking from "./pages/dashboard/Booking/booking";
import BookingDetails from "./pages/dashboard/Booking/BookingDetails";

// Complaints
import Complaints from "./pages/complnaits/viewCoplanits";
import ComplanitDetails from "./pages/complnaits/complanitDetails";

// Reports
import Reports from "./pages/dashboard/Report/Reports";
import DriversPerformance from "./pages/dashboard/Report/DriversPerformance";
import ActivityReport from "./pages/dashboard/Report/ActivityReport";
import AppUsageReport from "./pages/dashboard/Report/AppUsageReport";
import ComplaintsReport from "./pages/dashboard/Report/complaintsr";
import DriverEarnings from "./pages/dashboard/Revenue/DriverEarnings";
import RevenueReportMock from "./pages/dashboard/Revenue/RevenueReportMock";
import RevenueReport from "./pages/dashboard/Revenue/RevenueReportMock"; 
import RevenueR from "./pages/dashboard/Revenue/RevenueR"; 
// Audit
import AuditLog from "./pages/dashboard/Audit log/AuditLog";


//rating
import ViewRating from "./pages/dashboard/rating/viewRating";
//rate commission
import RateCommission from "./pages/dashboard/rate_commission/rate_commission";


import Notifi from "./pages/dashboard/Notifi/Notifi";
import Category from "./pages/dashboard/catorgy/VehicleCategories";


// import TripTracking from './pages/dashboard/Trip managment/TripTracking';

function App() {
  return (
    <div className="App">
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/otp" element={<CodePassword />} />
        <Route path="/resetPassword" element={<RestPassword />} />
        <Route path="/first" element={<FirstLogin />} />

        {/* ================= AUTHENTICATED USERS ================= */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashborad />}>

            {/* ================= ADMIN ONLY ================= */}
            <Route element={<RequireAuth allowedRole={["admin"]} />}>
              <Route path="employee" element={<ManagmentEmployee />} />
              <Route path="employee/:id" element={<AddEmployee />} />
              <Route path="employee/details/:id" element={<DetailsEmployee />} />
              <Route path="auditLog" element={<AuditLog />} />
               {/* Rate Commission */}
              <Route path="rateCommission" element={<RateCommission />} />
              
            </Route>
<Route> <Route path="Notifi" element={<Notifi />} /></Route>
            {/* ================= ADMIN + EMPLOYEE ================= */}
            <Route element={<RequireAuth allowedRole={["admin", "employee"]} />}>
              {/* Drivers */}
              <Route path="driver" element={<ManagmentDriver />} />
              <Route path="driver/:id" element={<AddDriver />} />
              <Route path="driver/details/:id" element={<DetailsDriver />} />

              {/* Passengers */}
              <Route path="passenger" element={<Passenger />} />
              <Route path="passenger/:id" element={<DetailsPassenger />} />

              {/* Trips */}
              <Route path="trips" element={<Trips />} />
              <Route path="trips/:id" element={<TripDetails />} />
              <Route path="trips/:id/track" element={<TripTracking />} />

              {/* Booking */}
              <Route path="booking" element={<Booking />} />
              <Route path="BookingDetails/:id" element={<BookingDetails />} />

              {/* Wallet */}
              <Route path="wallet" element={<FreeWallet />} />
              <Route path="wallet/:id" element={<FinancailLogs />} />
              <Route path="wallet/chargedriver/123" element={<WalletDriver />} />
              <Route path="wallet/logsdriver" element={<LogeDrivers />} />
              <Route path="wallet/chargepassenger" element={<WalletPassenger />} />
              <Route path="wallet/logspassenger" element={<Logpassenger />} />

              {/* Complaints */}
              <Route path="complaints" element={<Complaints />} />
              <Route path="complaints/:id" element={<ComplanitDetails />} />
              {/* Category */}
              <Route path="category" element={<Category />} />
             

              {/* Reports */}
              <Route path="Reports" element={<Reports />} />
              <Route path="ComplaintsReport" element={<ComplaintsReport />} />
              <Route path="AppUsageReport" element={<AppUsageReport />} />
              <Route path="ActivityReport" element={<ActivityReport />} />
              <Route path="DriversPerformance" element={<DriversPerformance />} />

              {/* Rating */}
              <Route path="rating" element={<ViewRating />} />
             
               <Route path="DriverEarnings" element={<DriverEarnings />} />
               <Route path="RevenueR" element={<RevenueR />} />
                <Route path="RevenueReport" element={<RevenueReport />} />
             
            </Route>

            {/* ================= ERRORS ================= */}
            <Route path="403" element={<Err403 />} />

          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;