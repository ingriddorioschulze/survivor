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
            <button onClick={close}>close</button>
            <img className="search-image" src={plant.picture} />
            <span className="search-name">{plant.name}</span>
            <h4>description</h4>
            <p>{plant.description}</p>
            <h4>light</h4>
            <p>{plant.light}</p>
            <h4>water</h4>
            <p>{plant.water}</p>
            <h4>fertilizer</h4>
            <p>{plant.fertilizer}</p>
            <h4>temperature</h4>
            <p>{plant.temperature}</p>
            <h4>humidity</h4>
            <p>{plant.humidity}</p>
            <h4>soil</h4>
            <p>{plant.soil}</p>
            <h4>pot size</h4>
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
            <div className="search welcome-search">
                <input
                    onChange={e => this.search(e.target.value)}
                    type="text"
                    className="search-input"
                    placeholder="search"
                />
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
                                {/* {result.scientific_name} */}
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
        );
    }
}
