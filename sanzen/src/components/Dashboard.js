import React from 'react';
import BudgetOverview from './BudgetOverview'; // Import BudgetOverview

function Dashboard({ totalIncome, totalExpenses }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Income: {totalIncome}</p>
      <p>Total Expenses: {totalExpenses}</p>
      <BudgetOverview /> {/* Include BudgetOverview here */}
    </div>
  );
}

export default Dashboard;
