import axios from 'axios';

interface EtiquetasResponse {
  etiquetas: Etiqueta[];
}

export async function etiquetas() {
  const response = await axios.get<EtiquetasResponse>('/etiquetas');
  return response.data;
}
