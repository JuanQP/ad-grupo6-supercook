import React, { useState } from 'react';
import { View } from "react-native";
import { Button, Subheading, TextInput, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceta } from '../../hooks/receta-context';
import CargaImagen from '../../components/CargaImagen';

function NuevaRecetaAgregarPasoScreen({ navigation, route }) {
  const index = route?.params?.index;
  const { value: receta, onChange: setReceta } = useReceta();
  const [descripcion_paso, setDescripcion_paso] = useState(Number.isInteger(index) ? receta.pasosReceta[index].descripcion_paso : '');
  const [numero_paso] = useState(Number.isInteger(index) ? receta.pasosReceta[index].numero_paso : receta.pasosReceta.length+1);
  const [pasosMultimedia, setPasosMultimedia] = useState(Number.isInteger(index) ? receta.pasosReceta[index].pasosMultimedia : []);

  function handleCancelar() {
    navigation.goBack();
  }

  function handleMultimediaChange(pasosMultimedia) {
    setPasosMultimedia(pasosMultimedia.map(p => ({img_multimedia: p})));
  }

  function handleGuardar() {
    const creandoPaso = index === undefined;
    const nuevoPaso = {
      numero_paso,
      descripcion_paso,
      pasosMultimedia,
    };
    const nuevosPasos = [
      ...receta.pasosReceta,
    ];
    if(creandoPaso) {
      nuevosPasos.push(nuevoPaso);
    }
    else {
      nuevosPasos[index] = nuevoPaso;
    }
    setReceta({
      ...receta,
      pasosReceta: nuevosPasos,
    });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1}}>
        <Title style={{marginTop:15}}>Nuevo paso</Title>
        <Subheading>Paso {numero_paso}</Subheading>
        <TextInput
          label="Descripción del paso"
          mode="outlined"
          value={descripcion_paso}
          multiline
          numberOfLines={2}
          onChangeText={setDescripcion_paso}
        />
        <View style={{marginTop: 20}}>
          <Subheading>Agregar imágenes/videos deseados</Subheading>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <CargaImagen
              mediaType='All'
              multimedia={pasosMultimedia.map(p => p.img_multimedia)}
              onChangeMultimedia={handleMultimediaChange}
            />
          </View>
        </View>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Button
            style={{flex: 1, width: '100%'}}
            mode="outlined"
            onPress={handleCancelar}
          >
            Cancelar
          </Button>
          <Button
            style={{flex: 1, width: '100%'}}
            mode="contained"
            onPress={handleGuardar}
            disabled={descripcion_paso === ''}
          >
            Guardar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default NuevaRecetaAgregarPasoScreen;
