import React from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import SearchResults from './SearachResults/SearchResults'
import Playlist from './Playlist/Playlist'
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'Some Nights',
          artist: 'fun.',
          album: 'Some Nights',
          id: '0kR4Gn7FljUY4t8SKIFyZh',
          uri:'spotify:track:0kR4Gn7FljUY4t8SKIFyZh'
        },
        {
          name: 'The Scientist',
          artist: 'Coldplay',
          album: 'A Rush of Blood to the Head',
          id: '75JFxkI2RXiU7L9VXzMkle',
          uri:'spotify:track:75JFxkI2RXiU7L9VXzMkle'
        },
        {
          id: '6BE4q4cqxgCU3cipzgFAu9',
          name: "DRUNK TALK (feat. sogumm)",
          artist: "MINO",
          album: '"TO INFINITY."',
          uri: 'spotify:track:6BE4q4cqxgCU3cipzgFAu9'
        }
      ],
      playlistName: 'New Playlist',

      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    }
    )
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

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{
      alert(`Playlist <${this.state.playlistName}> saved successfully!`)
        this.setState({ 
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      }
    )
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}


export default App;
