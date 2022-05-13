import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

export default function Registracion3Screen({ navigation }) {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimientoValido, setFechaNacimientoValido] = useState(false);
  const [telefonoValido, setTelefonoValido] = useState(false);

  function onFechaNacimientoChange(newFecha) {
    setFechaNacimiento(newFecha);
    setFechaNacimientoValido(/\d{2}\/\d{2}\/\d{4}/.test(newFecha));
  }

  function onTelefonoChange(newTelefono) {
    setTelefono(newTelefono);
    setTelefonoValido(/\d{10}/.test(newTelefono));
  }

  function onSiguienteButtonClick() {
    navigation.navigate("Registracion4");
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        style={styles.textInput}
        label="Nombre/s"
        onChangeText={newText => setNombre(newText)}
        defaultValue={nombre}
        textContentType='name'
      />
      <TextInput
        mode='outlined'
        style={styles.textInput}
        label="Apellido/s"
        onChangeText={newText => setApellido(newText)}
        defaultValue={apellido}
        textContentType='familyName'
      />
      <TextInput
        mode='outlined'
        style={styles.textInput}
        keyboardType="number-pad"
        label="Fecha de Nacimiento"
        maxLength={10}
        value={fechaNacimiento}
        onChangeText={onFechaNacimientoChange}
        placeholder="DD/MM/YYYY"
        render={props =>
          <MaskInput
            {...props}
            onChangeText={(masked, unmasked) => props.onChangeText(masked)}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        }
      />
      <TextInput
        mode='outlined'
        style={styles.textInput}
        keyboardType="phone-pad"
        label="Teléfono"
        onChangeText={onTelefonoChange}
        defaultValue={telefono}
        textContentType='telephoneNumber'
        maxLength={10}
      />
      <Button
        mode='contained'
        style={styles.button}
        onPress={onSiguienteButtonClick}
        disabled={nombre === '' || apellido === '' || !fechaNacimientoValido || !telefonoValido}
      >
        Siguiente
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
