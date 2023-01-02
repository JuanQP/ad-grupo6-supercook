import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BusquedaStackParamList } from '../../types/navigation';
import BusquedaIngredienteScreen from './BusquedaIngredienteScreen';
import BusquedaNombreScreen from './BusquedaNombreScreen';
import BusquedaTipoScreen from './BusquedaTipoScreen';
import BusquedaUsuarioScreen from './BusquedaUsuarioScreen';

const Stack = createNativeStackNavigator<BusquedaStackParamList>();

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
