// AppReducer.js

const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INCOME':
            const updatedIncomes = [...state.incomes, action.payload];
            const totalIncome = updatedIncomes.reduce((acc, income) => acc + income.amount, 0);

            return {
                ...state,
                incomes: updatedIncomes,
                budget: {
                    ...state.budget,
                    totalIncome
                }
            };
        case 'ADD_EXPENSE':
            const updatedExpenses = [...state.expenses, action.payload];
            const totalExpenses = updatedExpenses.reduce((acc, expense) => acc + expense.amount, 0);

            return {
                ...state,
                expenses: updatedExpenses,
                budget: {
                    ...state.budget,
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
