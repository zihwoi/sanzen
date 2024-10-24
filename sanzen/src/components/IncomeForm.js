import React, { useState, useContext } from 'react';
import styled from 'styled-components'; // Using styled-components for styling
import { GlobalContext } from '../context/GlobalState'; // Import the global context

// Styled-components for the form styling
const FormContainer = styled.form`
  background-color: #f3fdf3;
  border: 1px solid #4caf50;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;  /* Make the form wider for horizontal layout */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.h3`
  color: #4caf50;
  margin-bottom: 20px;
  font-size: 1.4em;
`;

// Horizontal layout for input fields
const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;  /* Align fields horizontally */
  margin-bottom: 20px;  /* Add spacing between row and button */
`;

const InputField = styled.input`
  width: 30%;  /* Make each input field occupy 30% of the width */
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

// Styled select dropdown for category
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
  width: 50%;  /* Make the button take half the width of the form */
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

const IncomeForm = () => {
  const { addTransaction } = useContext(GlobalContext); // We will use a generic addTransaction function
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Income'); // New state for category

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the transaction (either Income or Expense) through the global state action
    const newTransaction = {
      description,
      amount: parseFloat(amount), // Ensure amount is a float
      type: category === 'Income' ? 'income' : 'expense', // Set type based on category
    };

    addTransaction(newTransaction); // Add transaction to global state

    // Clear the form
    setDescription('');
    setAmount('');
    setCategory('Income');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Transaction</FormTitle> {/* Updated title for clarity */}
      {/* Align fields horizontally */}
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
      <SubmitButton type="submit">Add Entry</SubmitButton>
    </FormContainer>
  );
};

export default IncomeForm;
