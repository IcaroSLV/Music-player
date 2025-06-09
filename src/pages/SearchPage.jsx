import style from "./SearchPage.module.css";
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import { getAccessToken, searchArtists } from "../services/api";

import SearchArtist from '../components/SearchArtists';

function SearchPage() {
  
  const location = useLocation();
  const backName = location.state?.backName 

  // VARIAVEIS

  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState(backName);
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(backName)
  const limit = 9
  const [hasNext, setHasNext] = useState(false)
  const [artists, setArtists] = useState([]);

  // PEGAR TOKEN DE ACESSO

  useEffect(() => {

    setHasNext(false)

    getAccessToken()
      .then(setAccessToken)
      .catch((err) => console.log(`Erro ao buscar ${err}`))
  }, [])

  // PESQUISAR ARTISTA PELA API

  useEffect(() => {
    const fetchArtist = async () => {

      if (!searchTerm) return;

      setArtists('')
      const offset = (page - 1) * limit

      try {
        const data = await searchArtists(accessToken, searchTerm, limit, offset)
        setArtists(data.items);
        setHasNext(Boolean(data.items))
      } catch (err) {
        console.log(`Erro ao buscar artista: ${err}`)
      }
    }

      if (searchTerm && accessToken) {
        fetchArtist();
      }
    }, [page, searchTerm, accessToken])

  // PEGAR O NOME DO ARTISTA PELO FORM

  function handleSubmit(e) {
    e.preventDefault()
    setSearchTerm(query)
    setPage(1)
  }

  // MUDAR DE PAGINA 

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