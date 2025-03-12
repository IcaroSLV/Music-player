import "./App.css";
import { Buffer } from 'buffer';
import { useState, useEffect} from 'react'

import SearchArtist from './components/SearchArtists.js';

var client_id = '6450da63fe2c47b78fdb7f60c96508b9'
var client_secret = '6c7ce6ee22a74948b9559eadedd30cc0'
var access_token = ''

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState();
  const [artists, setArtists] = useState();

  useEffect(() => {
    async function getToken() {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret),
        },
        body: 'grant_type=client_credentials',
        }) 
        
        const data = await response.json();
        setAccessToken(data.access_token);
    }

    getToken()
  }, [])

  async function searchArtist(artistName) {
    setArtists('')

    if(!query) return;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
    headers: { Authorization: `Bearer ${accessToken}`}   
    })

    const data = await response.json()
    console.log(data.artists.items)
    setArtists(data.artists.items)
  }

  function handleSubmit(e) {
      e.preventDefault()

      searchArtist()
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Buscar Artista no Spotify</h1>
  
        <input
          type="text"
          placeholder="Digite o nome do artista"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={!accessToken}>
          Buscar
        </button>
      </form>
      <div className="searchArtists">
        {artists && 
          artists.map((artists, index) => (
            <SearchArtist artistData={artists} key={index}/>
          ))
        }
      </div>
    </div>
  );
}

export default App;
