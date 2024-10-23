// src/pages/AddTransaction.js
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income');

  // Access global state functions to add income or expense
  const { addIncome, addExpense } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      id: Math.floor(Math.random() * 1000000), // Generate a random ID for each transaction
      amount: parseFloat(amount), // Ensure the amount is a number
      category,
    };

    // Add transaction to the appropriate global state (income or expense)
    if (type === 'income') {
      addIncome(transaction);
    } else {
      addExpense(transaction);
    }

    // Clear form after submission
    setAmount('');
    setCategory('');
  };

  return (
    <FormContainer>
      <h2 style={{ textAlign: 'center' }}>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
        <Button type="submit">Add Transaction</Button>
      </form>
    </FormContainer>
  );
};

export default AddTransaction;
