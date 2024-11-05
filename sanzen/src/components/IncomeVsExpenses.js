import React, { useContext, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GlobalContext } from '../context/GlobalState';

const IncomeVsExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  // Process data into monthly totals of income and expenses
  const data = useMemo(() => {
    const monthlyData = {}; // Structure to accumulate data by month

    // Aggregate transactions by month
    transactions.forEach(({ type, amount, date }) => {
      const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expenses: 0 };
      }
      if (type === 'income') {
        monthlyData[month].income += amount;
      } else if (type === 'expense') {
        monthlyData[month].expenses += amount;
      }
    });

    // Convert the monthlyData object to an array for the chart
    return Object.values(monthlyData);
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#4caf50" />
        <Line type="monotone" dataKey="expenses" stroke="#f44336" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeVsExpenses;
