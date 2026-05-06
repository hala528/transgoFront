export const beasURL = "http://127.0.0.1:8000/api/v1";

export const IMAGE_BASE = "http://127.0.0.1:8000";

// Auth
export const LOGIN = "admin/login";
export const SENDOTP = "auth/send-otp";
export const VERFIEotp = "auth/verify-otp";
export const RESETPASSWORD = "auth/reset-password";
export const LOGOUT = "auth/logout";
export const FIRSTLOGIN = "auth/change-initial-password";


//managment employee 
export const ADDEMPLOYEE = "admin/employees";  
export const EMPLOYEE = "admin/employees"  
export const GETEMPLOYEES = (id) => `admin/employees/${id}`;
export const UPDATEEMPLOYEES = (id) => `admin/employees/${id}`;

//managment driver
export const ADDDRIVER = "admin/drivers";
export const DRIVER = "admin/drivers";
export const GETDRIVERS = (id) => `admin/drivers/${id}`;

//managment passenger
export const  GET_PASSENGER = "admin/passengers";
export const GET_PASSENGER_DETAILS = (id) => `admin/passengers/${id}` ;

// Trips
export const GETTRIPS = "admin/trips";
export const TRIP_DETAILS = (id) => `admin/trips/${id}`;
export const CANCEL_TRIP = (id) => `admin/trips/${id}/cancel`;
export const DELAYED_TRIPS = "admin/trips/delayed";

//logs
export const AUDIT_LOGS = "admin/audit-logs";

// Free Wallet
export const SERASH_DRIVER = "admin/drivers";
export const GET_WALLET = "/admin/wallet-topups"
export const GET_WALLET_PASSENGER = "admin/passenger-wallet-topups"
export const GET_WALLET_DRIVER = "admin/driver-wallet-topups"
// export const WALLET_TOP = (id) => `admin/drivers/${id}/wallet/top-up` ;
export const WALLET_TOP_PASSENGER = (id) => `admin/passengers/${id}/wallet/top-up` ;
export const SERASH_PASSENGER = "admin/passengers";
export const WALLET_TOP = (id) => `admin/drivers/${id}/wallet/top-up` ;
export const GET_BOOKINGS = 'admin/bookings';
export const BOOKING_DETAILS = (id) => `admin/bookings/${id}`;
