import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import PerfilScreen from '../Perfil/PerfilScreen';
import RecomendadosScreen from '../Home/RecomendadosScreen';
import UltimasRecetasScreen from '../Home/UltimasRecetasScreen';
import IngredienteDeLaSemanaScreen from '../Home/IngredienteDeLaSemanaScreen';
import RecetaScreen from '../Receta/RecetaScreen';
import PasoScreen from '../Receta/PasoScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="Paso"
        component={PasoScreen}
        options={{ title: 'Pasos', headerShown: false }}
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
  );
}
