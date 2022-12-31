import axios from 'axios';

interface CategoriasResponse {
  categorias: Categoria[];
}

interface CategoriaResponse {
  categoria: Categoria;
}

export async function categorias() {
  const { data } = await axios.get<CategoriasResponse>('/categorias');
  return data.categorias;
}


export async function categoriaById({ id }: { id: number | string }) {
  const { data } = await axios.get<CategoriaResponse>(`/categorias/${id}`);
  return data.categoria;
}
