import React from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import Login from "./login";
import Search from "./search";

class Welcome extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <header className="header">
                        <NavLink to="/welcome">
                            <img
                                className="header-survivor-logo"
                                src="/survivor.png"
                                alt="survivor logo"
                            />
                        </NavLink>
                        <div className="header-icons-container">
                            <NavLink to="/search">
                                <img
                                    className="header-search-icon"
                                    src="/search-icon.png"
                                    alt="search icon"
                                />
                            </NavLink>
                            <NavLink to="/login">
                                <img
                                    className="header-login-icon"
                                    src="/login-icon.png"
                                    alt="login icon"
                                />
                            </NavLink>
                        </div>
                    </header>
                    <main>
                        <div className="welcome-container">
                            <div className="typewriter">
                                <h1>i am gonna make it</h1>
                            </div>
                            <Route path="/login" component={Login} />
                            <Route path="/search" component={Search} />
                        </div>
                    </main>
                    <footer className="copyright">
                        © 2019 Survivor by Ingrid do Rio Schulze
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

export default Welcome;
