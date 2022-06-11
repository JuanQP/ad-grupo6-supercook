import axios from 'axios';

export async function login(credentials) {
  const { email, password } = credentials;
  const { data } = await axios.post('/login', { email, password });
  return data.usuario;
}
