import axios from 'axios';

export async function preferencias() {
  const response = await axios.get('/preferencias');
  return response.data;
}
