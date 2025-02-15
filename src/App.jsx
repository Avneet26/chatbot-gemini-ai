import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import MainContainer from "./components/MainContainer.jsx";
import NotesContainer from "./components/NotesContainer.jsx";
import WorkoutContainer from "./components/WorkoutContainer.jsx";

function App() {


    return (
        <>
            <header>
                <h2>AI.io</h2>
                <div className="nav-link-container">
                    <li><Link to="/">Chatbot</Link></li>
                    <li><Link to="/notes">Notes</Link></li>
                    <li><Link to="/workout">Workout</Link></li>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/notes" element={<NotesContainer />} />
                <Route path="/workout" element={<WorkoutContainer />} />

            </Routes>
        </>
    )
}

export default App
