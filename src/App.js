
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Auth/login';
import Dashborad from './pages/dashboard/dashborad';
import ForgetPassword from './pages/Auth/ForgetPassword';
import CodePassword from './pages/Auth/CodePassword';
import RestPassword from './pages/Auth/ResetPassword';
import FirstLogin from './pages/Auth/Firstlogin';
import ManagmentDriver from './pages/dashboard/User managment/Driver';
import AddDriver from './pages/dashboard/User managment/AddDriver';
//import RequireAuth from './pages/Auth/RequireAuths';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={< Login />}></Route>
      <Route path='/login' element={<Login />}></Route>
 <Route path='/forgetPassword' element={<ForgetPassword />}></Route>
  <Route path='/otp' element={< CodePassword />}></Route>
  <Route path='/resetPassword' element={< RestPassword />}></Route>
      <Route path='/first' element={< FirstLogin />}></Route>


         {/*route react */}
       { /* <Route element={<RequireAuth />}>*/}
       <Route path='/dashboard' element={<Dashborad />}>
         <Route path='driver' element={<ManagmentDriver />} />
         <Route path='driver/:id'  element={<AddDriver />}  />
       </Route>
       
      {/*</Route>*/}
    </Routes>
     

    </div>
  );
}

export default App;
