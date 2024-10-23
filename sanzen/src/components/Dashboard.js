// src/components/Dashboard.js
import React from 'react';
import styled from 'styled-components';

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

const Dashboard = ({ totalIncome, totalExpenses }) => {
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
