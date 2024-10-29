// AuthComponent.js
import React, { useState } from 'react';
import { register, login, logout } from './authService';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(true);

    const handleRegister = async () => {
        try {
            await register(email, password);
            alert("Registered successfully!");
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await login(email, password);
            alert("Logged in successfully!");
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <h2>{isRegistered ? "Login" : "Register"}</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={isRegistered ? handleLogin : handleRegister}>
                {isRegistered ? "Login" : "Register"}
            </button>
            <button onClick={() => setIsRegistered(!isRegistered)}>
                {isRegistered ? "Switch to Register" : "Switch to Login"}
            </button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AuthComponent;
