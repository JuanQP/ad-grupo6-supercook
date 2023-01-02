import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { getReceta } from '../../api/recipes';
import PasosViewer from '../../components/PasosViewer';
import { AppNavigatorStackParamList } from '../../types/navigation';


type Props = NativeStackScreenProps<AppNavigatorStackParamList, "Paso">

function PasoScreen({ navigation, route }: Props) {
  const { recetaId } = route.params;
  const { data: pasosReceta, isLoading } = useQuery('receta',
    async () => (await getReceta(recetaId)).pasosReceta,
    {
      initialData: [],
    },
  );

  function handleCerrarPress() {
    navigation.goBack();
  }

  if(isLoading) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating={true} color={'gray'} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 10}}>
        <IconButton
          icon="close"
          iconColor="black"
          size={25}
          style={{marginLeft: 'auto', backgroundColor: 'white', elevation: 4}}
          onPress={handleCerrarPress}
        />
      </View>
      <PasosViewer pasosReceta={pasosReceta ?? []} />
    </SafeAreaView>
  )
}

export default PasoScreen;
