import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import styled from 'styled-components';

const TableContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  return (
    <TableContainer>
      <h2>Transaction List</h2>
      <Table>
        <thead>
          <tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Category</Th>
            <Th>Type</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}> {/* Using transaction.id directly */}
              <Td>{transaction.description}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.category}</Td>
              <Td>{transaction.type}</Td>
              <Td>
                <Button onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
