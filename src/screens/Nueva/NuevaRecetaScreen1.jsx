import React, { useState } from 'react';
import { Alert, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Caption, Text, TextInput, Title } from 'react-native-paper';
import { checkearReceta } from '../../api/recipes';
import { useReceta } from '../../hooks/receta-context';
import { useFocusEffect } from '@react-navigation/native';
import { deleteRecetaLocal, getRecetaLocal } from '../../utils/utils';

const EMPTY_RECETA = {
  categoria: null,
  descripcion: '',
  etiquetas: [],
  fotosPortada: [],
  ingredientes: [],
  nombre: '',
  pasosReceta: [],
  porciones: 1,
  tiempo: '',
};

function NuevaRecetaScreen1 ({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hayRecetaGuardada, setHayRecetaGuardada] = useState(false);
  const { onChange: setRecetaContext } = useReceta();

  useFocusEffect(
    React.useCallback(() => {
      const checkearRecetaLocal = async () => {
        const recetaLocal = await getRecetaLocal();
        setHayRecetaGuardada(!!recetaLocal);
      }
      checkearRecetaLocal();
    }, [])
  );

  async function handleSubmit() {
    if(nombre === '') return;
    setIsLoading(true);
    let existeReceta;
    try {
      existeReceta = await checkearReceta(nombre);
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
    const nombreDeReceta = nombre;
    setNombre('');
    if(existeReceta) {
      navigation.navigate('ExisteReceta', {nombre: nombreDeReceta});
      return;
    }
    setRecetaContext({...EMPTY_RECETA});
    navigation.navigate('CrearReceta2', {nombre: nombreDeReceta});
  }

  async function handleRestaurarReceta() {
    const recetaRestaurada = await getRecetaLocal();
    setRecetaContext(recetaRestaurada);
    navigation.navigate('CrearReceta2', {nombre: recetaRestaurada.nombre});
  }

  async function handleEliminarReceta() {
    await deleteRecetaLocal();
    setHayRecetaGuardada(false);
    Alert.alert('Receta borrada', 'La receta almacenada localmente fue borrada');
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
        {hayRecetaGuardada && (
          <Caption style={{marginBottom: 20}}>
            Tenés una receta guardada localmente. Podés recuperarla con los botones que están abajo 👇
          </Caption>
        )}
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
        {hayRecetaGuardada && (
          <>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                style={{flex: 1}}
                mode="outlined"
                icon="restore"
                disabled={isLoading}
                onPress={handleRestaurarReceta}
              >
                Recuperar
              </Button>
              <Button
                style={{flex: 1}}
                mode="outlined"
                icon="trash-can-outline"
                disabled={isLoading}
                onPress={handleEliminarReceta}
              >
                Borrar
              </Button>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export default NuevaRecetaScreen1;
