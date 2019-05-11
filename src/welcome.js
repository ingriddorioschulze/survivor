import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Register from "./register";
import Login from "./login";

class Welcome extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <header className="welcome-header">
                        <Link to="/welcome">
                            <img
                                className="welcome-header-survivor-logo"
                                src="/survivor.png"
                                alt="survivor logo"
                            />
                        </Link>
                        <div className="welcome-icons-container">
                            <Link to="/search">
                                <img
                                    className="welcome-header-search-icon"
                                    src="/search-icon.png"
                                    alt="search icon"
                                />
                            </Link>
                            <Link to="/login">
                                <img
                                    className="welcome-header-login-icon"
                                    src="/login-icon.png"
                                    alt="login icon"
                                />
                            </Link>
                            <Link to="logout">
                                <img
                                    className="welcome-header-logout-icon"
                                    src="/logout-icon.png"
                                    alt="login icon"
                                />
                            </Link>
                        </div>
                    </header>
                    <main>
                        <div className="welcome-container">
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                        </div>
                    </main>
                    <footer className="copyright">
                        © 2019 survivor by Ingrid do Rio Schulze
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

export default Welcome;
