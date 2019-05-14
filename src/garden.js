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
                <div>give me a cute name</div>
                <input
                    className="input input-margin"
                    type="text"
                    name="name"
                    placeholder="name"
                />
                <div>here you can write everything you want about me</div>
                <textarea
                    className="textarea textarea-margin"
                    name="notes"
                    placeholder="notes"
                    cols="50"
                    rows="4"
                />
                <div>upload here a beautiful picture</div>
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
                <div>how often you should remember water me?</div>
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
                </div>
                {addPlant}
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
            <img
                className="show-plant-picture"
                src={plant.picture}
                alt="plant picture"
            />
            <div className="show-plant-name">{plant.name}</div>
            <br />
            {needsWatering && (
                <div onClick={() => completeWatering(needsWatering.id)}>
                    I need water, remember?
                </div>
            )}
        </div>
    );
};
