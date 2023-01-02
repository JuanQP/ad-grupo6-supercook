import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from "react-native";
import { Button, Caption, Subheading, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Paso from '../../components/Paso';
import { useReceta } from '../../hooks/receta-context';
import { NuevaStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<NuevaStackParamList, "CrearReceta3">

function NuevaRecetaScreen3 ({ navigation }: Props) {
  const { value: receta } = useReceta()!;

  if(!receta) return <Caption>Loading...</Caption>

  function handleAgregarPasoPress() {
    navigation.navigate('CrearRecetaAgregarPaso', {});
  }

  function handleEditPress(index: number) {
    navigation.navigate('CrearRecetaAgregarPaso', {index});
  }

  async function handleSubmit() {
    navigation.navigate('NuevaRecetaReview');
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1}}>
        <Title style={{marginTop:15}}>{receta.nombre}</Title>
        <Subheading style={{marginTop:10}}>Paso a paso</Subheading>
        {receta.pasosReceta.length === 0 && (
          <Caption>Todavía no agregaste ningún paso para preparar esta receta 😬</Caption>
        )}
        {receta.pasosReceta.sort((a,b) => a.numero_paso - b.numero_paso).map((paso, i) => (
          <Paso key={i} paso={paso} onEditPress={handleEditPress} />
        ))}
        <Button
          mode="text"
          icon="plus"
          onPress={handleAgregarPasoPress}
        >
          Agregar paso
        </Button>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Button
            style={{width: '100%'}}
            mode="contained"
            disabled={receta.pasosReceta.length === 0}
            onPress={handleSubmit}
          >
            Finalizar edición (3/3)
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NuevaRecetaScreen3;
