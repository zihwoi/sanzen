// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  background-color: #f4f4f4; /* Light gray background */
  color: #333; /* Dark text color */
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 2.5rem; /* Larger font size for the title */
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem; /* Slightly larger font for the paragraph */
  }
`;

const HomeButton = styled.a`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>Welcome to Sanzen!</h1>
      <p>Your personal finance manager.</p>
      <HomeButton href="/add-transaction">Get Started</HomeButton>
    </HomeContainer>
  );
};

export default Home;
