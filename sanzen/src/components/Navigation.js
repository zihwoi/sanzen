// src/components/Navigation.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';

const Nav = styled.nav`
  background-color: #007bff;
  padding: 10px;
  display: flex;
  justify-content: space-between; // Adjust for user info on the right
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserGreeting = styled.div`
  color: white;
  font-weight: bold;
  display: flex; // Use flex to align items
  align-items: center;
`;

const LogoutButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;

  &:hover {
    text-decoration: underline; // Add hover effect
  }
`;

const Navigation = () => {
  const { user, logout } = useContext(GlobalContext); // Access user and logout function

  return (
    <Nav>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/add-transaction">Add Transaction</NavLink>
        <NavLink to="/budget-overview">Budget Overview</NavLink>
      </NavLinks>
      {user ? (
        <UserGreeting>
          Welcome, {user.displayName || user.email}!
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </UserGreeting>
      ) : (
        <NavLink to="/login">Login</NavLink> // Optionally, include a Login link
      )}
    </Nav>
  );
};

export default Navigation;
