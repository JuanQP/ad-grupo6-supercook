import axios from 'axios';
import * as FileSystem from 'expo-file-system';

type RecetaSort = undefined | 1 | 2

type FullDetailedReceta = Receta & {
  usuario: Pick<Usuario, "nombre" | "apellido" | "img_perfil">;
  ingredientes: Pick<Ingrediente, "cantidad" | "descripcion" | "unidad">[];
  comentarios: Pick<Comentario, "descripcion">[];
  categoria: Pick<Categoria, "descripcion">;
  fotosPortada: Pick<RecetaImagen, "imagen">[];
  etiquetas: Pick<Etiqueta, "descripcion">;
  pasosReceta: Paso[];
  esFavorita: boolean;
}

type GetRecetaResponse = {
  receta: Omit<FullDetailedReceta, "etiquetas">;
}

type CheckearRecetaResponse = {
  receta: (Omit<FullDetailedReceta, "usuario"> & {
    categoriaId: number;
    usuarioId: number;
    createdAt: string;
    updatedAt: string;
    etiquetas: Etiqueta[];
  });
}

type RecetasResponse = {
  recetas: (Receta & {
    usuario: Pick<Usuario, "nombre" | "apellido">;
    fotosPortada: Pick<RecetaImagen, "imagen">[];
    etiquetas: Pick<Etiqueta, "descripcion">;
    esFavorita: boolean;
  })[];
}

type RecetasUltimasResponse = {
  recetas: (Receta & {
    usuario: Pick<Usuario, "nombre">;
    fotosPortada: Pick<RecetaImagen, "imagen">[];
    esFavorita: boolean;
  })[];
}

type RecetasSemanaResponse = {
  recetas: (Receta & {
    usuario: Pick<Usuario, "nombre">;
    fotosPortada: Pick<RecetaImagen, "imagen">[];
    esFavorita: boolean;
    ingredientes: Pick<Ingrediente, "descripcion">[];
  })[];
}

type RecetaData = Omit<Receta, "id" | "fecha" | "verificada"> & {
  fotosPortada: string[];
  pasosReceta: (Pick<Paso, "numero_paso" | "descripcion_paso"> & {
    pasosMultimedia: Omit<PasoMultimedia, "pasoId" | "tipo_multimedia">[];
  })[];
}

type RecetaPorNombreResponse = {
  recetas: Omit<FullDetailedReceta, "ingredientes" | "comentarios" | "categoria" | "etiquetas" | "pasosReceta" >[];
}

type RecetaPorCategoriaResponse = {
  recetas: Omit<FullDetailedReceta, "ingredientes" | "comentarios" | "etiquetas" | "pasosReceta" >[];
}

type RecetaPorIngredienteResponse = {
  recetas: Omit<FullDetailedReceta, "comentarios" | "categoria" | "etiquetas" | "pasosReceta" >[];
}

type ComentariosResponse = {
  comentarios: Comentario[];
}

export async function recomendados() {
  const { data } = await axios.get<RecetasResponse>('/recomendados');
  return data.recetas;
}

export async function recetasUltimas() {
  const { data } = await axios.get<RecetasUltimasResponse>('/recetasUltimas');
  return data.recetas;
}

export async function ingredienteDeLaSemana() {
  const { data } = await axios.get<RecetasSemanaResponse>('/ingredienteDeLaSemana');
  return data.recetas;
}

export async function getReceta(recetaId: number | string) {
  const { data } = await axios.get<GetRecetaResponse>(`/recetas/${recetaId}`);
  return data.receta;
}

export async function checkearReceta(nombre: string) {
  const { data } = await axios.get<CheckearRecetaResponse>(`/checkearReceta`, { params: { nombre } });
  return data.receta;
}

