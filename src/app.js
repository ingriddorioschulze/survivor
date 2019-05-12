import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateGarden from "./creategarden";
import Garden from "./garden";
import GardenList from "./gardenlist";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    logout() {
        axios.post("/logout").then(() => {
            window.location = "/welcome";
        });
    }

    componentDidMount() {}

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <header className="app-header" />
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
