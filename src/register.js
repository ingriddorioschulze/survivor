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
                        <div className="register-text">register</div>
                        <form className="register-form" onSubmit={this.submit}>
                            <input
                                name="firstname"
                                className="register-firstname"
                                type="text"
                                placeholder="first name"
                                required
                            />
                            <input
                                name="lastname"
                                className="register-lastname"
                                type="text"
                                placeholder="last name"
                                required
                            />
                            <input
                                name="city"
                                className="register-city"
                                type="text"
                                placeholder="city"
                                required
                            />
                            <input
                                name="country"
                                className="register-country"
                                type="text"
                                placeholder="country"
                                required
                            />
                            <input
                                name="email"
                                className="register-email"
                                type="text"
                                placeholder="email"
                                required
                            />
                            <input
                                name="password"
                                className="register-password"
                                type="password"
                                placeholder="password"
                                required
                            />
                            <button className="register-button" type="submit">
                                register
                            </button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
