import './App.css'
import { Routes, Route} from "react-router-dom";
import MainContainer from "./components/MainContainer.jsx";
import NotesContainer from "./components/NotesContainer.jsx";
import WorkoutContainer from "./components/WorkoutContainer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import React from "react";
import {checkUser} from "./scripts/firebaseFunctions.js";

function App() {

    const [curruser, setcurrUser] = React.useState({});

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const user = await checkUser();
                if (user === null) {
                    console.log("User is not logged in");
                } else {
                    // console.log("Logged-in user:", user);
                    setcurrUser(user)
                }
            } catch (error) {
                console.error("Error checking user:", error);
            }
        };
        getUser();
    }, [])

    return (
        <>
            <Header curruser={curruser} />
            <Routes>
                <Route path="/" element={<MainContainer curruser={curruser} />} />
                <Route path="/notes" element={<NotesContainer />} />
                <Route path="/workout" element={<WorkoutContainer />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default App
