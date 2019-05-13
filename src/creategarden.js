import React from "react";
import axios from "./axios";

export default class CreateGarden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();

        axios
            .post("/api/garden", {
                name: e.target.name.value
            })
            .then(({ data }) => this.props.history.push(`/garden/${data.id}`));
    }

    render() {
        return (
            <div className="garden-container">
                <div className="title">
                    create me a comfortable and beautiful place to live
                </div>
                <form className="form" onSubmit={this.submit}>
                    <input
                        name="name"
                        className="input"
                        placeholder="garden name"
                        required
                    />
                    <button className="btn">create</button>
                </form>
            </div>
        );
    }
}
