import React from 'react';
import { View } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceta } from '../../hooks/receta-context';
import { EMPTY_RECETA } from './NuevaRecetaScreen1';
import { RECETAS_ACCIONES } from './RecetaExistenteScreen';

function RecetaEnviadaScreen({ navigation }) {

  const {value: receta, onChange: setRecetaContext} = useReceta();
  const accionTexto = receta.action === RECETAS_ACCIONES.Editar ? 'actualizada' : 'reemplazada';

  function handleHomePress() {
    setRecetaContext({...EMPTY_RECETA});
    navigation.popToTop();
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Title>SuperCook</Title>
        {receta.action === RECETAS_ACCIONES.Crear && (
          <Text style={{paddingHorizontal: 40, textAlign: 'center'}}>
            Tu receta va a ser validada. Cuando finalicemos te avisamos!!!
          </Text>
        )}
        {receta.action !== RECETAS_ACCIONES.Crear && (
          <Text style={{paddingHorizontal: 40, textAlign: 'center'}}>
            Tu receta fue {accionTexto} correctamente 😄
          </Text>
        )}
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end', marginBottom: 10}}>
        <Button
          mode="contained"
          onPress={handleHomePress}
        >
          Volver al home
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default RecetaEnviadaScreen;
