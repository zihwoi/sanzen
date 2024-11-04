// src/components/BudgetOverview.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';
import BudgetVsActual from './BudgetVsActual'; // Bar chart component

const BudgetOverviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
`;

const BudgetOverview = () => {
  const { budget, transactions } = useContext(GlobalContext);

  // Group expenses by category
  const expensesByCategory = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  // Build data for Budget vs Actual chart
  const budgetVsActualData = Object.keys(budget).map(category => ({
    category,
    budget: budget[category], // Get budget amount for each category
    actual: expensesByCategory[category] || 0, // Get actual expenses per category
  }));

  return (
    <BudgetOverviewContainer>
      <h2 style={{ textAlign: 'center' }}>Budget Overview</h2>
      <BudgetVsActual data={budgetVsActualData} /> {/* Render bar chart */}
    </BudgetOverviewContainer>
  );
};

export default BudgetOverview;
