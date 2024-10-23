// src/components/ExpenseForm.js
import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ expense, amount: parseFloat(amount) });
    setExpense('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
