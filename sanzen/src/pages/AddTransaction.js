// src/pages/AddTransaction.js
import React from 'react';
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';

const AddTransaction = () => {
  return (
    <div>
      <h1>Add a Transaction</h1>
      <IncomeForm />
      <ExpenseForm />
    </div>
  );
};

export default AddTransaction;
