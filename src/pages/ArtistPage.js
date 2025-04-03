import { useParams } from "react-router-dom"
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

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

  const getArtistId = useCallback(async (id) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }   
    });
  
    const data = await response.json();
    setArtist(data.items);
  }, [accessToken]); // Dependência: accessToken
  
  const getAlbumId = useCallback(async (id) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: { Authorization: `Bearer ${accessToken}` }   
    });
  
    const data = await response.json();
    setAlbums(data.items);
  }, [accessToken]); // Dependência: accessToken
  
    // PEGAR DADOS DOS ALGUMS DO ARTISTA
    useEffect(() => {
      if(accessToken && id) {
          getAlbumId(id)
          getArtistId(id)
      }
    }, [accessToken, id, getAlbumId, getArtistId])


  // PEGAR DADOS DAS TRACKS DO ALBUM
  async function getAlbumTracks(id) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}`}   
        })
    
        const data = await response.json()
        setTracks(data.items)
        console.log(data.items)
  }


  // CODIGO DA PÁGINA
    return(<div>
        <Link to='/'>Voltar</Link>
        <div>{artist}</div>
        {albums && 
        albums.map((album) => (
         <div key={album.id} onClick={() => getAlbumTracks(album.id)}>{album.name}</div>   
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