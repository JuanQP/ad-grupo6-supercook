import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCALDB_KEY = '@db';

export function formatNumber(numero) {
  return new Intl.NumberFormat('en', {maximumFractionDigits: 2}).format(numero);
}

export async function getLocalDb() {
  const serializedLocalDB = await AsyncStorage.getItem(LOCALDB_KEY);
  return serializedLocalDB != null ? JSON.parse(serializedLocalDB) : {};
}

export async function getLocalRecipes() {
  const { recipes } = await getLocalDb();
  return recipes ?? [];
}

export async function saveLocalRecipes(recipes) {
  const localDB = await getLocalDb();
  localDB.recipes = recipes;
  const serializedLocalDB = JSON.stringify(localDB);
  await AsyncStorage.setItem(LOCALDB_KEY, serializedLocalDB);
}

export async function addLocalRecipe(recipe, ratio) {
  const recipes = await getLocalRecipes();
  if(recipes.length >= 5) {
    throw new Error('No se puede agregar la receta: Ya tenés 5 recetas guardadas');
  }
  const { id, nombre } = recipe;
  const newRecipe = {};
  newRecipe.id = id;
  newRecipe.nombre = nombre;
  newRecipe.usuarioNombre = recipe.usuario.nombre;
  newRecipe.imagenUrl = recipe.fotosPortada[0].imagen;
  newRecipe.ratio = ratio;
  newRecipe.porciones = ratio * recipe.porciones;
  newRecipe.porcionesOriginales = recipe.porciones;

  await saveLocalRecipes([
    ...recipes,
    newRecipe,
  ]);
}

export async function deleteLocalRecipe(recipeId) {

}
