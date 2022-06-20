import axios from 'axios';


export async function categorias() {
    const { data } = await axios.get('/categorias');
    return data.categorias;
  }
  