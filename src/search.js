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
        this.state = {
            searchResults: []
        };
        this.search = debouncer(this.search, this, 350);
    }

    search(term) {
        axios
            .get("/api/search", {
                params: { term: term }
            })
            .then(({ data }) =>
                this.setState({
                    searchResults: data
                })
            );
    }

    render() {
        return (
            <div className="search welcome-search">
                <input
                    onChange={e => this.search(e.target.value)}
                    type="text"
                    className="search-input"
                    placeholder="search"
                />
                {this.state.searchResults.map(result => {
                    let image;
                    if (result.images && result.images.length > 0) {
                        image = result.images[0].url;
                    }
                    return (
                        <div className="search-results" key={result.id}>
                            <img className="search-image" src={result.image} />
                            <span className="search-name">
                                {result.common_name}
                                {/* {result.scientific_name} */}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
