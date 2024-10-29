// src/components/LoginPage.js
import React, { useState } from 'react';
import { login } from '../firebase/authService';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
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
            // Redirect or show success message
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed in with Google:", result.user);
            // Optionally, redirect or show success message
        } catch (error) {
            console.error("Google sign-in error:", error.message);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <button onClick={handleGoogleSignIn} disabled={loading}>
                Sign in with Google
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
