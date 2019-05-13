import React from "react";
import axios from "./axios";

class AddPlant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input type="text" name="name" />
                <textarea name="notes" />
                <input type="file" name="picture" />
                <select name="xDays">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <button>submit</button>
            </form>
        );
    }

    submit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("gardenId", this.props.gardenId);
        formData.append("name", e.target.name.value);
        formData.append("notes", e.target.notes.value);
        formData.append("picture", e.target.picture.files[0]);
        formData.append("xDays", e.target.xDays.value);

        axios
            .post("/api/plants", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(({ data }) => this.props.plantAdded(data));
    }
}

export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            garden: null,
            showAddPlant: false
        };
        this.plantAdded = this.plantAdded.bind(this);
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

    plantAdded(plant) {
        const garden = { ...this.state.garden };
        garden.plants.unshift(plant);
        this.setState({
            garden: garden,
            showAddPlant: false
        });
    }

    render() {
        if (this.state.garden === null) {
            return <div>loading</div>;
        }

        let addPlant;
        if (this.state.showAddPlant) {
            addPlant = (
                <AddPlant
                    gardenId={this.state.garden.id}
                    plantAdded={this.plantAdded}
                />
            );
        } else {
            addPlant = (
                <button
                    className="btn"
                    onClick={() => this.setState({ showAddPlant: true })}
                >
                    add plant
                </button>
            );
        }
        return (
            <div className="show-garden">
                <div className="show-garden-container">
                    <div className="show-garden-area">
                        <img
                            className="show-garden-icon"
                            src="/garden-icon.png"
                            alt="garden icon"
                        />
                        <div className="show-garden-name">
                            {this.state.garden.name}
                        </div>
                    </div>
                    {addPlant}
                </div>
                <div className="show-plants-container">
                    {this.state.garden.plants.map(plant => (
                        <div key={plant.id} className="show-plants-area">
                            {/* //add picture?// */}
                            <div className="show-plant-name">{plant.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
