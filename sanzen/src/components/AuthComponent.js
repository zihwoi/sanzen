// src/components/AuthComponent.js
import React, { useState } from 'react';
import { register, login, logout } from '../firebase/authService'; // Adjust the import as per your authService setup

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            console.log("User logged in successfully");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleRegister = async () => {
        try {
            await register(email, password);
            console.log("User registered successfully");
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};


export default AuthComponent;
