import React, { useState } from 'react';
import { login } from '../firebase/authService';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // For redirection
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Logged in successfully! Welcome back.");
            setEmail(''); // Clear email
            setPassword(''); // Clear password
            navigate('/dashboard'); // Redirect to dashboard or home page
        } catch (error) {
            console.error("Login error:", error);
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(provider); // Use provider directly
            toast.success("Google sign-in successful! Welcome.");
            navigate('/dashboard'); // Redirect to dashboard or home page
        } catch (error) {
            console.error("Google sign-in error:", error.message);
            toast.error(`Google sign-in failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <button onClick={handleGoogleSignIn} disabled={loading}>
                Sign in with Google
            </button>
            <ToastContainer position="top-right" autoClose={3000} /> {/* Position and duration */}
        </div>
    );
};

export default LoginPage;
