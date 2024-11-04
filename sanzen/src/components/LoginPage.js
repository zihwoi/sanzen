import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../firebase/authService';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../context/GlobalState';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useContext(GlobalContext);

    // Get the page user tried to visit or default to dashboard
    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Reset error messages
        setEmailError('');
        setPasswordError('');

        // Client-side validation
        let isValid = true;
        if (!email) {
            setEmailError("Please enter your email.");
            isValid = false;
        }
        if (!password) {
            setPasswordError("Please enter your password.");
            isValid = false;
        }

        if (!isValid) {
            setLoading(false);
            return;
        }

        try {
            const userData = await login(email, password);
            
            // Dispatch user data to context
            if (dispatch) {
                dispatch({ 
                    type: 'SET_USER', 
                    payload: {
                        uid: userData.user.uid,
                        email: userData.user.email,
                        ...userData.userInfo
                    } 
                });
            }

            toast.success("Logged in successfully! Welcome back.");
            setEmail('');
            setPassword('');
            
            // Navigate to the page they tried to visit or dashboard
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        
        try {
            const result = await signInWithPopup(auth, provider);
            
            if (dispatch) {
                dispatch({ 
                    type: 'SET_USER', 
                    payload: {
                        uid: result.user.uid,
                        email: result.user.email,
                        displayName: result.user.displayName,
                        photoURL: result.user.photoURL
                    } 
                });
            }

            toast.success("Google sign-in successful! Welcome.");
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google sign-in error:", error);
            toast.error(error.message || "Google sign-in failed. Please try again.");
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
                                    {emailError && <div className="text-danger">{emailError}</div>}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100" 
                                    disabled={loading}
                                >
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