import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import AddTransaction from './pages/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import BudgetOverview from './components/BudgetOverview';
import NotFound from './pages/NotFound'; // Optional
import RegisterPage from './components/RegisterPage'; // Import RegisterPage
import LoginPage from './components/LoginPage'; // Import LoginPage
import './App.css'; // Import global CSS here
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="app">
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/add-transaction">Add Transaction</Link></li>
              <li><Link to="/budget-overview">Budget Overview</Link></li>
              <li><Link to="/register">Register</Link></li> {/* Link to Register */}
              <li><Link to="/login">Login</Link></li> {/* Link to Login */}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/budget-overview" element={<BudgetOverview />} />
              <Route path="/register" element={<RegisterPage />} /> {/* Register Route */}
              <Route path="/login" element={<LoginPage />} /> {/* Login Route */}
              <Route path="*" element={<NotFound />} /> {/* Optional */}
            </Routes>

            {/* <ExampleComponent /> */}
            
            <ToastContainer /> 
          </main>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
