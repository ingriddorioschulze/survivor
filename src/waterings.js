import React from "react";

const Watering = ({ watering, completeWatering }) => (
    <React.Fragment>
        <div>watering</div>
        <div>{watering.plant_name}</div>
        <div>{watering.garden_name}</div>
        {/* <img src={watering.picture} /> */}
        <button onClick={() => completeWatering(watering.id)}>done!</button>
    </React.Fragment>
);

export default class Waterings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
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
