import {auth, db} from './firebaseConfig.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "firebase/auth";

import {
    collection,
    addDoc, query, where, getDocs
} from "firebase/firestore";

const checkUser = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                resolve(currentUser); // User is logged in
            } else {
                resolve(null); // No user logged in
            }
        }, (error) => {
            reject(error); // Handle errors, if any
        });
    });
}

const registerUser = async(email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add the display name
        await updateProfile(user, {
            displayName: displayName
        });

        console.log("User registered:", user);
        return true;
    } catch (error) {
        console.error("Registration error:", error.message);
        return false;
    }
}

const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
        return true;
    } catch (error) {
        console.error("Sign-in error:", error.message);
        return false;
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
        return true;
    } catch (error) {
        console.error("Logout error:", error.message);
        return false;
    }
};

const addDataWithUserId = async (collectionName, data) => {
    try {
        const user = auth.currentUser; // Get the currently logged-in user

        if (user) {
            const userId = user.uid;
            // Add data to Firestore
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                userId: userId,
                timestamp: new Date()
            });
            console.log("Data successfully written with ID:", docRef.id);
            return true
        } else {
            console.log("No user is logged in.");
            return false;
        }
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
};

const getDataByUserId = async (userId, collectionName) => {
    try {
        // Create a reference to the collection
        const collectionRef = collection(db, collectionName); // Use the modular collection function

        // Create a query that filters by userId
        const q = query(collectionRef, where("userId", "==", userId));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if any documents were found
        if (querySnapshot.empty) {
            //console.log("No matching documents found.");
            return null;
        }

        // Loop through the documents and return their data
        const results = [];
        querySnapshot.forEach((doc) => {
            //console.log("Document ID:", doc.id, "=>", doc.data());
            results.push({ id: doc.id, ...doc.data() });
        });

        return results; // Return the array of results
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { registerUser, checkUser, signInUser, logoutUser, addDataWithUserId, getDataByUserId };