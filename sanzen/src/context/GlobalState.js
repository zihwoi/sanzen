import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [], // Unified transactions
    budget: JSON.parse(localStorage.getItem('budget')) || { totalIncome: 0, totalExpenses: 0, budgetGoal: 0 }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Use effect to save state to localStorage on every state change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        localStorage.setItem('budget', JSON.stringify(state.budget));
    }, [state]);

    // Actions
    const addTransaction = (transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        });
    };

    const setBudgetGoal = (goal) => {
        dispatch({
            type: 'SET_BUDGET_GOAL',
            payload: goal,
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                budget: state.budget,
                addTransaction,
                setBudgetGoal,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
