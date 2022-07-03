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

export async function getReceta(recetaId) {
  const { data } = await axios.get(`/recetas/${recetaId}`);
  return data.receta;
}

export async function checkearReceta(nombre) {
  const { data } = await axios.get(`/checkearReceta`, { params: { nombre } });
  return data;
}

export async function crearReceta(receta) {
  const { data } = await axios.post('/recetas', receta);
  return data;
}

export async function getRecetaPorNombre({nombre, sort}) {
  const { data } = await axios.get('/recetasPorNombre', {params: {nombre, sort}});
  return data.recetas;
}
