// src/components/RegisterPage.js
import React, { useState } from 'react';
import { register } from '../firebase/authService';
import { db } from '../firebase/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email || !password || !firstName || !lastName) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const userCredential = await register(email, password);
            const user = userCredential.user;

            // Add user data to Firestore with firstName and lastName
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                uid: user.uid
            });

            setSuccessMessage("Registration successful! Please log in.");
            // setTimeout(() => navigate("/login"), 2000);

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            // navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            if (error.code === 'auth/email-already-in-use') {
                setError("This email address is already in use. Please try logging in.");
            } else {
                setError(`Registration failed: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        setError(null);
        setSuccessMessage(null);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Store user data in Firestore using displayName for Google users
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || "",
                uid: user.uid
            });

            setSuccessMessage("Google registration successful!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Google registration error:", error);
            setError("Google registration failed. Please try again.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Register</h2>

                            {/* Success Alert */}
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}

                            {/* Error Alert */}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                    />
                                </div>
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
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </form>
                            <hr />
                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={handleGoogleRegister}
                                disabled={loading}
                            >
                                Register with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default RegisterPage;