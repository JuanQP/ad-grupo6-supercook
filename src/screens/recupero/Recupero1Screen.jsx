import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { backgroundColor } from '../../styles/colors';

export default function Recupero1Screen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  function onEmailTextInputChange(newText) {
    setEmail(newText);
    const emailValido = /^(\w|\d)(\w|\d|\.)+@(\w|\d)+(\.(\w|\d)+)+$/.test(newText);
    setIsValidEmail(emailValido);
  }

  function onObtenerCodigoButtonClick() {
    navigation.navigate('Recupero2', { email });
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Se enviará el código de verificación al siguiente e-mail
      </Paragraph>
      <TextInput
        mode="outlined"
        style={styles.textInput}
        label="E-mail"
        keyboardType="email-address"
        onChangeText={onEmailTextInputChange}
        defaultValue={email}
        textContentType="emailAddress"
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={onObtenerCodigoButtonClick}
        disabled={!isValidEmail}
      >
        Obtener código
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
