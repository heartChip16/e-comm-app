// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARtRsgdTkZ9ghlAMk6_IpKnl5Um27Dicw",
    authDomain: "dn3-streams-e-commerce-192ab.firebaseapp.com",
    projectId: "dn3-streams-e-commerce-192ab",
    storageBucket: "dn3-streams-e-commerce-192ab.appspot.com",
    messagingSenderId: "699008022368",
    appId: "1:699008022368:web:af9e94239a5883d4e21005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [user, setUser] = useState();

    const signUp = (email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        updateProfile(user, { displayName });
        setUser(user);
        return user;
    });

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        setUser(user);
        return user;
    });

    const signOutUser = () => signOut(auth).then(() => {
        setUser(null);
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null);
        });

        return () => unsubscribe();
    }, [])

    return {
        signIn, signUp, signOutUser, user
    }
}


export default AuthProvider;