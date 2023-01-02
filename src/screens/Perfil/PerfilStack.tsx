import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PerfilStackParamList } from '../../types/navigation';
import RecetaScreen from '../Receta/RecetaScreen';
import PerfilScreen from './PerfilScreen';
import RecetasGuardadasScreen from './RecetasGuardadasScreen';

const Stack = createNativeStackNavigator<PerfilStackParamList>();

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
      <Stack.Screen
        name="Receta"
        component={RecetaScreen}
        options={{ title: 'Receta', headerShown: false }}
      />
    </Stack.Navigator>
  )
}
