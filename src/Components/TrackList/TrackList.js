import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                <Track />

                <h2>{this.props.tracks}</h2> 
                {/* this works */}

                {/* Cannot get this.props.tracks to work like an array. Codes below will cause the entire page not render... */}

                {/* <h2>{this.props.tracks.length}</h2> */}

                {/* {
                    this.props.tracks.map(track =>{
                        return <h2>{track}</h2>
                    })
                } */}

            </div>
        )
    }
}

export default TrackList;