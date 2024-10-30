import React, { createContext, useReducer, useEffect, useState } from 'react';
import AppReducer from './AppReducer';
import { auth } from '../firebase/firebase'; // Firebase auth import

// Initial state
const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [],
    budget: JSON.parse(localStorage.getItem('budget')) || { totalIncome: 0, totalExpenses: 0, budgetGoal: 0 },
    user: null, // Add user state to the initial state
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [user, setUser] = useState(null); // Local user state

    // Use effect to save state to localStorage on every state change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        localStorage.setItem('budget', JSON.stringify(state.budget));
    }, [state]);

    // Use effect to monitor user authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); // Set the user state based on auth status
        });
        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    // Actions
    const addTransaction = (transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        });

        // Update budget based on transaction type
        if (transaction.type === 'expense') {
            dispatch({
                type: 'UPDATE_EXPENSES',
                payload: transaction.amount,
            });
        } else if (transaction.type === 'income') {
            dispatch({
                type: 'UPDATE_INCOME',
                payload: transaction.amount,
            });
        }
    };

    const setBudgetGoal = (goal) => {
        dispatch({
            type: 'SET_BUDGET_GOAL',
            payload: goal,
        });
    };

    // Logout function
    const logout = () => {
        auth.signOut().then(() => {
            setUser(null); // Reset user state after logout
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                budget: state.budget,
                user, // Provide user state to context
                setUser, // Include setUser to update user info
                addTransaction,
                setBudgetGoal,
                logout, // Include logout function
            }}
        >
            {children}
        </GlobalContext.Provider>
    );



};
