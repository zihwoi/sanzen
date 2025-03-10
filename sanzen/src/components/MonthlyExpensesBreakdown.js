import React, { useContext } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { GlobalContext } from '../context/GlobalState';

// Colors for the pie chart slices
const COLORS = ['#F33A6A', '#800080', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const MonthlyExpensesBreakdown = () => {
  const { budget } = useContext(GlobalContext);

  // Check if budget.expensesByCategory is defined and not null
  if (!budget || !budget.expensesByCategory) {
    return <div>Loading...</div>;
  }

  const data = Object.entries(budget.expensesByCategory).map(([category, amount]) => ({
    category,
    amount
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={({ category, amount }) => `${category}: $${amount}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpensesBreakdown;