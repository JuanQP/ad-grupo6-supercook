import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';

export default function Recupero4Screen({ navigation, route }) {

  function onLoginClick() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Paragraph>¡La contraseña para el e-mail {route.params.email} fue cambiada correctamente!</Paragraph>
      <Button
        style={styles.button}
        mode='contained'
        onPress={onLoginClick}
      >
        Acceder
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
});
