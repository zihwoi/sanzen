// GlobalState.js
import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer'; // Corrected the import of AppReducer

// Initial state
const initialState = {
    incomes: JSON.parse(localStorage.getItem('incomes')) || [],
    expenses: JSON.parse(localStorage.getItem('expenses')) || [],
    budget: JSON.parse(localStorage.getItem('budget')) || { totalIncome: 0, totalExpenses: 0, budgetGoal: 0 }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Use effect to save state to localStorage on every state change
    useEffect(() => {
        localStorage.setItem('incomes', JSON.stringify(state.incomes));
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
        localStorage.setItem('budget', JSON.stringify(state.budget));
    }, [state]);

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

    const setBudgetGoal = (goal) => {
        dispatch({
            type: 'SET_BUDGET_GOAL',
            payload: goal,
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
                setBudgetGoal,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
