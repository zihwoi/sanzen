import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState'; // Import GlobalContext

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
`;

const Dashboard = () => {
  const { incomes, expenses } = useContext(GlobalContext); // Access global incomes and expenses

  // Calculate totals
  const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <DashboardContainer>
      <h2 style={{ textAlign: 'center' }}>Dashboard</h2>
      <Card type="income">
        <h3>Total Income</h3>
        <p>${totalIncome}</p>
      </Card>
      <Card type="expense">
        <h3>Total Expenses</h3>
        <p>${totalExpenses}</p>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;
