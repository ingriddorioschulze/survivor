import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        axios
            .post("/api/register", {
                firstname: e.target.firstname.value,
                lastname: e.target.lastname.value,
                city: e.target.city.value,
                country: e.target.country.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
            .then(() => {
                location.replace("/");
            })
            .catch(() => {
                this.setState({
                    error: "Something went wrong. Please try again!"
                });
            });
    }

    render() {
        let errorDiv;
        if (this.state.error) {
            errorDiv = (
                <div className="form-error-message">{this.state.error}</div>
            );
        }

        return (
            <React.Fragment>
                {errorDiv}
                <div className="register-area">
                    <div className="register-container">
                        <div className="title">register</div>
                        <form className="form" onSubmit={this.submit}>
                            <input
                                name="firstname"
                                className="input"
                                type="text"
                                placeholder="first name"
                                required
                            />
                            <input
                                name="lastname"
                                className="input"
                                type="text"
                                placeholder="last name"
                                required
                            />
                            <input
                                name="city"
                                className="input"
                                type="text"
                                placeholder="city"
                                required
                            />
                            <input
                                name="country"
                                className="input"
                                type="text"
                                placeholder="country"
                                required
                            />
                            <input
                                name="email"
                                className="input"
                                type="text"
                                placeholder="email"
                                required
                            />
                            <input
                                name="password"
                                className="input"
                                type="password"
                                placeholder="password"
                                required
                            />
                            <button className="btn" type="submit">
                                register
                            </button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
