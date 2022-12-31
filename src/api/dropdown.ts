import axios from 'axios';

interface EtiquetasResponse {
  data: Etiqueta[];
}

export async function etiquetas() {
  const response = await axios.get<EtiquetasResponse>('/etiquetas');
  return response.data;
}
