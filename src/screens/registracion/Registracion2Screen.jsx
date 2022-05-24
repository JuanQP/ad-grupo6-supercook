import React, { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { backgroundColor } from '../../styles/colors';

export default function Registracion2Screen({ navigation, route }) {
  function onLoginClick() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Revisá tu correo,
        {' '}
        {route.params.alias}
        ! Tu experiencia SuperCook ya empezó
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
    backgroundColor,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginTop: 20,
  },
});
