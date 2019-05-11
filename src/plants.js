import React from "react";
import axios from "./axios";

export default class Plants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        e.persist();
        axios
            .post("/api/plants", {
                plantName: e.target.plantName.value,
                plantScientificName: e.target.plantScientificName.value,
                date: e.target.date.value,
                plantPicture: e.target.plantPicture.value,
                water: e.target.water.value,
                soil: e.target.soil.value,
                pot: e.target.pot.value,
                fertilizer: e.target.fertilizer.value,
                light: e.target.light.value
            })
            .then(() => e.target.reset());
    }

    render() {
        return (
            <React.Fragment>
                <div className="plants-container">
                    <div className="plants-title">
                        register here my personal details.
                    </div>
                    <form className="plants-form" onSubmit={this.submit}>
                        <input
                            name="plantName"
                            className="plants-plant-name"
                            placeholder="name"
                            required
                        />
                        <input
                            name="plantScientificName"
                            className="plants-plant-scientific-Name"
                            placeholder="scientific name"
                        />
                        <input
                            name="date"
                            className="plants-plant-date"
                            placeholder="date"
                            required
                        />
                        <input
                            name="plantPicture"
                            className="plants-plant-picture"
                            placeholder="picture"
                        />
                        <input
                            name="water"
                            className="plants-plant-water"
                            placeholder="water"
                            required
                        />
                        <input
                            name="soil"
                            className="plants-plant-soil"
                            placeholder="soil"
                        />
                        <input
                            name="pot"
                            className="plants-plant-pot"
                            placeholder="pot"
                        />
                        <input
                            name="fertilizer"
                            className="plants-plant-fertilizer"
                            placeholder="fertilizer"
                        />
                        <input
                            name="light"
                            className="plants-plant-light"
                            placeholder="light"
                        />
                        <button className="plants-button">create</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
