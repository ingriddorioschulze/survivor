import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import CreateGarden from "./creategarden";
import Garden from "./garden";
import GardenList from "./gardenlist";
import Waterings from "./waterings";
import Search from "./search";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waterings: []
        };
        this.completeWatering = this.completeWatering.bind(this);
    }

    logout() {
        axios.post("/api/logout").then(() => {
            window.location = "/welcome";
        });
    }

    componentDidMount() {
        axios.get("/api/waterings").then(({ data }) => {
            this.setState({
                waterings: data
            });
        });
    }

    completeWatering(id) {
        axios.post(`/api/watering/${id}/complete`).then(() => {
            this.setState({
                waterings: this.state.waterings.filter(
                    watering => watering.id !== id
                )
            });
        });
    }

    render() {
        const wateringIconClasses = ["header-login-icon"];
        if (this.state.waterings.length > 0) {
            wateringIconClasses.push("has-waterings");
        }
        return (
            <BrowserRouter>
                <div className="app">
                    <header className="header">
                        <NavLink to="/">
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
                            <NavLink to="/waterings">
                                <img
                                    className={wateringIconClasses.join(" ")}
                                    src="/drop-icon.png"
                                    alt="drop icon"
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
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <GardenList
                                        waterings={this.state.waterings}
                                    />
                                )}
                            />
                            <Route
                                path="/garden/new"
                                component={CreateGarden}
                            />
                            <Route
                                path="/garden/:id"
                                render={({ match }) => (
                                    <Garden
                                        gardenId={match.params.id}
                                        waterings={this.state.waterings}
                                        completeWatering={this.completeWatering}
                                    />
                                )}
                            />
                            <Route
                                path="/waterings"
                                render={() => (
                                    <Waterings
                                        waterings={this.state.waterings}
                                        completeWatering={this.completeWatering}
                                    />
                                )}
                            />
                            <Route path="/search" component={Search} />
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