const convertirMultimediaRecetaABase64 = async (receta: RecetaData) => {
  const fotosPortadaEnBase64 = await Promise.all(
    receta.fotosPortada.map(async (imagen) => {
      // Si empieza con http entonces es una imagen que ya existe en el backend,
      // no hacemos nada
      if(imagen.match(/^http/i)) return imagen;

      const fotoPortadaBase64 = await FileSystem.readAsStringAsync(imagen, { encoding: 'base64' });
      const lastIndex = imagen.lastIndexOf('.');
      const formatoImagen = imagen.slice(lastIndex + 1);
      return ('data:image/' + formatoImagen + ';base64,' + fotoPortadaBase64)
    })
  )
  receta.fotosPortada = fotosPortadaEnBase64;

  for (const [indexPasoReceta, pasoReceta] of receta.pasosReceta.entries()) {
    for (const [indexPasoMultimedia, _] of pasoReceta.pasosMultimedia.entries()) {
      const uri = receta.pasosReceta[indexPasoReceta].pasosMultimedia[indexPasoMultimedia].img_multimedia;

      const isVideo = !!uri?.match(/\.mp4$/i);
      const isHttp = !!uri?.match(/^http/i);
      // URL o base64
      const base64 = isHttp ? null : (await FileSystem.readAsStringAsync(uri, { encoding: 'base64' }));
      const lastIndex = isHttp ? 0 : uri.lastIndexOf('.');
      const formatoMultimedia = isHttp ? '' : uri.slice(lastIndex + 1);
      const multimedia: PasoMultimedia = {
        tipo_multimedia: isVideo ? 'video' : 'imagen',
        img_multimedia: isHttp ? uri : `data:${isVideo ? 'video' : 'image'}/${formatoMultimedia};base64,${base64}`,
        pasoId: indexPasoReceta,
      };
      receta.pasosReceta[indexPasoReceta].pasosMultimedia[indexPasoMultimedia] = multimedia;
    }
  }
  return receta;
}

export async function crearReceta(receta: RecetaData) {
  const nuevaReceta64 = await convertirMultimediaRecetaABase64(receta);
  const { data } = await axios.post<string>('/recetas', nuevaReceta64);
  return data;
}

export async function editarReceta(receta: RecetaData & WithId) {
  const nuevaReceta64 = await convertirMultimediaRecetaABase64(receta);
  const { data } = await axios.patch<string>(`/recetas/${receta.id}`, nuevaReceta64);
  return data;
}

export async function reemplazarReceta(receta: RecetaData & WithId) {
  const nuevaReceta64 = await convertirMultimediaRecetaABase64(receta);
  const { data } = await axios.put<string>(`/recetas/${receta.id}`, nuevaReceta64);
  return data;
}

export async function getRecetaPorNombre({ nombre, sort }: { nombre: string, sort: RecetaSort }) {
  const { data } = await axios.get<RecetaPorNombreResponse>('/recetasPorNombre', { params: { nombre, sort } });
  return data.recetas;
}

export async function getRecetaPorCategoria({ tipo, sort }: { tipo: string, sort: RecetaSort }) {
  const { data } = await axios.get<RecetaPorCategoriaResponse>('/recetasPorTipo', { params: { tipo, sort } });
  return data.recetas;
}

export async function getRecetaPorIngrediente({ ingrediente, sort }: { ingrediente: string, sort: RecetaSort }, conIngrediente = true) {
  const endpoint = conIngrediente ? '/recetasPorIngrediente' : '/recetasSinIngrediente';
  const { data } = await axios.get<RecetaPorIngredienteResponse>(endpoint, { params: { ingrediente, sort } });
  return data.recetas;
}

export async function getRecetaPorUsuario({ usuario, sort }: { usuario: string, sort: RecetaSort }) {
  const { data } = await axios.get<RecetaPorNombreResponse>('/recetasPorUsuario', { params: { usuario, sort } });
  return data.recetas;
}

export async function getComentarios(recetaId: number | string) {
  const { data } = await axios.get<ComentariosResponse>(`/comentarios/${recetaId}`);
  return data.comentarios;
}

export async function crearComentario(recetaId: string | number, comentario: Pick<Comentario, "descripcion">) {
  const { data } = await axios.post<string>(`/cargarComentario/${recetaId}`, comentario);
  return data;
}
