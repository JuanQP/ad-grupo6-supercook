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
  // const { data } = await axios.get(`/checkearReceta/${recetaId}`);
  // return data.receta;
  return await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({existeReceta: nombre === 'existe'});
    }, 1000);
  });
}
