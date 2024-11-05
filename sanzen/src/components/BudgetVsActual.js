import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GlobalContext } from '../context/GlobalState';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h4>{payload[0].payload.category}</h4>
        <p>Budget: ${payload[0].value}</p>
        <p>Actual: ${payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const BudgetVsActual = () => {
  const { budget, actualExpenses } = useContext(GlobalContext);

  // Prepare data for chart
  const data = Object.keys(budget.expensesByCategory).map((category) => ({
    category,
    budget: budget.expensesByCategory[category] || 0,
    actual: actualExpenses[category] || 0,
  }));

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetVsActual;
