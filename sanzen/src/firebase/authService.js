// src/firebase/authService.js
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Register new user
export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Registration error:", error);
        throw new Error(error.message);
    }
};

// Login existing user
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Optionally fetch user info from Firestore and attach it to the user object
        const userInfo = await fetchUserInfo(user.uid);
        return { ...user, userInfo }; // Return user with additional info
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
    }
};

// Logout user
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout error:", error);
        throw new Error(error.message);
    }
};

// Fetch user info from Firestore
export const fetchUserInfo = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
        console.error("Fetch user info error:", error);
        throw new Error(error.message);
    }
};
