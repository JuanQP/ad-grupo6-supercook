import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { surface } from '../../styles/colors';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, "Registracion2">

export default function Registracion2Screen({ navigation, route }: Props) {
  function onLoginClick() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Revisá tu correo,
        {' '}
        {route.params.alias}
        ! Se envió una contraseña provisoria.
        {' '}
        Tu experiencia SuperCook ya empezó
      </Paragraph>
      <Button
        style={styles.button}
        mode="contained"
        onPress={onLoginClick}
      >
        Acceder
      </Button>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    surface,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginTop: 20,
  },
});
