import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './Home/HomeTabs';
import PasoScreen from './Receta/PasoScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='HomeNavigator'>
      <Stack.Screen
        name="HomeNavigator"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      {/* Pantallas sin Bottom Navigation van acá */}
      <Stack.Screen
        name="Paso"
        component={PasoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
