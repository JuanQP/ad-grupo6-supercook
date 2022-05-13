import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

export default function Registracion1Screen({ navigation }) {

  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isAliasDisponible, setIsAliasDisponible] = useState(true);
  const [isEmailDisponible, setIsEmailDisponible] = useState(true);
  const [esperandoValidacion, setEsperandoValidacion] = useState(false);
  const [emailNoDisponible, setEmailNoDisponible] = useState('');
  const [aliasNoDisponible, setAliasNoDisponible] = useState('');

  function onEmailTextInputChange(newText) {
    setEmail(newText);
    const emailValido = /^(\w|\d)(\w|\d|\.)*@(\w|\d)+(\.(\w|\d)+)+$/.test(newText);
    setIsValidEmail(emailValido);
  }

  function onAliasTextInputChange(newText) {
    setAlias(newText);
  }

  function onValidarButtonClick() {
    setEsperandoValidacion(true);
    setTimeout(() => {
      setEsperandoValidacion(false);
      const emailDisponible = email !== 'a@a.com';
      const aliasDisponible = alias !== 'a';
      setIsEmailDisponible(emailDisponible);
      setIsAliasDisponible(aliasDisponible);

      if(!emailDisponible) {
        setEmailNoDisponible(email);
      }
      if(!aliasDisponible) {
        setAliasNoDisponible(alias);
      }

      if(emailDisponible && aliasDisponible) {
        navigation.navigate("Registracion2", { email, alias });
      }
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        style={styles.textInput}
        label="E-mail"
        keyboardType='email-address'
        onChangeText={onEmailTextInputChange}
        defaultValue={email}
        error={!isEmailDisponible}
        textContentType='emailAddress'
      />
      <HelperText
        type='error'
        visible={!isEmailDisponible}
      >
        El e-mail {emailNoDisponible} no está disponible
      </HelperText>
      <TextInput
        mode='outlined'
        style={styles.textInput}
        label="Alias"
        onChangeText={onAliasTextInputChange}
        defaultValue={alias}
        textContentType='nickname'
      />
      <HelperText
        type='error'
        visible={!isAliasDisponible}
      >
        El alias {aliasNoDisponible} no está disponible
      </HelperText>
      <Button
        mode='contained'
        style={styles.button}
        onPress={onValidarButtonClick}
        disabled={!isValidEmail || alias === '' || esperandoValidacion}
        loading={esperandoValidacion}
      >
        Validar
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
