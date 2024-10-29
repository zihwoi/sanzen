// src/components/RegisterPage.js
import React, { useState } from 'react';
import { register } from '../firebase/authService';
import { db } from '../firebase/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
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

            toast.success("Registration successful! Please log in.");
            // Clear fields after registration
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            if (error.code === 'auth/email-already-in-use') {
                setError("This email address is already in use. Please try logging in.");
            } else {
                setError(error.message);
            }
            toast.error(`Registration failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Store user data in Firestore using displayName for Google users
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                firstName: user.displayName.split(' ')[0], // Assuming displayName is "First Last"
                lastName: user.displayName.split(' ')[1] || "", // Handle case of only first name
                uid: user.uid
            });

            toast.success("Google registration successful!"); 
            navigate("/dashboard");
        } catch (error) {
            console.error("Google registration error:", error);
            setError(error.message);
            toast.error(`Google registration failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
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
            <button onClick={handleGoogleRegister} disabled={loading}>
                Register with Google
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RegisterPage;
