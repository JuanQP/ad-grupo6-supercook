import axios from 'axios';

export async function etiquetas() {
  const response = await axios.get('/etiquetas');
  return response.data;
}
