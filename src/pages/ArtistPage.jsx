import { useParams } from "react-router-dom"
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import style from "./ArtistPage.module.css"

import AlbumBox from "../components/AlbumBox";

import { getAccessToken, getArtistById, getAlbumsByArtist, getTracksByAlbum } from "../services/api";

var client_id = '6450da63fe2c47b78fdb7f60c96508b9'
var client_secret = '6c7ce6ee22a74948b9559eadedd30cc0'

function ArtistPage() {
  const { id } = useParams();
  const [accessToken, setAccessToken] = useState('');
  const [artist, setArtist] = useState('')
  const [albums, setAlbums] = useState('')
  const [tracks, setTracks] = useState('')
  const [imagesArtist, setImageArtist] = useState('')
  const [selectedAlbumId, setSelectedAlbuId] = useState('')


  // PEGAR O TOKEN DE ACESSO
  useEffect(() => {
    getAccessToken()
      .then(setAccessToken)
      .catch((err) => console.log(`Erro ao obter token: ${err}`))
  }, [])


  // PEGAR INFORMAÇÕES DO ARTISTA/ALBUMS COM API
  useEffect(() => {
    async function fetchArtistAndAlbums() {

      if (!accessToken || !id) return;

      try {
        const [artistData, albumData] = await Promise.all([
          getArtistById(id, accessToken),
          getAlbumsByArtist(id, accessToken),
        ]);

        setArtist(artistData);
        setAlbums(albumData)
        setImageArtist(artistData.images[0].url)
        
      } catch (err) {
        console.log(`Erro ao buscar Artista ou Album: ${err}`)
      }
    }
    fetchArtistAndAlbums();
  }, [accessToken, id])


  // PEGAR DADOS DAS TRACKS DO ALBUM
  async function getAlbumTracks(id) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    const data = await response.json()
    setTracks(data.items)
    setSelectedAlbuId(id)
    console.log(tracks, selectedAlbumId)
  }

  
  return (
    <div className="">

      <Link to='/'>Voltar</Link>

      <div className={style.info}>
        <div>
          <img alt="imagem do artista" src={imagesArtist}></img>
        </div>
        <div className={style.desc}>
          <div>
            <h1 className="ArtistName">{artist.name}</h1>
          </div>
          <div>
            <p>Seguidores</p>
            {artist && <span>{artist.followers.total}</span>}
          </div>
          <div>
            <p>Popularidade</p>
            {artist && <span>{artist.popularity}</span>}
          </div>
        </div>
      </div>
      <div className={style.AlbumsList}>
        {albums &&
          albums.map((albums) => (
            <div key={albums.id} onClick={() => getAlbumTracks(albums.id)} className="Album">
              <AlbumBox
              album_type={albums.album_type}
              image={albums.images[0].url}
              total_tracks={albums.total_tracks}
              release_date={albums.release_date}
              name={albums.name}
              tracks={selectedAlbumId === albums.id? tracks:[]}
              isOpen={selectedAlbumId === albums.id}
              />
            </div>
          ))
        }
      </div>
      <br />
    </div>)

}

export default ArtistPage