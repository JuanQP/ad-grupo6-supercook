import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Paragraph, TextInput } from 'react-native-paper';

export default function Recupero3Screen({ navigation, route }) {

  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [confirmationTouched, setConfirmationTouched] = useState(false);

  function onCambiarPasswordClick() {
    navigation.navigate("Recupero4", {
      email: route.params.email,
    });
  }

  function onConfirmationPasswordChange(newText) {
    if(!confirmationTouched) {
      setConfirmationTouched(true);
    }
    setConfirmationPassword(newText)

  }

  return (
    <View style={styles.container}>
      <Paragraph>Ingrese la nueva contraseña</Paragraph>
      <TextInput
        style={styles.textInput}
        mode='outlined'
        label="Nueva contraseña"
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
        secureTextEntry
        textContentType='newPassword'
      />
      <View>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Repetir contraseña"
          onChangeText={onConfirmationPasswordChange}
          defaultValue={confirmationPassword}
          secureTextEntry
          textContentType='password'
        />
        <HelperText
          type='error'
          visible={confirmationTouched && password !== confirmationPassword}
        >
          Las contraseñas no coinciden
        </HelperText>
      </View>

      <Button
        style={styles.button}
        mode="contained"
        disabled={password === '' || password !== confirmationPassword}
        onPress={onCambiarPasswordClick}
      >
        Enviar
      </Button>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
