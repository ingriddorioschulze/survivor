/* eslint-disable react/no-unescaped-entities */
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
                <div className="form-text">give me a cute name</div>
                <input
                    className="input input-margin"
                    type="text"
                    name="name"
                    placeholder="name"
                />
                <div className="form-text">
                    here you can write everything you want about me
                </div>
                <textarea
                    className="textarea textarea-margin"
                    name="notes"
                    placeholder="notes"
                    cols="50"
                    rows="4"
                />
                <div className="form-text">upload here my best picture</div>
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
                <div className="form-text">
                    how often you should remember to water me?
                </div>
                <select className="select select-margin" name="xDays">
                    <option value="1">on every 1 day</option>
                    <option value="2">on every 2 days</option>
                    <option value="3">on every 3 days</option>
                    <option value="4">on every 4 days</option>
                    <option value="5">on every 5 days</option>
                    <option value="6">on every 6 days</option>
                    <option value="7">on every 7 days</option>
                </select>
                <button className="btn">good job, human!</button>
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
        this.deleteGarden = this.deleteGarden.bind(this);
        this.deletePlant = this.deletePlant.bind(this);
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

    deleteGarden() {
        axios.delete(`/api/garden/${this.props.gardenId}`).then(() => {
            this.props.history.push("/");
        });
    }

    deletePlant(id) {
        axios.delete(`/api/plant/${id}`).then(() => {
            this.props.plantDeleted(id);
            const garden = { ...this.state.garden };
            garden.plants = garden.plants.filter(plant => {
                return plant.id !== id;
            });
            this.setState({
                garden: garden
            });
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
                    className="btn-add-plant"
                    onClick={() => this.setState({ showAddPlant: true })}
                >
                    <img
                        className="add-garden-icon"
                        src="/add-icon.png"
                        alt="add icon"
                    />
                    <br />
                    add plant
                </button>
            );
        }
        return (
            <div className="show-garden">
                <div className="show-garden-container">
                    <div className="show-garden-name">
                        {this.state.garden.name}
                    </div>
                    <button onClick={this.deleteGarden}>delete garden</button>
                </div>
                {this.state.garden.plants.length === 0 && (
                    <div className="title">
                        you don't have any plants to call your family.
                    </div>
                )}
                {addPlant}
                <div className="show-plants-container">
                    {this.state.garden.plants.map(plant => (
                        <Plant
                            key={plant.id}
                            plant={plant}
                            waterings={this.props.waterings}
                            completeWatering={this.props.completeWatering}
                            deletePlant={this.deletePlant}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const Plant = ({ plant, waterings, completeWatering, deletePlant }) => {
    const needsWatering = waterings.find(watering => {
        return plant.id === watering.plant_id;
    });

    return (
        <div className="show-plants-area">
            <img
                className="show-plant-picture"
                src={plant.picture || "/default.png"}
                alt="plant picture"
            />
            <div className="show-plant-name">{plant.name}</div>
            <br />
            {needsWatering && (
                <div onClick={() => completeWatering(needsWatering.id)}>
                    i'm thirsty!
                </div>
            )}
            <button onClick={() => deletePlant(plant.id)}>delete plant</button>
        </div>
    );
};
