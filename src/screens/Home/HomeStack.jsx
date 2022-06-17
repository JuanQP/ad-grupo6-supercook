import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import RecomendadosScreen from './RecomendadosScreen';
import UltimasRecetasScreen from './UltimasRecetasScreen';
import IngredienteDeLaSemanaScreen from './IngredienteDeLaSemanaScreen';
import RecetaScreen from '../Receta/RecetaScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Recomendados', headerShown: false }}
      />
      <Stack.Screen
        name="Recomendados"
        component={RecomendadosScreen}
        options={{ title: 'Recomendados', headerShown: false }}
      />
      <Stack.Screen
        name="UltimasRecetas"
        component={UltimasRecetasScreen}
        options={{ title: 'Últimas recetas', headerShown: false }}
      />
      <Stack.Screen
        name="IngredienteDeLaSemana"
        component={IngredienteDeLaSemanaScreen}
        options={{ title: 'Ingrediente de la Semana', headerShown: false }}
      />
      <Stack.Screen
        name="Receta"
        component={RecetaScreen}
        options={{ title: 'Receta', headerShown: false }}
      />
    </Stack.Navigator>
  )
}
