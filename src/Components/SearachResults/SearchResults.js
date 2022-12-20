import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>

                {/* this.props.searchResults works as an array here inside of SearchResults component */}

                {
                    this.props.searchResults.map(item => {
                        return <h2>{item}</h2>
                    })
                }
                
                <TrackList tracks={[...this.props.searchResults]}/>

                <h2>{this.props.searchResults[0]}</h2>
            </div>
        )
    }
}

export default SearchResults;