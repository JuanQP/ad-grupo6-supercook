import axios from 'axios';

export async function favoritos() {
  const { data } = await axios.get('/favoritos');

  //console.log('esto es data', (data));
  return data.favoritos;
}

export async function agregarFavorito({ id }) {
  const { data } = await axios.post('/agregarFavorito', { id });
  return data;
}
