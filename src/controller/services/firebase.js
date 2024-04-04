import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/*
const firebaseConfig = {
    apiKey: "AIzaSyDJLc1RF6xmVDZBTDSN2S0G6QNeUkZinW8",
    authDomain: "agrupamet.firebaseapp.com",
    projectId: "agrupamet",
    storageBucket: "agrupamet.appspot.com",
    messagingSenderId: "271688799359",
    appId: "1:271688799359:web:3a84c32527ea309dd65b4a"
};*/

//Nueva base de datos
const firebaseConfig = {
    apiKey: "AIzaSyBO2_qi5eNZ1ne1-GtlXlIVAmVU8Ze9W-8",
    authDomain: "agrupametfix.firebaseapp.com",
    projectId: "agrupametfix",
    storageBucket: "agrupametfix.appspot.com",
    messagingSenderId: "846215192863",
    appId: "1:846215192863:web:7dc88cf472ed3fabff102a"
}

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = firebase.storage();