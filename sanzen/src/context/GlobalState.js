// src/context/GlobalState.js
import React, { createContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase/firebase';

// Utility function to safely parse JSON
const safeParse = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    try {
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error parsing JSON for ${key}:`, error);
        return defaultValue; // Return default if parsing fails
    }
};

// Updated initial state using safeParse
const initialState = {
    transactions: safeParse('transactions', []),
    budget: safeParse('budget', {
        expensesByCategory: {},
        totalIncome: 0,
        totalExpenses: 0,
    }),
    actualExpenses: safeParse('actualExpenses', {}),
    user: null,
};


// Reducer function
const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'REMOVE_USER':
            return {
                ...state,
                user: null,
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            };
        case 'SET_BUDGET_GOAL':
            return {
                ...state,
                budget: {
                    ...state.budget,
                    [action.payload.category]: action.payload.goal,
                },
            };
        case 'UPDATE_ACTUAL_EXPENSES':
            const newActualExpenses = {
                ...state.actualExpenses,
                [action.payload.category]: (state.actualExpenses[action.payload.category] || 0) + action.payload.amount,
            };
            return {
                ...state,
                actualExpenses: newActualExpenses,
            };
        default:
            return state;
    }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Persist transactions and budget to local storage
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        localStorage.setItem('budget', JSON.stringify(state.budget));
        localStorage.setItem('actualExpenses', JSON.stringify(state.actualExpenses));
    }, [state.transactions, state.budget, state.actualExpenses]);

    // Listen for auth changes and update user state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                dispatch({ type: 'SET_USER', payload: currentUser });
            } else {
                dispatch({ type: 'REMOVE_USER' });
            }
        });
        return () => unsubscribe();
    }, []);

    // Actions
    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });

        // Update expenses by category if it's an expense
        if (transaction.type === 'expense') {
            dispatch({
                type: 'UPDATE_EXPENSE_BY_CATEGORY',
                payload: { category: transaction.category, amount: transaction.amount }
            });

            // Update actual expenses
            dispatch({
                type: 'UPDATE_ACTUAL_EXPENSES',
                payload: { category: transaction.category, amount: transaction.amount }
            });
        }

        // Update total income if it's an income transaction
        if (transaction.type === 'income') {
            dispatch({
                type: 'UPDATE_TOTAL_INCOME',
                payload: transaction.amount
            });
        }
    };

    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    };

    const setBudgetGoal = (category, goal) => {
        dispatch({ type: 'SET_BUDGET_GOAL', payload: { category, goal } });
    };

    const logout = async () => {
        await auth.signOut();
        dispatch({ type: 'REMOVE_USER' });
    };

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                budget: state.budget,
                user: state.user,
                addTransaction,
                deleteTransaction,
                setBudgetGoal,
                logout,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
