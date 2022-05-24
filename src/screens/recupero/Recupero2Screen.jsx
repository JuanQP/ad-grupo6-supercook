import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { backgroundColor } from '../../styles/colors';

export default function Recupero2Screen({ navigation, route }) {
  const [codigo, setCodigo] = useState('');
  const [ingresoCodigo, setIngresoCodigo] = useState(false);

  function onCodigoTextInputChange(newText) {
    setCodigo(newText);
    setIngresoCodigo(newText.length === 6);
  }

  function onEnviarButtonClick() {
    if (codigo === '123456') {
      navigation.navigate('Recupero3', { email: route.params.email });
    } else {
      Alert.alert('¡Ups!', 'Código incorrecto');
    }
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Ingrese el código de 6 dígitos enviado a
        {' '}
        {route.params.email}
      </Paragraph>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Código"
        keyboardType="number-pad"
        maxLength={6}
        onChangeText={onCodigoTextInputChange}
        defaultValue={codigo}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={onEnviarButtonClick}
        disabled={!ingresoCodigo}
      >
        Enviar
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
  textInput: {
    marginTop: 20,
  },
});
