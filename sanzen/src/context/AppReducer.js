const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            };

        case 'UPDATE_EXPENSE_BY_CATEGORY': {
            // Destructure action.payload with unique names to avoid conflicts
            const { category, amount } = action.payload;
            return {
                ...state,
                budget: {
                    ...state.budget,
                    expensesByCategory: {
                        ...state.budget.expensesByCategory,
                        [category]: (state.budget.expensesByCategory[category] || 0) + amount,
                    },
                },
            };
        }

        case 'UPDATE_BUDGET': {
            // Distinct variable names to avoid redeclaration issues
            const { transactionType, amount: transactionAmount } = action.payload;
            const updatedIncome = transactionType === 'income'
                ? state.budget.totalIncome + transactionAmount
                : state.budget.totalIncome;
            const updatedExpenses = transactionType === 'expense'
                ? state.budget.totalExpenses + transactionAmount
                : state.budget.totalExpenses;

            return {
                ...state,
                budget: {
                    ...state.budget,
                    totalIncome: updatedIncome,
                    totalExpenses: updatedExpenses,
                },
            };
        }

        case 'SET_BUDGET_GOAL':
            return {
                ...state,
                budget: {
                    ...state.budget,
                    budgetGoal: action.payload,
                },
            };

        case 'UPDATE_TOTAL_INCOME':
            return {
                ...state,
                budget: {
                    ...state.budget,
                    totalIncome: state.budget.totalIncome + action.payload,
                },
            };

        default:
            return state;
    }
};

export default AppReducer;
