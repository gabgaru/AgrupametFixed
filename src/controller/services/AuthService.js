import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from './firebase';
import firestoreService from './FirestoreService'
import { doc, setDoc, getDoc } from 'firebase/firestore'


const googleProider = new GoogleAuthProvider();
googleProider.setCustomParameters({
    prompt: "select_account "
});

class AuthService {
    constructor() {
        if (!AuthService.instance) {
            this.auth = auth;
            AuthService.instance = this;
        }
        return AuthService.instance;
    }

    // Sign up with email and password
    async signUp(email, password, name, phone) {
        try {
            const user = await createUserWithEmailAndPassword(this.auth, email, password);
            console.log(user.user.uid)
            const userRef = doc(firestoreService.db, 'users', user.user.uid)
            await setDoc(userRef, {
                name: name,
                email: email,
                phoneNumber: phone,
                BelongsTo: [],
                IsAdmin: false,
            })
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

    async signUpWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, googleProider);
            const user = result.user;
            const userRef = doc(firestoreService.db, 'users', user.uid)
            const docSnap = await getDoc(userRef);
            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber != null ? user.phoneNumber : null,
                    BelongsTo: [],
                    IsAdmin: false,
                })
            } else {
                console.log("The user already exists");
            }
            return result;
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

    // Sign in with email and password
    async signIn(email, password) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

    // Sign out
    async signOut() {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    }

    // Forgot password
    async forgotPassword(email) {
        sendPasswordResetEmail(this.auth, email)
            .then(() => {
                alert('Se ha enviado un correo para cambiar la contraseña');
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    // Get the current user (if authenticated)
    getCurrentUser() {
        return this.auth.currentUser;
    }

    getUserData = async () => {
        const user = authService.getCurrentUser()?.uid;
        console.log(user)

        const docRef = doc(firestoreService.db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    getName = async () => {
        const user = authService.getCurrentUser()?.uid;
        console.log(user)

        const docRef = doc(firestoreService.db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.name;
        } else {
            console.log("No such document!");
        }
    }

    getEmail = async () => {
        const user = authService.getCurrentUser()?.uid;
        console.log(user)

        const docRef = doc(firestoreService.db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.email;
        } else {
            console.log("No such document!");
        }
    }

    getPhone = async () => {
        const user = authService.getCurrentUser()?.uid;
        console.log(user)

        const docRef = doc(firestoreService.db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.phoneNumber;
        } else {
            console.log("No such document!");
        }
    }

    getAdminStatus = async () => {
        const user = authService.getCurrentUser()?.uid;
        console.log(user)

        const docRef = doc(firestoreService.db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log(userData.IsAdmin)
            return userData.IsAdmin;
        } else {
            console.log("No such document!");
        }
    }
}

const authService = new AuthService();
export default authService;
