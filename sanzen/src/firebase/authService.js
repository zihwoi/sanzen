// authService.js
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
