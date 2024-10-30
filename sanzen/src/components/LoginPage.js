import React, { useState, useContext } from 'react';
import { login } from '../firebase/authService';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../context/GlobalState'; // Import your GlobalContext

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(GlobalContext); // Access the context to set user

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(email, password);
            toast.success("Logged in successfully! Welcome back.");
            setUser(user); // Set user in global context
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (error) {
            console.error("Login error:", error);
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user; // Get user info from result
            toast.success("Google sign-in successful! Welcome.");
            setUser(user); // Set user in global context
            navigate('/dashboard');
        } catch (error) {
            console.error("Google sign-in error:", error.message);
            toast.error(`Google sign-in failed: ${error.message}`);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>
                            <hr />
                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                            >
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default LoginPage;
