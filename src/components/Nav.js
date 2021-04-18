import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    useLocation
  } from "react-router-dom";



export default function Nav() {

    const history = useHistory();
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useState(false);

    const checkLogIn = () => {

        if (location.pathname === '/signup') {
            setLoggedIn(false);
            console.log('User is creating an account');
            return;
        }

        if (location.pathname === '/login') {
            setLoggedIn(false);
            console.log('User on login page');
            return;
        }

        const getToken = sessionStorage.getItem("myToken");
        if (getToken === null) {
            setLoggedIn(false);
            history.push("/login");
            console.log("you need to loog in");
        } else {
            setLoggedIn(true);
            console.log("you are in")
        }

    }

    const logOut =async () => {
        await sessionStorage.clear();
        history.push("/login");
        alert('You have been logged out');
        console.log("logged out");
    }

    useEffect(() => {
        checkLogIn();
    }, [location]);

    return (
        <nav className="w-full">
            <ul className="bg-white flex fixed h-16 items-center justify-around w-full top-0 left-0 text-black shadow-md">
                <li>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                    </Link>
                </li>

                <li>
                    <Link to="/post">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </Link>
                </li>

                {!loggedIn && <li>
                    <Link to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                </li>}

                {/*// Logged in*/}
                {loggedIn && <li title="logout">
                    <button onClick={logOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                    </button>
                </li>}

            </ul>

        </nav>
    )
}

