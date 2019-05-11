import React from "react";
import axios from "./axios";

export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        e.persist();

        axios
            .post("/api/garden", {
                gardenName: e.target.gardenName.value,
                gardenLocation: e.target.gardenLocation.value,
                gardenType: e.target.gardenType.value
            })
            .then(() => e.target.reset());
    }

    render() {
        return (
            <React.Fragment>
                <div className="garden-container">
                    <div className="garden-title">
                        create me a comfortable and beautiful place to live
                    </div>
                    <form className="garden-form" onSubmit={this.submit}>
                        <input
                            name="gardenName"
                            className="garden-name"
                            placeholder="garden name"
                            required
                        />
                        <input
                            name="gardenLocation"
                            className="garden-location"
                            placeholder="garden location"
                            required
                        />
                        <input
                            name="gardenType"
                            className="garden-type"
                            placeholder="garden type"
                            required
                        />
                        <button className="garden-button">create</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
