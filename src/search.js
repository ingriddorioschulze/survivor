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

const Modal = ({ plant, close }) => (
    <div className="modal-container">
        <div className="modal-area">
            <div className="modal-close" onClick={close}>
                &times;
            </div>
            <img className="search-image-modal" src={plant.picture} />
            <span className="search-name-modal">{plant.name}</span>
            <h4>Description</h4>
            <p>{plant.description}</p>
            <h4>Light</h4>
            <p>{plant.light}</p>
            <h4>Water</h4>
            <p>{plant.water}</p>
            <h4>Fertilizer</h4>
            <p>{plant.fertilizer}</p>
            <h4>Temperature</h4>
            <p>{plant.temperature}</p>
            <h4>Humidity</h4>
            <p>{plant.humidity}</p>
            <h4>Soil</h4>
            <p>{plant.soil}</p>
            <h4>Pot Size</h4>
            <p>{plant.pot_size}</p>
        </div>
    </div>
);

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            selectedPlant: undefined
        };
        this.search = debouncer(this.search, this, 350);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    openModal(plant) {
        this.setState({ selectedPlant: plant });
    }

    closeModal() {
        this.setState({ selectedPlant: undefined });
    }

    render() {
        return (
            <React.Fragment>
                <div className="search">
                    <input
                        onChange={e => this.search(e.target.value)}
                        type="text"
                        className="search-input"
                        placeholder="search"
                    />
                </div>
                <div className="show-results">
                    {this.state.searchResults.map(result => {
                        return (
                            <div
                                onClick={() => this.openModal(result)}
                                className="search-result"
                                key={result.id}
                            >
                                <img
                                    className="search-image"
                                    src={result.picture}
                                />
                                <span className="search-name">
                                    {result.name}
                                </span>
                            </div>
                        );
                    })}
                    {this.state.selectedPlant && (
                        <Modal
                            plant={this.state.selectedPlant}
                            close={this.closeModal}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}
