import axios from 'axios';

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
