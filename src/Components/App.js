import React from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import SearchResults from './SearachResults/SearchResults'
import Playlist from './Playlist/Playlist'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'Some Night',
          artist: 'Fun',
          album: 'Some Night'
        },
        {
          name: 'Scientist',
          artist: 'Coldplay',
          album: 'A rush of blood to the head'
        }
      ],
      playlistName: 'Begin Again',

      playlistTracks: [
        {
          name: 'Family Potrait',
          artist: 'P!nk',
          album: 'Misunderstood',
          id: 1
        },
        {
          name: 'Drunk Talk',
          artist: 'Mino',
          album: 'IDK',
          id: 2
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState(prev => ({
      playlistTracks: [...prev.playlistTracks, track]
    }))
  }

  removeTrack(track) {
    this.setState(prev => ({
      playlistTracks: prev.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    }))

  }

  updatePlaylistName(newName){
      this.setState({playlistName:newName})
  } 

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
