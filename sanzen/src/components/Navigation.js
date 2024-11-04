// src/components/Navigation.js
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';

const Nav = styled.nav`
  background-color: #007bff; /* Match with CSS */
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px; /* Increased gap for better spacing */
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px; /* Padding for better touch targets */
  border-radius: 5px; /* Slight rounding */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Hover effect */
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
    text-decoration: underline;
  }
`;

const Navigation = () => {
  const { user, logout } = useContext(GlobalContext); // Access user and logout function
  const history = useHistory(); // Use history for navigation

  const handleLinkClick = (e) => {
    if (!user) {
      e.preventDefault(); // Prevent the link from being followed
      history.push('/login'); // Redirect to login
    }
  };

  return (
    <Nav>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        {user ? ( // Check if user is logged in
          <>
            <NavLink to="/dashboard" onClick={handleLinkClick}>Dashboard</NavLink>
            <NavLink to="/add-transaction" onClick={handleLinkClick}>Add Transaction</NavLink>
            <NavLink to="/budget-overview" onClick={handleLinkClick}>Budget Overview</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </NavLinks>
      {user && ( // Only show user greeting and logout if logged in
        <UserGreeting>
          Welcome, {user.displayName || user.email}!
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </UserGreeting>
      )}
    </Nav>
  );
};

export default Navigation;
