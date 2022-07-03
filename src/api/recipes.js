import axios from 'axios';
import * as FileSystem from 'expo-file-system';

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

const convertirFotosRecetaABase64 = async (receta) => {
  const fotosPortadaEnBase64 = await Promise.all(
    receta.fotosPortada.map(async (imagen) => {
      // return await FileSystem.readAsStringAsync(imagen, { encoding: 'base64' });
      const fotoBase64 = await FileSystem.readAsStringAsync(imagen, { encoding: 'base64' });
      const lastIndex = imagen.lastIndexOf('.');
      const formatoImagen = imagen.slice(lastIndex + 1);
      return ('data:image/' + formatoImagen + ';base64,' + fotoBase64)
    })
  )
  receta.fotosPortada = fotosPortadaEnBase64;

  for (const [indexPasoReceta, pasoReceta] of receta.pasosReceta.entries()) {
    for (const [indexPasoMultimedia, pasoMultimedia] of pasoReceta.pasosMultimedia.entries()) {
      pasoMultimedia[indexPasoMultimedia].img_multimedia = await FileSystem.readAsStringAsync(pasoMultimedia.img_multimedia, { encoding: 'base64' });
    }
  }

  return receta;
}

export async function crearReceta(receta) {
  const nuevaReceta64 = await convertirFotosRecetaABase64(receta);
  // console.log(JSON.stringify(receta.fotosPortada[0]));
  const { data } = await axios.post('/recetas', nuevaReceta64);
  return data;
}

export async function getRecetaPorNombre({nombre, sort}) {
  const { data } = await axios.get('/recetasPorNombre', {params: {nombre, sort}});
  return data.recetas;
}

export async function getRecetaPorCategoria({tipo, sort}) {
  const { data } = await axios.get('/recetasPorTipo', {params: {tipo, sort}});
  return data.recetas;
}
