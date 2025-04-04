import style from "./SearchPage.module.css";
import { useState, useEffect } from 'react'

import SearchArtist from '../components/SearchArtists.js';

var client_id = '6450da63fe2c47b78fdb7f60c96508b9'
var client_secret = '6c7ce6ee22a74948b9559eadedd30cc0'

function SearchPage() {

  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState()
  const limit = 9
  const [hasNext, setHasNext] = useState(false)
  const [artists, setArtists] = useState([]);

  useEffect(() => {

    setHasNext(false)

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchArtist = async () => {
      setArtists('')

      if (!query) return;

      const offset = (page - 1) * limit;
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      const data = await response.json()
      console.log(data.artists)
      setArtists(data.artists.items)
      if (data?.artists.next) {
        setHasNext(true);
      }
    }

    if (searchTerm && accessToken) {
      searchArtist();
    }
  }, [page, searchTerm, accessToken])

  function handleSubmit(e) {
    e.preventDefault()
    setSearchTerm(query)
    setPage(1)
  }

  function changePage(direction) {
    setPage((prevPage) => direction === 'previous' ? prevPage - 1 : prevPage + 1);
  }

  return (
    <div className={style.App}>
      <div className={style.search}>
        <h1>Buscar Artista</h1>
        <form onSubmit={handleSubmit}>
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
      </div>
      {artists && (
        <div className={`${style.searchArtists} ${artists.length > 0 ? style.showArtist : ''}`} >
          <div className={style.artistList}>
            {artists.map((artists, index) => (
              <SearchArtist artistData={artists} key={index} />
            ))
            }
          </div>
          <div className={style.direction}>
            {page !== 1 && (
              <div>
                <button onClick={() => changePage('previous')}>&lt;</button>
              </div>
            )}

            {searchTerm && (
              <form>
                <input type="number" value={page} readOnly></input>
              </form>
            )}

            {hasNext && (
              <div>
                <button onClick={() => changePage('next')}>&gt;</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default SearchPage