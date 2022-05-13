import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Checkbox, Snackbar, Text, TextInput } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);

  function onRecordarmeCheckboxClick() {
    setRecordarme(!recordarme);
  }

  function onRegistrateButtonClick() {
    navigation.navigate("Registracion1");
  }

  function onLoginButtonClick() {
    if(user === "nuevo") {
      navigation.navigate("Registracion3", { user });
      return;
    }
    navigation.navigate("Home", { user });
  }

  function onRecuperoButtonClick() {
    navigation.navigate("Recupero1");
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <TextInput
          mode='outlined'
          label="Usuario"
          onChangeText={newText => setUser(newText)}
          defaultValue={user}
          textContentType='nickname'
        />
        <TextInput
          mode='outlined'
          label="Contraseña"
          onChangeText={newText => setPassword(newText)}
          defaultValue={password}
          style={{marginTop: 20}}
          secureTextEntry
          textContentType='password'
        />
        {/* Checkbox */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={recordarme ? 'checked' : 'unchecked'}
            onPress={onRecordarmeCheckboxClick}
          />
          <Text style={{fontWeight: 'bold'}}>Recordarme</Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <Button
            mode='contained'
            onPress={onLoginButtonClick}
            style={{marginTop: 20}}
          >
            Login
          </Button>
          <Button
            mode="text"
            onPress={onRecuperoButtonClick}
            style={{alignSelf: 'flex-end', marginTop: 20}}
          >
            Olvidaste tu contraseña?
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'column', justifyContent: 'center', flex: 1}}>
        <Button
          mode="text"
          onPress={onRegistrateButtonClick}
        >
          No tenés una cuenta? Registrate
        </Button>
      </View>
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
});
