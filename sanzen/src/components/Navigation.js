// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #007bff; /* Bootstrap primary color */
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/add-transaction">Add Transaction</NavLink>
      <NavLink to="/budget-overview">Budget Overview</NavLink>
    </Nav>
  );
};

export default Navigation;
