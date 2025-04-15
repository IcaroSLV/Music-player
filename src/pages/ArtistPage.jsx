import { useParams } from "react-router-dom"
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { getAccessToken, getArtistById, getAlbumsByArtist, getTracksByAlbum } from "../services/api";

var client_id = '6450da63fe2c47b78fdb7f60c96508b9'
var client_secret = '6c7ce6ee22a74948b9559eadedd30cc0'

function ArtistPage() {
    const {id} = useParams();
    const [accessToken, setAccessToken] = useState('');
    const [artist, setArtist] = useState('')
    const [albums, setAlbums] = useState('')
    const [tracks, setTracks] = useState('')


// PEGAR O TOKEN DE ACESSO
  useEffect(() => {
    getAccessToken()
    .then(setAccessToken)
    .catch((err) => console.log(`Erro ao obter token: ${err}`))
  }, [])

  useEffect(() => {
    async function fetchArtistAndAlbums() {
      
      if(!accessToken || !id) return;

      try {
        const[artistData, albumData] = await Promise.all([
          getArtistById(id, accessToken),
          getAlbumsByArtist(id, accessToken),
        ]);

        setArtist(artistData);
        setAlbums(albumData)

      } catch(err) {
        console.log(`Erro ao buscar Artista ou Album: ${err}`)
      }
    }

    fetchArtistAndAlbums();
  }, [accessToken, id])

  // PEGAR DADOS DAS TRACKS DO ALBUM
  async function getAlbumTracks(id) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}`}   
        })
    
        const data = await response.json()
        setTracks(data.items)
        console.log(data.items)
  }

    return(<div>
        <Link to='/'>Voltar</Link>
        <div>{artist.name}</div>
        {albums && 
        albums.map((albums) => (
         <div key={albums.id} onClick={() => getAlbumTracks(albums.id)}>{albums.name}</div>   
        ))
        }
        <br/>
        <div>
            {tracks && 
            tracks.map((tracks, index) => (
                <div key={index}>{tracks.name}</div>
            ))}
        </div>

    </div>)

}

export default ArtistPage