import {useState} from "react";
import {signInUser} from "../scripts/firebaseFunctions.js";
import {Link} from "react-router-dom";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(password, email);
        const isLoggedIn = await signInUser(email, password);
        console.log(isLoggedIn);
        if (isLoggedIn) {
            window.location.href = "/";
        }
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="Submit" value="Login"/>
            </form>
            <p>New User? <Link to='/register'>Register</Link></p>
        </>
    )
}