import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJLc1RF6xmVDZBTDSN2S0G6QNeUkZinW8",
    authDomain: "agrupamet.firebaseapp.com",
    projectId: "agrupamet",
    storageBucket: "agrupamet.appspot.com",
    messagingSenderId: "271688799359",
    appId: "1:271688799359:web:3a84c32527ea309dd65b4a"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = firebase.storage();