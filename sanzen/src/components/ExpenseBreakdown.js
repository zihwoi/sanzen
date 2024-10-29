import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = [
  '#ce4a4a', // Coral Red
  '#eaaf41', // Sunflower Yellow
  '#48a56a', // Olive Green
  '#6688c3', // Sky Blue
  '#903169', // Purple
  '#c77986', // Hot Pink
  '#E7CEB5', // Light Salmon
  '#CCAE7F',  // Chocolate
  '#925077', // Purple
  '#68224B', // Hot Pink
];


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
