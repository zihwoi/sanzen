// src/pages/AddTransaction.js
import React, { useState } from 'react';

const AddTransaction = ({ addIncome, addExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isIncome, setIsIncome] = useState(true); // Toggle between Income and Expense

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = { amount: parseFloat(amount), category };
    
    if (isIncome) {
      addIncome(transaction);
    } else {
      addExpense(transaction);
    }

    // Reset form fields
    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isIncome ? 'Add Income' : 'Add Expense'}</h2>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Transaction</button>
      <button type="button" onClick={() => setIsIncome(!isIncome)}>
        Switch to {isIncome ? 'Expense' : 'Income'}
      </button>
    </form>
  );
};

export default AddTransaction;
