import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilScreen from './PerfilScreen';
import RecetasGuardadasScreen from './RecetasGuardadasScreen';
//import UltimasRecetasScreen from './UltimasRecetasScreen';
//import IngredienteDeLaSemanaScreen from './IngredienteDeLaSemanaScreen';
import RecetaScreen from '../Receta/RecetaScreen';

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator initialRouteName='Perfil'>
      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Mi Perfil', headerShown: false }}
      />
      <Stack.Screen
        name="RecetasGuardadas"
        component={RecetasGuardadasScreen}
        options={{ title: 'Recetas Guardadas', headerShown: false }}
      />
      {/* <Stack.Screen
        name="UltimasRecetas"
        component={UltimasRecetasScreen}
        options={{ title: 'Últimas recetas', headerShown: false }}
      />
      <Stack.Screen
        name="IngredienteDeLaSemana"
        component={IngredienteDeLaSemanaScreen}
        options={{ title: 'Ingrediente de la Semana', headerShown: false }}
      /> */}
      <Stack.Screen
        name="Receta"
        component={RecetaScreen}
        options={{ title: 'Receta', headerShown: false }}
      />
    </Stack.Navigator>
  )
}
