import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';

const FormContainer = styled.form`
  background-color: #f3fdf3;
  border: 1px solid #4caf50;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.h3`
  color: #4caf50;
  margin-bottom: 20px;
  font-size: 1.4em;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 30%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  transition: border 0.3s ease;
  font-size: 1em;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const SelectField = styled.select`
  width: 30%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1em;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 50%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

const TransactionForm = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Income');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseFloat(amount) <= 0) {
      alert("Please enter a positive amount.");
      return;
    }

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      type: category === 'Income' ? 'income' : 'expense',
    };

    addTransaction(newTransaction);
    setSuccessMessage("Transaction added successfully!");

    setDescription('');
    setAmount('');
    setCategory('Income');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Transaction</FormTitle>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <InputRow>
        <InputField
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <InputField
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <SelectField
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </SelectField>
      </InputRow>
      <SubmitButton type="submit">Add Transaction</SubmitButton>
    </FormContainer>
  );
};

export default TransactionForm;
