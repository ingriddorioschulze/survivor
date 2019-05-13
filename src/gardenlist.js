import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

const GardenCard = ({ garden }) => (
    <div className="existing-garden-area">
        <Link to={`/garden/${garden.id}`}>
            <img
                className="garden-icon"
                src="/garden-icon.png"
                alt="garden icon"
            />
            {garden.name}
        </Link>
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
            <div className="garden-overview">
                <div className="create-garden-area">
                    <Link to="/garden/new">
                        <img
                            className="add-icon"
                            src="/add-icon.png"
                            alt="add icon"
                        />
                        <div className="garden-add-text">create garden</div>
                    </Link>
                </div>
                {this.state.gardens.map(garden => (
                    <GardenCard key={garden.id} garden={garden} />
                ))}
            </div>
        );
    }
}
