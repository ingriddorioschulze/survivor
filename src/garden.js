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
            <form className="form" onSubmit={this.submit}>
                <input
                    className="input"
                    type="text"
                    name="name"
                    placeholder="name"
                />
                <textarea
                    className="textarea"
                    name="notes"
                    placeholder="notes"
                    cols="50"
                    rows="4"
                />
                <input
                    className="upload-plant-picture"
                    type="file"
                    name="picture"
                    id="file"
                    accept="image/*"
                />
                <label htmlFor="file">
                    <span className="choose-file">choose a file</span>
                </label>
                <select className="select" name="xDays">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <button className="btn">submit</button>
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
        axios.get(`/api/garden/${this.props.gardenId}`).then(({ data }) => {
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
                        <Plant
                            key={plant.id}
                            plant={plant}
                            waterings={this.props.waterings}
                            completeWatering={this.props.completeWatering}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const Plant = ({ plant, waterings, completeWatering }) => {
    const needsWatering = waterings.find(watering => {
        return plant.id === watering.plant_id;
    });

    return (
        <div className="show-plants-area">
            {/* //add picture?// */}
            <div className="show-plant-name">{plant.name}</div>
            {needsWatering && (
                <div onClick={() => completeWatering(needsWatering.id)}>
                    needs water
                </div>
            )}
        </div>
    );
};
