import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import BusquedaScreen from './Busqueda/BusquedaScreen';
import FavoritosScreen from './Favoritos/FavoritosScreen';
import HomeNavigator from './Home/HomeNavigator';
import NuevaRecetaScreen from './Nueva/NuevaRecetaScreen';
import PerfilScreen from './Perfil/PerfilScreen';

const Tab = createMaterialBottomTabNavigator();

function AppNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='HomeNavigator'
      activeColor={colors.primary}
      inactiveColor={colors.disabled}
      barStyle={{ backgroundColor: colors.surface }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{tabBarIcon: 'home', tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Búsqueda"
        component={BusquedaScreen}
        options={{tabBarIcon: 'magnify', tabBarLabel: 'Buscar'}}
      />
      <Tab.Screen
        name="Nueva"
        component={NuevaRecetaScreen}
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

export default AppNavigator;
