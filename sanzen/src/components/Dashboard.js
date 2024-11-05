import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // For navigation
import { GlobalContext } from '../context/GlobalState';
import CustomDropdown from './Dropdown';
import IncomeBreakdown from './IncomeBreakdown';
import ExpenseBreakdown from './ExpenseBreakdown';
import MonthlyExpensesBreakdown from './MonthlyExpensesBreakdown';
import IncomeVsExpenses from './IncomeVsExpenses';
import BudgetVsActual from './BudgetVsActual';
import TransactionForm from './TransactionForm';
import CollapsibleTransactionList from './CollapsibleTransactionList'; // Adjust the path as necessary

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop) // Prevent 'isOpen' from being forwarded
})`
  background-color: ${(props) => (props.type === 'income' ? '#4caf50' : '#f44336')};
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    color: white;
    margin: 0;
  }

  p {
    color: white;
    font-size: 2rem;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 0;
  }
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
    { value: 'monthly-expenses', label: 'Monthly Expenses Breakdown' },
    { value: 'income-vs-expenses', label: 'Income vs. Expenses' },
    { value: 'budget-vs-actual', label: 'Budget vs. Actual' }
  ];

  return (
    <DashboardContainer>
      <h2 className="bold-text" style={{ textAlign: 'center' }}>Dashboard</h2>

      {/* Total Income Card */}
      <Card type="income"> {/* Removed isOpen here, use only type */}
        <h3 className="bold-text">Total Income</h3>
        <p>${totalIncome.toFixed(2)}</p>
      </Card>

      {/* Total Expenses Card */}
      <Card type="expense"> {/* Removed isOpen here, use only type */}
        <h3 className="bold-text">Total Expenses</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </Card>

      <TransactionForm />

      <CollapsibleTransactionList />

      {/* Custom Dropdown for chart selection */}
      <CustomDropdown
        options={options}
        selectedValue={selectedChart}
        onChange={setSelectedChart}
      />

      <ChartContainer className="chart-container">
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
          <MonthlyExpensesBreakdown data={budget.expensesByCategory} />
        )}

        {selectedChart === 'income-vs-expenses' && (
          <IncomeVsExpenses data={budget.incomeVsExpenses} />
        )}

        {selectedChart === 'budget-vs-actual' && (
          <BudgetVsActual data={budget.budgetVsActualData} />
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
