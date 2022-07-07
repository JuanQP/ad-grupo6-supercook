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
  return data.receta;
}

const convertirMultimediaRecetaABase64 = async (receta) => {
  const fotosPortadaEnBase64 = await Promise.all(
    receta.fotosPortada.map(async (imagen) => {
      // return await FileSystem.readAsStringAsync(imagen, { encoding: 'base64' });
      const fotoPortadaBase64 = await FileSystem.readAsStringAsync(imagen, { encoding: 'base64' });
      const lastIndex = imagen.lastIndexOf('.');
      const formatoImagen = imagen.slice(lastIndex + 1);
      return ('data:image/' + formatoImagen + ';base64,' + fotoPortadaBase64)
    })
  )
  receta.fotosPortada = fotosPortadaEnBase64;

  for (const [indexPasoReceta, pasoReceta] of receta.pasosReceta.entries()) {
    for (const [indexPasoMultimedia, pasoMultimedia] of pasoReceta.pasosMultimedia.entries()) {
      const uri = receta.pasosReceta[indexPasoReceta].pasosMultimedia[indexPasoMultimedia].img_multimedia;

      const isVideo = !!uri?.match(/\.mp4$/i);

      if (isVideo) {
        const videoBase64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        const video_multimedia = {
          "tipo_multimedia": "video",
          "img_multimedia": videoBase64,
          "pasoId": indexPasoReceta
        };
        receta.pasosReceta[indexPasoReceta].pasosMultimedia[indexPasoMultimedia] = video_multimedia;
      } else {
        const imgBase64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        const imagen_multimedia = {
          "tipo_multimedia": "imagen",
          "img_multimedia": imgBase64,
          "pasoId": indexPasoReceta
        };

        receta.pasosReceta[indexPasoReceta].pasosMultimedia[indexPasoMultimedia] = imagen_multimedia;
      }
    }
  }
  return receta;
}

export async function crearReceta(receta) {
  const nuevaReceta64 = await convertirMultimediaRecetaABase64(receta);
  const { data } = await axios.post('/recetas', nuevaReceta64);
  return data;
}

export async function editarReceta(receta) {
  const nuevaReceta64 = await convertirMultimediaRecetaABase64(receta);
  const { data } = await axios.patch(`/recetas/${receta.id}`, nuevaReceta64);
  return data;
}

export async function reemplazarReceta(receta) {
  const nuevaReceta64 = await convertirMultimediaRecetaABase64(receta);
  const { data } = await axios.put(`/recetas/${receta.id}`, nuevaReceta64);
  return data;
}

export async function getRecetaPorNombre({ nombre, sort }) {
  const { data } = await axios.get('/recetasPorNombre', { params: { nombre, sort } });
  return data.recetas;
}

export async function getRecetaPorCategoria({ tipo, sort }) {
  const { data } = await axios.get('/recetasPorTipo', { params: { tipo, sort } });
  return data.recetas;
}

export async function getRecetaPorIngrediente({ ingrediente, sort }, conIngrediente = true) {
  const endpoint = conIngrediente ? '/recetasPorIngrediente' : '/recetasSinIngrediente';
  const { data } = await axios.get(endpoint, { params: { ingrediente, sort } });
  return data.recetas;
}

export async function getRecetaPorUsuario({ usuario, sort }) {
  const { data } = await axios.get('/recetasPorUsuario', { params: { usuario, sort } });
  return data.recetas;
}

export async function getComentarios(recetaId) {
  const { data } = await axios.get(`/comentarios/${recetaId}`);
  return data.comentarios;
}
