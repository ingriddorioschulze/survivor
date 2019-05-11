import React from "react";
import axios from "./axios";
import { BrowserRouter } from "react-router-dom";
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
                    <main />
                    <footer className="copyright">
                        © 2019 survivor by Ingrid do Rio Schulze
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
