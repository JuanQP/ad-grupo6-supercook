import React, { useState } from 'react';
import { View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { checkearReceta } from '../../api/recipes';
import { useReceta } from '../../hooks/receta-context';

function NuevaRecetaScreen1 ({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { onChange: setRecetaContext } = useReceta();

  async function handleSubmit() {
    if(nombre === '') return;
    setIsLoading(true);
    let data;
    try {
      data = await checkearReceta(nombre);
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
    if(data.existeReceta) {
      navigation.navigate('ExisteReceta', {nombre});
      return;
    }
    setRecetaContext({});
    navigation.navigate('CrearReceta2', {nombre});
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Title>SuperCook</Title>
        <Text style={{marginBottom: 20}}>
          Ingrese el nombre de la receta que desea cargar
        </Text>
        <TextInput
          style={{width: '100%'}}
          mode="outlined"
          label="Nombre de la receta"
          placeholder="Milanesa a la napolitana"
          value={nombre}
          onChangeText={setNombre}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <Button
          mode="contained"
          disabled={nombre === '' || isLoading}
          loading={isLoading}
          onPress={handleSubmit}
        >
          Siguiente (1/3)
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default NuevaRecetaScreen1;
