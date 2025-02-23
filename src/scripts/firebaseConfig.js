// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcwHSfuYHGiSUQjgjyfDDUAFa56RtcwLE",
    authDomain: "pdfreader-4b3ff.firebaseapp.com",
    projectId: "pdfreader-4b3ff",
    storageBucket: "pdfreader-4b3ff.firebasestorage.app",
    messagingSenderId: "861823059375",
    appId: "1:861823059375:web:84dab129948ca6983bdb5a",
    measurementId: "G-62HS8D7WCC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };