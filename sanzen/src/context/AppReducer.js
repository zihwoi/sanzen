// AppReducer.js

const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INCOME':
            return {
                ...state,
                incomes: [...state.incomes, action.payload], // Use `incomes` to match state
                budget: {
                    ...state.budget,
                    totalIncome: state.budget.totalIncome + action.payload.amount
                }
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload], // Use `expenses` to match state
                budget: {
                    ...state.budget,
                    totalExpenses: state.budget.totalExpenses + action.payload.amount
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
