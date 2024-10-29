import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const IncomeBreakdown = ({ incomeData, totalIncome }) => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={incomeData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={({ name, value }) => `${name}: $${value} (${((value / totalIncome) * 100).toFixed(1)}%)`}
        labelLine={false}
      >
        {incomeData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600', '#48a56a', '#A7DB9B', '#FFF3CD'][index % 8]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`$${value}`, 'Income']} />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  </ResponsiveContainer>
);

export default IncomeBreakdown;
