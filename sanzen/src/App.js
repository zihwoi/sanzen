import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import AddTransaction from './pages/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import BudgetOverview from './components/BudgetOverview';
import NotFound from './pages/NotFound'; // Optional
import './App.css'; // Import global CSS here

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
            </ul>
          </nav>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/budget-overview" element={<BudgetOverview />} />
              <Route path="*" element={<NotFound />} /> {/* Optional */}
            </Routes>
          </main>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
