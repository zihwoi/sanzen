// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Navigation from './components/Navigation';
import { GlobalProvider } from './context/GlobalState';
import BudgetOverview from './components/BudgetOverview'; // Adjust the path as necessary


function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const addExpense = (expense) => setExpenses([...expenses, expense]);
  const addIncome = (income) => setIncomes([...incomes, income]);

  return (
    <GlobalProvider>
      <Router>
        <div className="app">
          <Navigation />
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/add-transaction">Add Transaction</Link></li>
              <li><Link to="/budget-overview">Budget Overview</Link></li>

            </ul>
          </nav>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                  />
                }
              />
              <Route
                path="/add-transaction"
                element={
                  <AddTransaction
                    addIncome={addIncome}
                    addExpense={addExpense}
                  />
                }
              />
              <Route path="/budget-overview" element={<BudgetOverview />} /> {/* Add the new route */}
            </Routes>
          </main>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;