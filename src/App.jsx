import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import Recupero1Screen from './screens/recupero/Recupero1Screen';
import Recupero2Screen from './screens/recupero/Recupero2Screen';
import Recupero3Screen from './screens/recupero/Recupero3Screen';
import Recupero4Screen from './screens/recupero/Recupero4Screen';
import Registracion1Screen from './screens/registracion/Registracion1Screen';
import Registracion2Screen from './screens/registracion/Registracion2Screen';
import Registracion3Screen from './screens/registracion/Registracion3Screen';
import Registracion4Screen from './screens/registracion/Registracion4Screen';
import PerfilScreen from './screens/Perfil/PerfilScreen';
import RecomendadosScreen from './screens/Home/RecomendadosScreen';
import UltimasRecetasScreen from './screens/Home/UltimasRecetasScreen';
import IngredienteDeLaSemanaScreen from './screens/Home/IngredienteDeLaSemanaScreen';
import RecetaScreen from './screens/Receta/RecetaScreen';
import PasoScreen from './screens/Receta/PasoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'SuperCook 🍕', headerShown: false }}
      />
      <Stack.Screen
        name="Paso"
        component={PasoScreen}
        options={{ title: 'Pasos', headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
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
      <Stack.Screen
        name="Recupero1"
        component={Recupero1Screen}
        options={{ title: 'E-mail de recuperación', headerShown: false }}
      />
      <Stack.Screen
        name="Recupero2"
        component={Recupero2Screen}
        options={{ title: 'Código de recuperación', headerShown: false }}
      />
      <Stack.Screen
        name="Recupero3"
        component={Recupero3Screen}
        options={{ title: 'Nueva password', headerShown: false }}
      />
      <Stack.Screen
        name="Recupero4"
        component={Recupero4Screen}
        options={{ title: '¡Password cambiada!', headerShown: false }}
      />
      <Stack.Screen
        name="Registracion1"
        component={Registracion1Screen}
        options={{ title: 'Nuevo usuario', headerShown: false }}
      />
      <Stack.Screen
        name="Registracion2"
        component={Registracion2Screen}
        options={{ title: 'Usuario creado', headerShown: false }}
      />
      <Stack.Screen
        name="Registracion3"
        component={Registracion3Screen}
        options={{ title: 'Completar datos', headerShown: false }}
      />
      <Stack.Screen
        name="Registracion4"
        component={Registracion4Screen}
        options={{ title: 'Generar contraseña', headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Perfil', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
