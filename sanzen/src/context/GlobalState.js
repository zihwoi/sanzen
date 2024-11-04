// src/context/GlobalState.js
import React, { createContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase/firebase';

// Initial state
const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [],
    budget: JSON.parse(localStorage.getItem('budget')) || {
        Housing: 1300,
        Food: 500,
        Transportation: 200,
        Entertainment: 250,
    },
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
    }, [state.transactions, state.budget]);

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
                setBudgetGoal,
                logout,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
