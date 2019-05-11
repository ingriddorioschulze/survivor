import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;

if (
    location.pathname == "/welcome" ||
    location.pathname == "/register" ||
    location.pathname == "/login"
) {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
