let accessToken = "";
const clientID = "d6dcfa48eb5d4b40a1e37e15b909dff9";
const redirectUrl = "http://localhost:3000";

const Spotify = {
  getAccessToken() {
    //first check for the access token
    if (accessToken) return accessToken;

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlTokenExpiration = window.location.href.match(/expires_in=([^&]*)/);

    //second check for the access token
    if (urlAccessToken && urlTokenExpiration) {
      //setting access token and expiry time var;
      accessToken = urlAccessToken[1];
      const tokenExpire = Number(urlTokenExpiration[1]);
      //setting the function which will reset the access token when it  expires
      window.setTimeout(() => (accessToken = ""), tokenExpire * 1000);

      //Cleari the url after the access token is expired
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }

    //third check for the access token if the first and second check are both false
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((response) => response.json()).then((jsonResponse) => {
        if (!jsonResponse) {
          console.error("Error");
        }

        return jsonResponse.tracks.items.map((trac) => ({
          id: trac.id,
          name: trac.name,
          artist: trac.artists[0].name,
          album: trac.album.name,
          uri: trac.uri,
        }));
      });
    },
  

  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const secondAccessToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer:${secondAccessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json)
      .then((jsonResponse) => {
        userId = jsonResponse.id;
    
     let playlistId;

    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: header,
      method: "POST",
      body: JSON.stringify(name),
      })
      .then((response) =>response.json)
      .then((jsonResponse) =>{
        playlistId = jsonResponse.id;

    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: header,
      method: "POST",
      body: JSON.stringify({uri: trackUris})
    })
      })
    });
  },
};

export { Spotify };




/*let accessToken = "";
const clientID = "16d9887644e0457db5532ebebd476d30";
// const redirectUrl = "http://localhost:3000";
const redirectUrl = "https://syphersjammmingproject.surge.sh";

const Spotify = {
  getAccessToken() {
    // First check for the access token
    if (accessToken) return accessToken;

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    // Second check for the access token
    if (tokenInURL && expiryTime) {
      // setting access token and expiry time variables
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      // Setting the access token to expire at the value for expiration time
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }

    // Third check for the access token if the first and second check are both false
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          console.error("Response error");
        }
        return jsonResponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },
};
export { Spotify };*/



/*let accessToken = "";
const clientID = "d6dcfa48eb5d4b40a1e37e15b909dff9";
const redirectUrl = "http://localhost:3000";



const Spotify = {
  getAccessToken() {
    //first check for the access token
    if (accessToken) return accessToken;

    const urlAccessToken = window.location.hmref.match(/access_token=([^&]*)/);
    const urlTokenExpiration = window.location.href.match(/expires_in=([^&]*)/);

    //second check for the access token
    if (urlAccessToken && urlTokenExpiration) {
      //setting access token and expiry time var;
      accessToken = urlAccessToken[1];
      const tokenExpire = Number(urlTokenExpiration[1]);
      //setting the function which will reset the access token when it  expires
      window.setTimeout(() => (accessToken = ""), tokenExpire * 1000);

      //Cleari the url after the access token is expired
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }

    //third check for the access token if the first and second check are both false
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => response.json())
    .then(jsonResponse =>{
        if(!jsonResponse){
            console.log("Error")
        }
           console.log(accessToken);
        return jsonResponse.tracks.items.map(trac =>({
            id: trac.id,
            name: trac.name,
            artist: trac.artists[0].name,
            album: trac.album.name,
            uri: trac.uri
        }))
    })
  },



  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const secondAccessToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer: ${secondAccessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json)
      .then((jsonResponse) => {
        userId = jsonResponse.id;
    
     let playlistId;

    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: header,
      method: "POST",
      body: JSON.stringify(name),
      })
      .then((response) =>response.json)
      .then((jsonResponse) =>{
        playlistId = jsonResponse.id;

    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: header,
      method: "POST",
      body: JSON.stringify({uri: trackUris})
    })
      })
    });
  },

};

export { Spotify };*/

