import { Route, Routes } from "react-router-dom";

import Login from "./pages/Auth/login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import CodePassword from "./pages/Auth/CodePassword";
import RestPassword from "./pages/Auth/ResetPassword";
import FirstLogin from "./pages/Auth/Firstlogin";
import RequireAuth from "./pages/Auth/RequireAuths";
import Err403 from "./pages/Auth/403";

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

// Audit
import AuditLog from "./pages/dashboard/Audit log/AuditLog";

import ManagmentEmployee from './pages/dashboard/User managment/employeeManagment/employee';
import AddEmployee from './pages/dashboard/User managment/employeeManagment/AddEmployee';
import DetailsEmployee from './pages/dashboard/User managment/employeeManagment/detailsEmployee';
import AuditLog from './pages/dashboard/Audit log/AuditLog';
import Complaints from './pages/complnaits/viewCoplanits';
import ComplanitDetails from './pages/complnaits/complanitDetails';
import BookingDetails from './pages/dashboard/Booking/BookingDetails';
import Reports from './pages/dashboard/Report/Reports';
import FinancailLogs from './pages/dashboard/FreeWalet/financailLogs';
import FreeWallet from './pages/dashboard/FreeWalet/Freewallet';
import WalletDriver from './pages/dashboard/FreeWalet/driver/walletFreedriver';
import LogeDrivers from './pages/dashboard/FreeWalet/driver/logsDriver';
import WalletPassenger from './pages/dashboard/FreeWalet/passenger/walletFreepassenger';
import Logpassenger from './pages/dashboard/FreeWalet/passenger/LogsPassenger';
import Passenger from './pages/dashboard/User managment/passengerManagment/Passenger';
import DetailsPassenger from './pages/dashboard/User managment/passengerManagment/detailsPassenger';
import DriversPerformance from './pages/dashboard/Report/DriversPerformance';
import ActivityReport from './pages/dashboard/Report/ActivityReport';
import AppUsageReport from './pages/dashboard/Report/AppUsageReport';
import ComplaintsReport from './pages/dashboard/Report/complaintsr';
import TripTracking from './pages/dashboard/Trip managment/TripTracking';
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

             
              {/* Employees */}
              <Route path="employee" element={<ManagmentEmployee />} />
              <Route path="employee/:id" element={<AddEmployee />} />
              <Route path="employee/details/:id" element={<DetailsEmployee />} />

             
              {/* Audit */}
              <Route path="auditLog" element={<AuditLog />} />
            </Route>

            {/* ================= ADMIN + EMPLOYEE ================= */}
            <Route element={<RequireAuth allowedRole={["admin", "employee"]} />}>
 {/* Drivers */}
              <Route path="driver" element={<ManagmentDriver />} />
              <Route path="driver/:id" element={<AddDriver />} />
              <Route path="driver/details/:id" element={<DetailsDriver />} />
 {/* Passengers */}
              <Route path="passenger" element={<Passenger />} />
              <Route path="passenger/:id" element={<DetailsPassenger />} />
            {/* Shared */}
           <Route path="trips" element={<Trips />} />
           <Route
  path="/dashboard/trips/:id/track"
  element={<TripTracking />}
/>
<Route path="trips/:id" element={<TripDetails />} />
<Route
  path="booking"
  element={<Booking />}
/>
<Route
  path="Reports"
  element={<Reports />}
/>
<Route path="/dashboard/ComplaintsReport" element={<ComplaintsReport />} />
<Route path="/dashboard/AppUsageReport" element={<AppUsageReport />} />
<Route path="/dashboard/ActivityReport" element={<ActivityReport />} />
<Route path="/dashboard/DriversPerformance" element={<DriversPerformance />} />
<Route path="/dashboard/BookingDetails/:id" element={<BookingDetails />} />

              {/* Wallet */}
              <Route path="wallet" element={<FreeWallet />} />
              <Route path="wallet/:id" element={<FinancailLogs />} />
              <Route path="wallet/chargedriver/123" element={<WalletDriver />} />
              <Route path="wallet/logsdriver" element={<LogeDrivers />} />
              <Route path="wallet/chargepassenger" element={<WalletPassenger />} />
              <Route path="wallet/logspassenger" element={<Logpassenger />} />

              {/* Trips */}
              <Route path="trips" element={<Trips />} />
              <Route path="trips/:id" element={<TripDetails />} />

              {/* Booking */}
              <Route path="booking" element={<Booking />} />
              <Route path="BookingDetails/:id" element={<BookingDetails />} />

              {/* Complaints */}
              <Route path="complaints" element={<Complaints />} />
              <Route path="complaints/:id" element={<ComplanitDetails />} />

              {/* Reports */}
              <Route path="Reports" element={<Reports />} />
              <Route path="ComplaintsReport" element={<ComplaintsReport />} />
              <Route path="AppUsageReport" element={<AppUsageReport />} />
              <Route path="ActivityReport" element={<ActivityReport />} />
              <Route path="DriversPerformance" element={<DriversPerformance />} />
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