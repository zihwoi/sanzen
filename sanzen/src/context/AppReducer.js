const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            const updatedTransactions = [...state.transactions, action.payload];

            // Calculate total income and expenses
            const totalIncome = updatedTransactions
                .filter(transaction => transaction.type === 'income')
                .reduce((acc, income) => acc + income.amount, 0);

            const totalExpenses = updatedTransactions
                .filter(transaction => transaction.type === 'expense')
                .reduce((acc, expense) => acc + expense.amount, 0);

            return {
                ...state,
                transactions: updatedTransactions,
                budget: {
                    ...state.budget,
                    totalIncome,
                    totalExpenses
                }
            };

        case 'SET_BUDGET_GOAL':
            return {
                ...state,
                budget: { ...state.budget, budgetGoal: action.payload }
            };

        default:
            return state;
    }
};

export default appReducer;
