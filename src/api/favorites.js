import axios from 'axios';

export async function favoritos() {
  console.log('esto es data');
  const { data } = await axios.get('/favoritos');

  console.log('esto es data', (data));
  return data.favoritos;
}