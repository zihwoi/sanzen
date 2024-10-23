// src/components/IncomeForm.js
import React, { useState } from 'react';

const IncomeForm = ({ addIncome }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome({ description, amount: parseFloat(amount) });
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="income-form">
      <h3>Add Income</h3>
      <input
        type="text"
        placeholder="Income Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;