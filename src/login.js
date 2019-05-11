import React from "react";
import axios from "./axios";
import Register from "./register";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        axios
            .post("/api/login", {
                email: e.target.email.value,
                password: e.target.password.value
            })
            .then(() => {
                location.replace("/");
            })
            .catch(error => {
                this.setState({
                    error: error.response.data.error
                });
            });
    }

    render() {
        let errorDiv;
        if (this.state.error) {
            errorDiv = (
                <div className="login-error-message">{this.state.error}</div>
            );
        }

        return (
            <div className="registration-login-container">
                <Register />
                <div className="login-area">
                    {errorDiv}
                    <div className="login-container">
                        <div className="login-title">login</div>
                        <form className="login-form" onSubmit={this.submit}>
                            <input
                                name="email"
                                className="login-email"
                                type="text"
                                placeholder="email"
                                required
                            />
                            <input
                                name="password"
                                className="login-password"
                                type="password"
                                placeholder="password"
                                required
                            />
                            <button
                                className="login-button login-button-hover"
                                type="submit"
                            >
                                login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
