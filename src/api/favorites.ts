import axios from 'axios';

interface FavoritosResponse {
  favoritos: RecetaFavorita[];
}

export async function favoritos() {
  const { data } = await axios.get<FavoritosResponse>('/favoritos');

  return data.favoritos;
}

export async function agregarFavorito({ id }: { id: string | number }) {
  const { data } = await axios.post<string>('/agregarFavorito', { id });
  return data;
}
