const clientID = '5331a0eaf1db404a8fe9e6002ad35469';
const redirectURI = 'http://berryberry-jam.surge.sh'

let spotifyToken;

const Spotify = {
    getToken() {
        if (spotifyToken) {
            return spotifyToken;
        }
        const url = window.location.href
        const access_token = url.match(/access_token=([^&]*)/)
        const expires_in = url.match(/expires_in=([^&]*)/)

        if (access_token && expires_in) {
            spotifyToken = access_token[1];
            const expiresIn = Number(expires_in[1]);
            window.setTimeout(() => spotifyToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return spotifyToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl
        }
    },

    search(term) {
        spotifyToken = Spotify.getToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`
                }
            }).then(response => {
                return response.json()
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return []
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })
                )
            })
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        };

        spotifyToken = Spotify.getToken();
        // window.alert(spotifyToken)
        const headers = { Authorization: `Bearer ${spotifyToken}` };
        let userID;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            // window.console.log(jsonResponse)
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: playlistName })
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistID = jsonResponse.id;
                    // console.log(playlistID)
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs })
                    })
                })
        });
    }
}

export default Spotify;