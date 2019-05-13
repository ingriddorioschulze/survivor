import React from "react";
import axios from "./axios";

function debouncer(fn, thisarg, time) {
    let timeout;

    return function() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(fn.bind(thisarg, ...arguments), time);
    };
}

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.search = debouncer(this.search, this, 350);
    }

    search(term) {
        axios
            .get("/api/search", {
                params: { term: term }
            })
            .then(({ data }) =>
                this.setState({
                    results: data
                })
            );
    }

    render() {
        return (
            <div className="search">
                <input
                    onChange={e => this.search(e.target.value)}
                    type="text"
                    className="search-input"
                    placeholder="search"
                />
                <div className="search-results" />
            </div>
        );
    }
}
