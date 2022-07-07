import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import Constants from 'expo-constants';
import axios from 'axios';
import App from './src/App';
import { backgroundColor, primary, surface } from './src/styles/colors';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  /ViewPropTypes/,
  /AxiosError/,
]);
const { BACKEND_HOST } = Constants.manifest.extra;
axios.defaults.baseURL = `http://${BACKEND_HOST}/api`;

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary,
    surface,
    background: backgroundColor,
  },
};

export default function Main() {

  const [loaded] = useFonts({
    WendyOne: require('./assets/fonts/WendyOne-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
