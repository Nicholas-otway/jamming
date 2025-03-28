import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../PlayList/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { Spotify } from "../../util/Spotify/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Cruise",
      artist: "Wiz ",
      album: "Rolling Paper",
      id: "1",
    },
    {
      name: "Pure",
      artist: "Wiz Khalifa",
      album: "Rolling Papers",
      id: "2",
    },
  ]);

  const [playlistName, setPlaylistName] = useState("New Track");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Cruis",
      artist: "Wiz Kha",
      album: "Rolling Stone",
      id: "20",
    },
    {
      name: "Cruie",
      artist: "Wiz Khalif",
      album: "Rolling Stne",
      id: "21",
    },
    {
      name: "Cuise",
      artist: "Wz Khalifa",
      album: "Roling Stone",
      id: "22"
    }
  ]);

  function addTrack(track) {
    const trackExisting = playlistTracks.find((traq) => traq.id === track.id);
    const trackNew = playlistTracks.concat(track);
    if (trackExisting) {
      console.log("Existed Track");
    } else {
      setPlaylistTracks(trackNew);
    }
  };

  function removeTrack(track){
    const trackExisting = playlistTracks.filter((traq) => traq.id !== track.id);
    setPlaylistTracks(trackExisting);
  };

  function playListUpdateName (name){
    setPlaylistName(name);
  };

  function playListSave (){
    const trackURIs = playlistTracks.map((trac)=> trac.uri)
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist")
      setPlaylistTracks([])
    })
  };

  function search(term){
    Spotify.search(term).then(result => setSearchResults(result));
    console.log(term)
  };

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={Spotify.search}/>
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack}  />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onChangeName={playListUpdateName}
            onSave={playListSave}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

