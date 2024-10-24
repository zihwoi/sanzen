import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import IncomeForm from './IncomeForm';
import CustomDropdown from './Dropdown';

const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background-color: ${(props) => (props.type === 'income' ? '#4caf50' : '#f44336')};
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  text-align: center;
`;

const ChartContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
`;

const Dashboard = () => {
  const { budget, transactions } = useContext(GlobalContext);
  const [selectedChart, setSelectedChart] = useState('expenses'); // Default to expenses chart

  // Ensure transactions is an array
  const safeTransactions = transactions || []; // If transactions is undefined, default to an empty array

  // Filter and map incomes
  const incomeData = safeTransactions
    .filter(transaction => transaction.type === 'income')
    .map((income) => ({
      name: income.description,
      value: income.amount
    }));

  const totalIncome = incomeData.reduce((acc, item) => acc + item.value, 0);

  // Filter and map expenses
  const expenseData = safeTransactions
    .filter(transaction => transaction.type === 'expense')
    .map((expense) => ({
      name: expense.description,
      value: expense.amount
    }));

  const totalExpenses = expenseData.reduce((acc, item) => acc + item.value, 0);

  // Define options for dropdown
  const options = [
    { value: 'expenses', label: 'Expenses Breakdown' },
    { value: 'income', label: 'Income Breakdown' },
  ];

  return (
    <DashboardContainer>
      <h2 style={{ textAlign: 'center' }}>Dashboard</h2>

      {/* Total Income Card */}
      <Card type="income">
        <h3>Total Income</h3>
        <p>${budget.totalIncome}</p>
      </Card>

      {/* Total Expenses Card */}
      <Card type="expense">
        <h3>Total Expenses</h3>
        <p>${budget.totalExpenses}</p>
      </Card>

      <IncomeForm /> {/* Render the IncomeForm here */}

      {/* Custom Dropdown for chart selection */}
      <CustomDropdown 
        options={options} 
        selectedValue={selectedChart} 
        onChange={setSelectedChart} 
      />

      {/* Chart Container */}
      <ChartContainer>
        <h3 style={{ textAlign: 'center' }}>
          {selectedChart === 'expenses' ? 'Expenses Breakdown by Category' : 'Income Breakdown by Category'}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={selectedChart === 'expenses' ? expenseData : incomeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) => `${name}: $${value} (${((value / (selectedChart === 'expenses' ? totalExpenses : totalIncome)) * 100).toFixed(1)}%)`}
              labelLine={false}
            >
              {(selectedChart === 'expenses' ? expenseData : incomeData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, selectedChart === 'expenses' ? 'Expenses' : 'Income']} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
