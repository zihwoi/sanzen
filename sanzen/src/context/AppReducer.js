const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            };
        case 'UPDATE_BUDGET':
            const { type, amount } = action.payload;
            const updatedIncome = type === 'income' ? state.budget.totalIncome + amount : state.budget.totalIncome;
            const updatedExpenses = type === 'expense' ? state.budget.totalExpenses + amount : state.budget.totalExpenses;

            return {
                ...state,
                budget: {
                    ...state.budget,
                    totalIncome: updatedIncome,
                    totalExpenses: updatedExpenses,
                },
            };
        case 'SET_BUDGET_GOAL':
            return {
                ...state,
                budget: {
                    ...state.budget,
                    budgetGoal: action.payload,
                },
            };
        default:
            return state;
    }
};

export default AppReducer;
