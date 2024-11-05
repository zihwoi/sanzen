import React, { useContext, useState } from 'react';
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

const ToggleButton = styled.button`
  background-color: #A6AEBF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #C5D3E8;
  }
`;

const CollapsibleContent = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')}; // Change isOpen to $isOpen
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
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

const CollapsibleTransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TableContainer>
      <ToggleButton onClick={toggleList}>
        {isOpen ? 'Hide Transactions' : 'Show Transactions'}
      </ToggleButton>
      <CollapsibleContent $isOpen={isOpen}> 

      <br></br>
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
            {transactions.map(transaction => (
              <tr key={transaction.id}>
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
      </CollapsibleContent>
    </TableContainer>
  );
};

export default CollapsibleTransactionList;
