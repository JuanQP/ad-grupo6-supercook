declare namespace NodeJS {
  export interface ProcessEnv {
    BACKEND_HOST: string;
  }
}

type Recipe = {
  id: number;
  nombre: string;
  ratio: number;
  porciones: number;
  porcionesOriginales: number;
  fotosPortada: {
    imagen: string;
  }[];
  usuario: {
    nombre: string;
  }
}

type LocalRecipe = Omit<Recipe, "fotosPortada" | "usuario"> & {
  usuarioNombre: string;
  imagenUrl: string;
}

type LocalRecipesDB = {
  recipes: LocalRecipe[];
}

type Categoria = {
  id: number;
  descripcion: string;
  imagen: string;
}

type Etiqueta = {
  id: number;
  descripcion: string;
}

type Receta = {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  porciones: number;
  tiempo_coccion: number;
  verificada: boolean;
}

type Usuario = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  recuperandoPassword: boolean;
  alias: string;
  registrado: boolean;
  fechaNacimiento: string;
  sobre_mi: string;
  codigo: string | null;
  img_perfil: string | null;
}

type RecetaImagen = {
  imagen: string;
}

type Ingrediente = {
  id: number;
  cantidad: number;
  unidad: string;
  descripcion: string;
}

type Paso = {
  numero_paso: number;
  descripcion_paso: string;
  pasosMultimedia: PasoMultimedia[];
}

type Comentario = {
  id: number;
  descripcion: string;
}

type PasoMultimedia = {
  pasoId: number;
  tipo_multimedia: "video" | "imagen";
  img_multimedia: string;
}

type RecetaFavorita = Receta & {
  esFavorita: boolean;
  usuario: Pick<Usuario, "nombre">;
  fotosPortada: RecetaImagen[];
}

type WithId = {
  id: number;
}

type RecetaAction = "Crear" | "Editar" | "Reemplazar"
