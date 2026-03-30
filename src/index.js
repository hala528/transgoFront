import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import "./css/components/alerts.css";
import "./css/components/loading.css";
import "./pages/Auth/Auths.css";
import "./pages/dashboard/User managment/user.css";
import './css/components/button.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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



