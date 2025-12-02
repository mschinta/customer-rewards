import React from 'react';

export default function CustomerRewardsTable({months,customerRewards}){
return (
  <table>
    <thead>
      <tr>
        <th>Customer Name</th>
        {months.map((month) => (<th key={month}>{month}</th>))}
        <th>Total</th>
      </tr>
   </thead>
   <tbody>
    {Object.entries(customerRewards).map(([customerName,rewards]) => (
      <tr key={customerName}>
        <td>{customerName}</td>
        {months.map((month) => (<td key={month}>{rewards[month] ||0}</td>))}
        <td>{rewards.total}</td>
      </tr>
    ))} 
   </tbody>
  </table>)
}