import axios from 'axios';

export async function favoritos() {
  console.log('esto es data');
  const { data } = await axios.get('/favoritos');

  console.log('esto es data', (data));
  return data.favoritos;
}

export async function agregarFavorito() {
  console.log('esto es fav');
  const { data } = await axios.post('/agregarFavorito');
  return data.recetas;
}
