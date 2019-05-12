import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

const GardenCard = ({ garden }) => (
    <div>
        <Link to={`/garden/${garden.id}`}>{garden.name}</Link>
    </div>
);

export default class GardenList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gardens: []
        };
    }

    componentDidMount() {
        axios.get("/api/gardens").then(({ data }) => {
            this.setState({
                gardens: data
            });
        });
    }

    render() {
        return (
            <div>
                <Link to="/garden/new">create garden</Link>
                {this.state.gardens.map(garden => (
                    <GardenCard key={garden.id} garden={garden} />
                ))}
            </div>
        );
    }
}
