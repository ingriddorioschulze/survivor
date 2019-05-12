import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import CreateGarden from "./creategarden";
import Garden from "./garden";
import GardenList from "./gardenlist";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    logout() {
        axios.post("/api/logout").then(() => {
            window.location = "/welcome";
        });
    }

    componentDidMount() {}

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
                            <a onClick={this.logout}>
                                <img
                                    className="header-logout-icon"
                                    src="/logout-icon.png"
                                    alt="login icon"
                                />
                            </a>
                        </div>
                    </header>
                    <main>
                        <Switch>
                            <Route exact path="/" component={GardenList} />
                            <Route
                                path="/garden/new"
                                component={CreateGarden}
                            />
                            <Route path="/garden/:id" component={Garden} />
                        </Switch>
                    </main>
                    <footer className="copyright">
                        © 2019 Survivor by Ingrid do Rio Schulze
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
