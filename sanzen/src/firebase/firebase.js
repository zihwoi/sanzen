// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDEOsUpYRKOTHm7uKXgctjShxIKTVr9an0",
    authDomain: "sanzen-4ccfe.firebaseapp.com",
    projectId: "sanzen-4ccfe",
    storageBucket: "sanzen-4ccfe.appspot.com",
    messagingSenderId: "636939295242",
    appId: "1:636939295242:web:286485243057d24e0f5df3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, auth }; // Export auth for other files
