import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import "./css/components/alerts.css";
import "./css/components/loading.css";
import "./pages/Auth/Auths.css";
import "./pages/dashboard/User managment/cssUser/user.css";
import './css/components/button.css';
import './pages/dashboard/Trip managment/trip.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/dashboard/User managment/cssUser/details.css';
import './pages/dashboard/Audit log/log.css';
import './pages/dashboard/FreeWalet/wallet.css';
import './pages/dashboard/User managment/driversmanagment/driver.css';

import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import MenuContext from './context/MnueContext';
import WindowContext from './context/WindowContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
    <MenuContext>
    <Router>
    <App />
    </Router>
    </MenuContext>
    </WindowContext>
  </React.StrictMode>
);



