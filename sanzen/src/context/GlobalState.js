// GlobalState.js
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'; // Corrected the import of AppReducer

// Initial state
const initialState = {
    incomes: [], // Array for income transactions
    expenses: [], // Array for expense transactions
    budget: { totalIncome: 0, totalExpenses: 0, budgetGoal: 0 } // Budget tracking
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component (rename it to GlobalProvider for consistency)
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    const addIncome = (income) => {
        dispatch({
            type: 'ADD_INCOME',
            payload: income,
        });
    };

    const addExpense = (expense) => {
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                incomes: state.incomes,
                expenses: state.expenses,
                budget: state.budget,
                addIncome,
                addExpense,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
