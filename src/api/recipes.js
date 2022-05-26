import axios from 'axios';

export async function recomendados() {
  const { data } = await axios.get('/recomendados');
  return data.recetas;
}

export async function recetasUltimas() {
  const { data } = await axios.get('/recetasUltimas');
  return data.recetas;
}

export async function ingredienteDeLaSemana() {
  const { data } = await axios.get('/ingredienteDeLaSemana');
  return data.recetas;
}
