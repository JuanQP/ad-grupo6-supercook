import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { getReceta } from '../../api/recipes';
import PasosViewer from '../../components/PasosViewer';

function PasoScreen({ navigation, route }) {
  const { recetaId } = route.params;
  const { data: pasosReceta, isLoading } = useQuery('receta',
    () => getReceta(recetaId),
    {
      select: (receta) => receta.pasosReceta,
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
          color="black"
          size={25}
          style={{marginLeft: 'auto', backgroundColor: 'white', elevation: 4}}
          onPress={handleCerrarPress}
        />
      </View>
      <PasosViewer pasosReceta={pasosReceta} />
    </SafeAreaView>
  )
}

export default PasoScreen;
