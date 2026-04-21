import {
  faSearch,
  faMoneyBill,
  faCheck,
  faBell,
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function FreeWallet() {
  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white" }}>
        Free Wallet Charging :
      </h2>
        <p className="subtitle" style={{fontSize:'20px'}}>In order to charge a driver's or passenger's wallet, you must follow the instructions.</p>
        <div className="cards">
        <div className="card-wallet">
          <div className="icon-circle purple">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <h5 style={{color:'white'}}>Choose Driver</h5>
          <p className="subtitle">Select a driver from the list below</p>
        </div>

        <div className="card-wallet">
          <div className="icon-circle green">
            <FontAwesomeIcon icon={faMoneyBill} />
          </div>
          <h5 style={{color:'white'}}>Enter Amount</h5>
          <p className="subtitle">Specify the amount you want to charge</p>
        </div>

        <div className="card-wallet">
          <div className="icon-circle blue">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <h5 style={{color:'white'}}>Confirm</h5>
            <p className="subtitle">Review the details and confirm the charge</p>
        </div>

        <div className="card-wallet">
          <div className="icon-circle orange">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <h5 style={{color:'white'}}>Notify</h5>
            <p className="subtitle">receive a notification about the charge</p>
        </div>
        <Link to={`to={'wallet.id'}`}>
         <div className="card-click">
         
           
         
          <h5 style={{color:'#cbd5f5'}}>click to see the financail history</h5>
        </div>
        </Link>
        
        </div>
       <div className="card-items">
        <FontAwesomeIcon color="white" icon={faBullhorn} />
         <p className="subtitle" style={{fontSize:'15px'}}>- If you want to charge a driver's wallet ,</p>
         <p className="subtitle" style={{
            color:'blue',
            fontSize:'15px'
         }}>  click here.</p>
       </div>
        <div className="card-items">
            <FontAwesomeIcon color="white" icon={faBullhorn} />
         <p className="subtitle" style={{fontSize:'15px'}}>- If you want to charge a passenger's wallet ,</p>
         <p className="subtitle" style={{
            color:'blue',
            fontSize:'15px'
         }}>  click here.</p>
        </div>
    </div>
  );
}