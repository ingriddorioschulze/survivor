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
        const formData = new FormData();
        formData.append("gardenId", this.props.match.params.id);
        formData.append("plantName", e.target.plantName.value);
        formData.append(
            "plantScientificName",
            e.target.plantScientificName.value
        );
        formData.append("date", e.target.date.value);
        formData.append("plantPicture", e.target.plantPicture.files[0]);
        formData.append("water", e.target.water.value);
        formData.append("soil", e.target.soil.value);
        formData.append("pot", e.target.pot.value);
        formData.append("fertilizer", e.target.fertilizer.value);
        formData.append("light", e.target.light.value);

        axios
            .post("/api/plants", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
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
                            className="plants-plant-picture-input"
                            name="plantPicture"
                            id="file"
                            type="file"
                            accept="image/*"
                        />
                        <label htmlFor="file">
                            <span className="plants-choose-file">
                                choose a file
                            </span>
                        </label>

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
