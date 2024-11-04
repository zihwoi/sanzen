// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import AddTransaction from './pages/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import BudgetOverview from './components/BudgetOverview';
import NotFound from './pages/NotFound';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalProvider>
  );
}

const AppContent = () => {
  const { user, logout } = useContext(GlobalContext);

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation will happen automatically due to the auth state change
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="app">
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          {!user && (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
          {user && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/add-transaction">Add Transaction</Link></li>
              <li><Link to="/budget-overview">Budget Overview</Link></li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="logout-button" // Add appropriate styling
                >
                  Logout
                </button>
              </li>
              <li>
                <span className="user-email">
                  {user.email}
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget-overview"
            element={
              <ProtectedRoute>
                <BudgetOverview />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;