import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const BudgetForm = () => {
    const { setBudgetGoal } = useContext(GlobalContext);
    const [category, setCategory] = useState('');
    const [goal, setGoal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category && goal) {
            setBudgetGoal(category, parseFloat(goal));
            setCategory('');
            setGoal('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <h3>Set Budget Goal</h3>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Budget Amount"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
            />
            <button type="submit">Set Budget</button>
        </form>
    );
};

export default BudgetForm;
