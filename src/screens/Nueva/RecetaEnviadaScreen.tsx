import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceta } from '../../hooks/receta-context';
import { HomeStackParamList, NuevaStackParamList } from '../../types/navigation';
import { EMPTY_RECETA } from './NuevaRecetaScreen1';

type Props = CompositeScreenProps<
  NativeStackScreenProps<NuevaStackParamList, "RecetaEnviada">,
  NativeStackScreenProps<HomeStackParamList>
>;

function RecetaEnviadaScreen({ navigation }: Props) {

  const {value: receta, onChange: setRecetaContext} = useReceta()!;
  const accionTexto = receta?.action === "Editar" ? 'actualizada' : 'reemplazada';

  function handleHomePress() {
    setRecetaContext({...EMPTY_RECETA});
    navigation.popToTop();
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Title>SuperCook</Title>
        {receta?.action === "Crear" && (
          <Text style={{paddingHorizontal: 40, textAlign: 'center'}}>
            Tu receta va a ser validada. Cuando finalicemos te avisamos!!!
          </Text>
        )}
        {receta?.action !== "Crear" && (
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
