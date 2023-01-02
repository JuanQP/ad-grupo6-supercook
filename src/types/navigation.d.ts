
export type RootStackParamList = {
  Login: undefined;
  Recupero1: undefined;
  Recupero2: { email: string };
  Recupero3: { email: string };
  Recupero4: { email: string };
  Registracion1: undefined;
  Registracion2: {
    email: string;
    alias: string
  };
  Registracion3: undefined;
  Registracion4: undefined;
  AppNavigator: NavigatorScreenParams<AppNavigatorStackParamList>;
};

export type AppNavigatorStackParamList = {
  HomeNavigator: NavigatorScreenParams<TabsParamList>;
  Paso: { recetaId: number };
};

export type TabsParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  BúsquedaStack: undefined;
  Nueva: NavigatorScreenParams<NuevaStackParamList>;
  Favoritos: undefined;
  PerfilStack: NavigatorScreenParams<PerfilStackParamList>;
};

export type NuevaStackParamList = {
  CrearReceta1: undefined;
  CrearReceta2: { nombre: string };
  CrearReceta3: undefined;
  ExisteReceta: { nombre: string };
  CrearRecetaAgregarPaso: { index?: number };
  NuevaRecetaReview: undefined;
  PasosReview: undefined;
  RecetaEnviada: undefined;
}

export type PerfilStackParamList = {
  Perfil: undefined;
  RecetasGuardadas: undefined;
  Receta: {
    recetaId: number;
    ratio: number;
  };
};

export type HomeStackParamList = {
  Home: undefined;
  Recomendados: undefined;
  UltimasRecetas: undefined;
  IngredienteDeLaSemana: undefined;
  Receta: { recetaId: number, ratio?: number };
};

export type BusquedaStackParamList = {
  BusquedaNombre: undefined;
  BusquedaTipo: undefined;
  BusquedaIngrediente: undefined;
  BusquedaUsuario: undefined;
}
