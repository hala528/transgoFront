// function GovernoratesTable({ drivers }) {
//   return (
//     <div className="table-box">

//       <div className="table-header">

//         <h3>Detailed Driver Performance</h3>

//       </div>

//       <table>

//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Driver</th>
//             <th>Governorate</th>
//             <th>Rating</th>
//             <th>pending</th>
//             <th>active</th>
//             <th>completed</th>
//             <th>cancel_by_driver</th>
//             <th>cancel_by_passenger</th>
//             <th>cancellation_rate</th>
//             <th>Performance</th>
//             <th>total_rides</th>
//           </tr>
//         </thead>

//         <tbody>

//           {drivers.map((driver) => (

//             <tr key={driver.id}>

//               <td>{driver.id}</td>

//               <td>{driver.name}</td>

//               <td>{driver.governorate}</td>

//               <td>⭐ {driver.rating}</td>

//               <td>{driver.total}</td>

//               <td>{driver.completed}</td>

//               <td>{driver.active}</td>

//               <td>{driver.pending}</td>

//               <td>{driver.cancelled}</td>

//               <td>{driver.cancelRate}</td>

//               <td>
//                 <span
//                   className={`performance-badge ${driver.performance.toLowerCase()}`}
//                 >
//                   {driver.performance}
//                 </span>
//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// }

// export default GovernoratesTable;