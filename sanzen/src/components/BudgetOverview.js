import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';
import BudgetVsActual from './BudgetVsActual'; // The bar chart for Budget vs Actual

const BudgetOverviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
`;

const BudgetOverview = () => {
  const { budget, transactions } = useContext(GlobalContext);

  // Group transactions by category
  const expensesByCategory = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  // Prepare the data for the Budget vs Actual chart
  const budgetVsActualData = Object.keys(budget).map(category => ({
    category,
    budget: budget[category],
    actual: expensesByCategory[category] || 0
  }));

  return (
    <BudgetOverviewContainer>
      <h2 style={{ textAlign: 'center' }}>Budget Overview</h2>
      <BudgetVsActual data={budgetVsActualData} /> {/* Render Budget vs Actual chart */}
    </BudgetOverviewContainer>
  );
};

export default BudgetOverview;
