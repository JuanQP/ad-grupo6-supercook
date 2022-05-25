const axios = require('axios').default;

axios.defaults.baseURL = '/api';

export async function test() {
  const response = await axios.get('/');
  return response.data;
}

export async function login(credentials) {
  const { email, password } = credentials;
  const { data } = await axios.post('/login', { email, password });
  return data;
}
