import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // For navigation
import { GlobalContext } from '../context/GlobalState';
import IncomeForm from './IncomeForm';
import CustomDropdown from './Dropdown';
import IncomeBreakdown from './IncomeBreakdown';
import ExpenseBreakdown from './ExpenseBreakdown';
import MonthlyExpensesBreakdown from './MonthlyExpensesBreakdown';
import IncomeVsExpenses from './IncomeVsExpenses';
import BudgetVsActual from './BudgetVsActual';

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
  const expensesByCategory = [
    { category: 'Food', amount: 500 },
    { category: 'Rent', amount: 1200 },
    { category: 'Transport', amount: 300 },
    { category: 'Entertainment', amount: 200 },
  ];

  const incomeVsExpenses = [
    { month: 'January', income: 4000, expenses: 3500 },
    { month: 'February', income: 4200, expenses: 3800 },
    { month: 'March', income: 4500, expenses: 4100 },
  ];

  const budgetVsActualData = [
    { category: 'Food', budget: 600, actual: 500 },
    { category: 'Rent', budget: 1200, actual: 1200 },
    { category: 'Transport', budget: 300, actual: 350 },
    { category: 'Entertainment', budget: 200, actual: 250 },
  ];

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
    { value: 'monthly-expenses', label: 'Monthly Expenses Breakdown' },
    { value: 'income-vs-expenses', label: 'Income vs. Expenses' },
    { value: 'budget-vs-actual', label: 'Budget vs. Actual' }
  ];

  return (
    <DashboardContainer>
      <h2 style={{ textAlign: 'center' }}>Dashboard</h2>

      {/* Total Income Card */}
      <Card className="card income">
        <h3>Total Income</h3>
        <p>${budget.totalIncome}</p>
      </Card>

      {/* Total Expenses Card */}
      <Card className="card expense">
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

      <ChartContainer  className="chart-container">
        <h3 style={{ textAlign: 'center' }}>
          {selectedChart === 'expenses' ? 'Expenses Breakdown by Category' :
            selectedChart === 'income' ? 'Income Breakdown by Category' :
              selectedChart === 'monthly-expenses' ? 'Monthly Expenses Breakdown by Category' :
                selectedChart === 'income-vs-expenses' ? 'Income vs. Expenses Over Time' :
                  'Budget vs. Actual'}
        </h3>

        {/* Conditionally render the charts */}
        {selectedChart === 'expenses' && (
          <ExpenseBreakdown expenseData={expenseData} totalExpenses={totalExpenses} />
        )}

        {selectedChart === 'income' && (
          <IncomeBreakdown incomeData={incomeData} totalIncome={totalIncome} />
        )}

        {selectedChart === 'monthly-expenses' && (
          <MonthlyExpensesBreakdown data={expensesByCategory} />
        )}

        {selectedChart === 'income-vs-expenses' && (
          <IncomeVsExpenses data={incomeVsExpenses} />
        )}

        {selectedChart === 'budget-vs-actual' && (
          <BudgetVsActual data={budgetVsActualData} />
        )}
      </ChartContainer>

      {/* Link to Budget Overview page */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/budget-overview">
          <button>View Budget Overview</button>
        </Link>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;