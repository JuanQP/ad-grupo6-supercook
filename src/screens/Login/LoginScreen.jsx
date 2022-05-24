import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Checkbox,
  Text,
  TextInput,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { backgroundColor } from '../../styles/colors';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);

  function onRecordarmeCheckboxClick() {
    setRecordarme(!recordarme);
  }

  function onRegistrateButtonClick() {
    navigation.navigate('Registracion1');
  }

  function onLoginButtonClick() {
    if (user === 'nuevo') {
      navigation.navigate('Registracion3', { user });
      return;
    }
    navigation.navigate('Home', { user });
  }

  function onRecuperoButtonClick() {
    navigation.navigate('Recupero1');
  }

  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        <TextInput
          mode="outlined"
          label="Usuario"
          onChangeText={(newText) => setUser(newText)}
          defaultValue={user}
          textContentType="nickname"
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
          style={styles.textInput}
          secureTextEntry
          textContentType="password"
        />
        {/* Checkbox */}
        <View style={styles.checkbox}>
          <Checkbox
            status={recordarme ? 'checked' : 'unchecked'}
            onPress={onRecordarmeCheckboxClick}
          />
          <Text style={{ fontWeight: 'bold' }}>Recordarme</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <Button
            mode="contained"
            onPress={onLoginButtonClick}
            style={{ marginTop: 20 }}
          >
            Login
          </Button>
          <Button
            mode="text"
            onPress={onRecuperoButtonClick}
            style={{ alignSelf: 'flex-end', marginTop: 20 }}
          >
            Olvidaste tu contraseña?
          </Button>
        </View>
      </View>
      <View style={styles.registerView}>
        <Button
          mode="text"
          onPress={onRegistrateButtonClick}
        >
          No tenés una cuenta? Registrate
        </Button>
      </View>
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
  formView: {
    flex: 3,
    justifyContent: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    marginVertical: 10,
  },
});
