import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Garden from "./garden";
import Plants from "./plants";

// import SearchBox from "./searchbox";

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
                        <Route exact path="/garden" component={Garden} />
                        <Route path="/garden/:id" component={Plants} />
                    </main>
                    <footer className="copyright">
                        © 2019 Survivor by Ingrid do Rio Schulze
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
