import axios from 'axios';


export async function categorias() {
  const { data } = await axios.get('/categorias');
  return data.categorias;
}


export async function categoriaById({ id }) {
  const { data } = await axios.get(`/categorias/${id}`);
  return data.categoria;
}
