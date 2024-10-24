import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

const ExpenseBreakdown = ({ expenseData, totalExpenses }) => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={expenseData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={({ name, value }) => `${name}: $${value} (${((value / totalExpenses) * 100).toFixed(1)}%)`}
        labelLine={false}
      >
        {expenseData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`$${value}`, 'Expense']} />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  </ResponsiveContainer>
);

export default ExpenseBreakdown;
