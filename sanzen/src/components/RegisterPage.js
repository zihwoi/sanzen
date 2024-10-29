// src/components/RegisterPage.js
import React, { useState } from 'react';
import { register } from '../firebase/authService';
import { db } from '../firebase/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState(''); // Add nickname state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await register(email, password);
            const user = userCredential.user;

            // Add user data to Firestore with nickname
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                nickname: nickname,
                uid: user.uid
            });

            console.log("User registered successfully");
            // Optionally redirect or display success message
        } catch (error) {
            console.error("Registration error:", error);
            // Check for specific error codes
            if (error.code === 'auth/email-already-in-use') {
                setError("This email address is already in use. Please try logging in.");
            } else {
                setError(error.message);
            }
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

            // Store user data in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                nickname: nickname || user.displayName || "", // Use nickname or display name if available
                uid: user.uid
            });

            console.log("User registered with Google successfully");
            // Optionally redirect or show success message
        } catch (error) {
            console.error("Google registration error:", error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
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
