import React from 'react';
import { View } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceta } from '../../hooks/receta-context';

export const RECETAS_ACCIONES = {
  Crear: 1,
  Reemplazar: 2,
  Editar: 3,
};

function RecetaExistenteScreen({ navigation, route }) {

  const { value: recetaExistente, onChange: setRecetaContext } = useReceta();

  function handleReemplazarPress() {
    const { nombre } = route.params;
    setRecetaContext({
      ...recetaExistente,
      action: RECETAS_ACCIONES.Reemplazar,
    });
    navigation.navigate('CrearReceta2', { nombre });
  }

  function handleEditarPress() {
    const { nombre } = route.params;
    setRecetaContext({
      ...recetaExistente,
      action: RECETAS_ACCIONES.Editar,
    });
    navigation.navigate('CrearReceta2', { nombre });
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Title>SuperCook</Title>
        <Text style={{paddingHorizontal: 40, textAlign: 'center'}}>
          Ya tenés una receta con el mismo nombre. ¿Cómo querés seguir?
        </Text>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <Button
          mode="contained"
          onPress={handleReemplazarPress}
        >
          Reemplazar anterior
        </Button>
        <Button
          style={{marginTop: 10}}
          mode="contained"
          color="#34A853"
          onPress={handleEditarPress}
        >
          Editar existente
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default RecetaExistenteScreen;
