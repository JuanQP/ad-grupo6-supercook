import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RecetaProvider } from '../../hooks/receta-context';
import { NuevaStackParamList } from '../../types/navigation';
import NuevaRecetaAgregarPasoScreen from './NuevaRecetaAgregarPaso';
import NuevaRecetaReviewScreen from './NuevaRecetaReviewScreen';
import NuevaRecetaScreen1 from './NuevaRecetaScreen1';
import NuevaRecetaScreen2 from './NuevaRecetaScreen2';
import NuevaRecetaScreen3 from './NuevaRecetaScreen3';
import PasosReviewScreen from './PasosReviewScreen';
import RecetaEnviadaScreen from './RecetaEnviadaScreen';
import RecetaExistenteScreen from './RecetaExistenteScreen';

const Stack = createNativeStackNavigator<NuevaStackParamList>();

export default function NuevaRecetaStack() {
  return (
    <RecetaProvider>
      <Stack.Navigator initialRouteName='CrearReceta1'>
        <Stack.Screen
          name="CrearReceta1"
          component={NuevaRecetaScreen1}
          options={{ title: 'Nueva Receta 1', headerShown: false }}
        />
        <Stack.Screen
          name="CrearReceta2"
          component={NuevaRecetaScreen2}
          options={{ title: 'Nueva Receta 2', headerShown: false }}
        />
        <Stack.Screen
          name="CrearReceta3"
          component={NuevaRecetaScreen3}
          options={{ title: 'Nueva Receta 3', headerShown: false }}
        />
        <Stack.Screen
          name="ExisteReceta"
          component={RecetaExistenteScreen}
          options={{ title: 'Receta Existente', headerShown: false }}
        />
        <Stack.Screen
          name="CrearRecetaAgregarPaso"
          component={NuevaRecetaAgregarPasoScreen}
          options={{ title: 'Nuevo Paso', headerShown: false }}
        />
        <Stack.Screen
          name="NuevaRecetaReview"
          component={NuevaRecetaReviewScreen}
          options={{ title: 'Review', headerShown: false }}
        />
        <Stack.Screen
          name="PasosReview"
          component={PasosReviewScreen}
          options={{ title: 'Pasos Review', headerShown: false }}
        />
        <Stack.Screen
          name="RecetaEnviada"
          component={RecetaEnviadaScreen}
          options={{ title: 'Receta Enviada', headerShown: false }}
        />
      </Stack.Navigator>
    </RecetaProvider>
  )
}
