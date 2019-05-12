import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            garden: null
        };
    }

    componentDidMount() {
        axios
            .get(`/api/garden/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState({
                    garden: data
                });
            });
    }

    render() {
        if (this.state.garden === null) {
            return <div>loading</div>;
        }
        return <div>{this.state.garden.name}</div>;
    }
}
