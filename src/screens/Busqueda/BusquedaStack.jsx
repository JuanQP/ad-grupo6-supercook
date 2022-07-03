import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusquedaNombreScreen from './BusquedaNombreScreen';
import BusquedaTipoScreen from './BusquedaTipoScreen';
import BusquedaIngredienteScreen from './BusquedaIngredienteScreen';
import BusquedaUsuarioScreen from './BusquedaUsuarioScreen';

const Stack = createNativeStackNavigator();

export default function BusquedaStack() {
  return (
    <Stack.Navigator initialRouteName='BusquedaNombre'>
      <Stack.Screen
        name="BusquedaNombre"
        component={BusquedaNombreScreen}
        options={{ title: 'Búsqueda Nombre', headerShown: false }}
      />
      <Stack.Screen
        name="BusquedaTipo"
        component={BusquedaTipoScreen}
        options={{ title: 'Búsqueda Tipo', headerShown: false }}
      />
      <Stack.Screen
        name="BusquedaIngrediente"
        component={BusquedaIngredienteScreen}
        options={{ title: 'Búsqueda Ingrediente', headerShown: false }}
      />
      <Stack.Screen
        name="BusquedaUsuario"
        component={BusquedaUsuarioScreen}
        options={{ title: 'Búsqueda Usuario', headerShown: false }}
      />
    </Stack.Navigator>
  )
}
