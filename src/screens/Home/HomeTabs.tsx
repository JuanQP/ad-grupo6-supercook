import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { TabsParamList } from '../../types/navigation';
import BusquedaStack from '../Busqueda/BusquedaStack';
import FavoritosScreen from '../Favoritos/FavoritosScreen';
import NuevaRecetaStack from '../Nueva/NuevaRecetaStack';
import PerfilStack from '../Perfil/PerfilStack';
import HomeStack from './HomeStack';

const Tab = createMaterialBottomTabNavigator<TabsParamList>();

export default function HomeTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
      activeColor={colors.primary}
      inactiveColor={colors.onSurfaceDisabled}
      barStyle={{backgroundColor: colors.surface}}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{tabBarIcon: 'home', tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="BúsquedaStack"
        component={BusquedaStack}
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
        name="PerfilStack"
        component={PerfilStack}
        options={{tabBarIcon: 'account-circle-outline', tabBarLabel: 'Mi Perfil'}}
      />
    </Tab.Navigator>
  );
}
