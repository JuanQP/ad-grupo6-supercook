import React from 'react';
import { View } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceta } from '../../hooks/receta-context';

function RecetaExistenteScreen({ navigation, route }) {

  const { onChange: setRecetaContext } = useReceta();

  function handleReemplazarPress() {
    const { nombre } = route.params;
    setRecetaContext({});
    navigation.navigate('CrearReceta2', { nombre });
  }

  function handleEditarPress() {
    const { nombre } = route.params;
    // Acá debería ir alguna lógica que recupere la receta y setee correctamente el contexto
    setRecetaContext({});
    navigation.navigate('CrearReceta2', { nombre, editar: true });
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
