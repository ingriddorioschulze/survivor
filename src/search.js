import React from "react";
import { Link } from "react-router-dom";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="search"
                />
                <div className="search-results" />
            </div>
        );
    }
}
