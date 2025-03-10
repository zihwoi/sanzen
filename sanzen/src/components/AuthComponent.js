// src/components/AuthComponent.js
import React, { useState } from 'react';
import { register, login, logout } from '../firebase/authService'; // Adjust the import as per your authService setup

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            console.log("User logged in successfully");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message); // Update the error state
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
        try {
            await register(email, password);
            console.log("User registered successfully");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message); // Update the error state
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logout();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            setError(error.message); // Update the error state
        } finally {
            setLoading(false);
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
            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};



export default AuthComponent;
