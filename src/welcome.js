import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Register from "./register";
import Login from "./login";

class Welcome extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <header className="app-header">
                        <Link className="header-register-button" to="/register">
                            register
                        </Link>
                        <Link className="header-login-button" to="/login">
                            login
                        </Link>
                    </header>
                    <main>
                        <div className="welcome-container">
                            <img
                                className="survivor-logo"
                                src="/survivor.png"
                                alt="survivor logo"
                            />
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
