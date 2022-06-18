import React from 'react';
import PerfilScreen from '../Perfil/PerfilScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeStack from './HomeStack';
import BusquedaScreen from '../Busqueda/BusquedaScreen';
import FavoritosScreen from '../Favoritos/FavoritosScreen';
import { useTheme } from 'react-native-paper';
import NuevaRecetaStack from '../Nueva/NuevaRecetaStack';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
      activeColor={colors.primary}
      inactiveColor={colors.disabled}
      barStyle={{backgroundColor: colors.surface}}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{tabBarIcon: 'home', tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Búsqueda"
        component={BusquedaScreen}
        options={{tabBarIcon: 'magnify', tabBarLabel: 'Buscar'}}
      />
      <Tab.Screen
        name="Nueva"
        component={NuevaRecetaStack}
        options={{tabBarIcon: 'plus-circle-outline', tabBarLabel: 'Nueva'}}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{tabBarIcon: 'star-outline', tabBarLabel: 'Favs'}}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{tabBarIcon: 'account-circle-outline', tabBarLabel: 'Mi Perfil'}}
      />
    </Tab.Navigator>
  );
}
