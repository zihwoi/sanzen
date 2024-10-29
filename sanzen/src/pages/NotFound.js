import React from 'react';
import { Link } from 'react-router-dom';
import '../NotFound.css'; // Optional: Create a CSS file for styles

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <p>
                You can go back to the <Link to="/">Home Page</Link> or check the navigation above.
            </p>
        </div>
    );
};

export default NotFound;
