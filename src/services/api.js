const client_id = '6450da63fe2c47b78fdb7f60c96508b9';
const client_secret = '6c7ce6ee22a74948b9559eadedd30cc0';
const apiURL = 'https://api.spotify.com/v1'


// Função para pegar token
export async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}


// Função para buscar artistas
export async function searchArtists(token, searchTerm, limit = 9, offset = 0) {
  const response = await fetch(
    `${apiURL}/search?q=${encodeURIComponent(searchTerm)}&type=artist&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.artists;
}


// Funcão para buscar artista pelo id
export async function getArtistById(id, token) {
    const response = await fetch(`${apiURL}/artists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return await response.json();
  }


// Função para pegar album pelo artista
export async function getAlbumsByArtist(id, token) {
    const response = await fetch(`${apiURL}/artists/${id}/albums`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const data = await response.json();
    return data.items;
  }


// Função para pegar tracks pelo album
export async function getTracksByAlbum(id, token) {
    const response = await fetch(`${apiURL}/albums/${id}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const data = await response.json();
    return data.items;
  }