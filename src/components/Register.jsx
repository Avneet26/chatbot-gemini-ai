import {useState} from "react";
import { registerUser } from "../scripts/firebaseFunctions.js"
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(password, email);
        const isRegistered = await registerUser(email, password, username);
        if (isRegistered) {
            window.location.href = "/";
        }
    }

    return (
        <>
            <h2>Register new User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="Submit" value="Register"/>
            </form>
        </>
    )
}