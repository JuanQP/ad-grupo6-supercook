import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCALDB_KEY = '@db';
const LOCAL_RECIPE_KEY = '@recipe';

export function formatNumber(numero: string | number) {
  return new Intl.NumberFormat('en', {maximumFractionDigits: 2}).format(Number(numero));
}

export async function getLocalDb(): Promise<LocalRecipesDB> {
  const serializedLocalDB = await AsyncStorage.getItem(LOCALDB_KEY);
  return serializedLocalDB != null ? JSON.parse(serializedLocalDB) : { recipes: [] };
}

export async function getLocalRecipes() {
  const { recipes } = await getLocalDb();
  return recipes;
}

export async function saveLocalRecipes(recipes: LocalRecipe[]) {
  const localDB = await getLocalDb();
  localDB.recipes = recipes;
  const serializedLocalDB = JSON.stringify(localDB);
  await AsyncStorage.setItem(LOCALDB_KEY, serializedLocalDB);
}

export async function addLocalRecipe(recipe: Recipe, ratio: number) {
  const recipes = await getLocalRecipes();
  if(recipes.length >= 5) {
    throw new Error('No se puede agregar la receta: Ya tenés 5 recetas guardadas');
  }
  const newRecipe: LocalRecipe = {
    id: recipe.id,
    nombre: recipe.nombre,
    usuarioNombre: recipe.usuario.nombre,
    imagenUrl: recipe.fotosPortada[0].imagen,
    ratio: ratio,
    porciones: ratio * recipe.porciones,
    porcionesOriginales: recipe.porciones,
  };

  await saveLocalRecipes([
    ...recipes,
    newRecipe,
  ]);
}

export async function deleteLocalRecipe(recipeId: number) {

}

export async function getRecetaLocal(): Promise<LocalRecipe | null> {
  const serializedRecipe = await AsyncStorage.getItem(LOCAL_RECIPE_KEY);
  return serializedRecipe ? JSON.parse(serializedRecipe) : null;
}

export async function saveRecetaLocal(recipe: LocalRecipe) {
  const serializedRecipe = JSON.stringify(recipe);
  await AsyncStorage.setItem(LOCAL_RECIPE_KEY, serializedRecipe);
}

export async function deleteRecetaLocal() {
  await AsyncStorage.removeItem(LOCAL_RECIPE_KEY);
}
