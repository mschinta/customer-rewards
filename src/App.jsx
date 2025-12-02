import React, { useEffect, useState } from 'react';
import {fetchUserTransactions} from './api/userTransactionsApi';
import { calculateRewardPoints } from './utils/rewardUtils';
import CustomerRewardsTable from './Components/CustomerRewardsTable'

function App() {
 const [customerRewards,setCustomerRewards] = useState({});
 const [loading,setLoading] = useState(false)
 const [error,setError] = useState("")
 const [months,setMonths] = useState([]);
 const monthOrder = [
  "Jan", "Feb", "Mar", "Apr", "May", 
  "Jun", "Jul", "Aug", "Sep", "Oct", 
  "Nov", "Dec"
];

 useEffect(() => {
     fetchUserRecords();
  },[]);
  
  const fetchUserRecords = async () => {
    let customerRewards = {};
    setLoading(true);
    setError("");
    try{
      const userTransacations = await fetchUserTransactions();
      const months = new Set();
      userTransacations.forEach(({customerName,purchaseDate,amount}) => {
        if(!customerRewards[customerName]){
          customerRewards[customerName] = {total: 0}
        }
      
        const points = calculateRewardPoints(amount);
        customerRewards[customerName][purchaseDate] = (customerRewards[customerName][purchaseDate] || 0) + points
        customerRewards[customerName].total += points
        months.add(purchaseDate);
      });
      setCustomerRewards(customerRewards);
      setMonths([...months].sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)));
    }
    catch(error) {
      setError("Problem in Fetching User Transactions");
    }
    finally {
      setLoading(false);
    }
  }
 
  if(loading) return <p>Loading Rewards Data ... </p>
  if(error) return <p>{error} </p>

  return (
   <>
    <h1>Customer Reward Points</h1>
    <CustomerRewardsTable months={months} customerRewards={customerRewards}/>
    </>
  );
}

export default App;