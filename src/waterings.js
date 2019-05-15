import React from "react";

const Watering = ({ watering, completeWatering }) => (
    <div className="watering-container">
        <div className="watering-area">
            <div className="plant-name">{watering.plant_name}</div>
            <div className="garden-name">{watering.garden_name}</div>
            <img className="watering-picture" src={watering.picture} />
            <button
                className="btn-watering"
                onClick={() => completeWatering(watering.id)}
            >
                you did it!
            </button>
        </div>
    </div>
);

export default class Waterings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="watering-overview">
                {this.props.waterings.map(watering => (
                    <Watering
                        key={watering.id}
                        watering={watering}
                        completeWatering={this.props.completeWatering}
                    />
                ))}
            </div>
        );
    }
}
