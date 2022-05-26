import axios from 'axios';

export async function test() {
  const response = await axios.get('/');
  return response.data;
}

export async function recuperarPassword({ email }) {
  const { data } = await axios.post('/recuperarPassword', { email });
  return data;
}

export async function codigoCambioPassword({ email, codigo }) {
  const { data } = await axios.post('/codigoCambioPassword', { email, codigo });
  return data;
}

export async function cambioPassword({ email, password }) {
  const { data } = await axios.post('/cambioPassword', { email, password });
  return data;
}

export async function signup({ email, alias }) {
  const { data } = await axios.post('/signup', { email, alias });
  return data;
}

export async function patchUser(values) {
  const data = await axios.patch('/yo', values);
  return data;
}
