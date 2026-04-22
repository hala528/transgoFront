
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Auth/login';
import Dashborad from './pages/dashboard/dashborad';
import ForgetPassword from './pages/Auth/ForgetPassword';
import CodePassword from './pages/Auth/CodePassword';
import RestPassword from './pages/Auth/ResetPassword';
import FirstLogin from './pages/Auth/Firstlogin';
import ManagmentDriver from './pages/dashboard/User managment/driversmanagment/Driver';
import AddDriver from './pages/dashboard/User managment/driversmanagment/AddDriver';
import RequireAuth from './pages/Auth/RequireAuths';
import Err403 from './pages/Auth/403';
import Trips from './pages/dashboard/Trip managment/Trips';
import TripDetails from "./pages/dashboard/Trip managment/TripDetails";
import ManagmentEmployee from './pages/dashboard/User managment/employeeManagment/employee';
import AddEmployee from './pages/dashboard/User managment/employeeManagment/AddEmployee';
import DetailsEmployee from './pages/dashboard/User managment/employeeManagment/detailsEmployee';
import AuditLog from './pages/dashboard/Audit log/AuditLog';

import FinancailLogs from './pages/dashboard/FreeWalet/financailLogs';
import FreeWallet from './pages/dashboard/FreeWalet/Freewallet';
import WalletDriver from './pages/dashboard/FreeWalet/driver/walletFreedriver';
import LogeDrivers from './pages/dashboard/FreeWalet/driver/logsDriver';
import WalletPassenger from './pages/dashboard/FreeWalet/passenger/walletFreepassenger';
import Logpassenger from './pages/dashboard/FreeWalet/passenger/LogsPassenger';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/otp" element={<CodePassword />} />
        <Route path="/resetPassword" element={<RestPassword />} />
        <Route path="/first" element={<FirstLogin />} />

        {/* Protected */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashborad />}>
            
            {/* Admin only */}
            <Route element={<RequireAuth allowedRole="admin" />}>
              <Route path="driver" element={<ManagmentDriver />} />
              <Route path='driver/:id' element={<AddDriver />} />
              
              <Route path="employee" element={<ManagmentEmployee />} />
              <Route path='employee/:id' element={<AddEmployee />} />
              <Route path='employee/details/:id' element={<DetailsEmployee />} /> 
              <Route path='auditLog' element={<AuditLog />} />
              <Route path='wallet' element={<FreeWallet />} />
              <Route path='wallet/:id' element={<FinancailLogs />} />
              <Route path='wallet/chargedriver/123' element={<WalletDriver />} />
              <Route path='wallet/logsdriver' element={<LogeDrivers />} />
              <Route path='wallet/chargepassenger' element={<WalletPassenger />} />
              <Route path='wallet/logspassenger' element={<Logpassenger />} />
            </Route>

            {/* Shared */}
           <Route path="trips" element={<Trips />} />
<Route path="trips/:id" element={<TripDetails />} />
            {/* 403 */}
            <Route path="403" element={<Err403 />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;