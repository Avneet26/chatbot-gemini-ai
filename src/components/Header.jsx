import {Link} from "react-router-dom";
import React from "react";
import {checkUser, logoutUser} from "../scripts/firebaseFunctions.js";

export default function Header({curruser}) {

    // const [user, setUser] = React.useState(null);
    //
    // React.useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const curruser = await checkUser();
    //             if (curruser === null) {
    //                 console.log("User is not logged in");
    //             } else {
    //                 setUser(curruser);
    //                 console.log("Logged-in user:", curruser);
    //             }
    //         } catch (error) {
    //             console.error("Error checking user:", error);
    //         }
    //     };
    //     getUser();
    // }, []);

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
        // setUser(null);
    }

    console.log(Object.keys(curruser).length);

    return (
        <header>
            <h2>AI.io</h2>
            <div className="nav-link-container">
                <li><Link to="/">Chatbot</Link></li>
                <li><Link to="/notes">Notes</Link></li>
                <li><Link to="/workout">Workout</Link></li>
            </div>
            <div className="user-icon">
                {
                    (Object.keys(curruser).length !== 0) ?
                        <div>Hello, {curruser.displayName}
                            <span className="header-btn" onClick={handleLogout}> Logout</span>
                        </div> :
                        <Link to="/login" className="header-btn">Login</Link>
                }
            </div>
        </header>
    )
}