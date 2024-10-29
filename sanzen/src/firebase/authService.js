// authService.js
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Register new user
export const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Login existing user
export const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// Logout user
export const logout = async () => {
    return await signOut(auth);
};

// Fetch user info from Firestore
export const fetchUserInfo = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
};