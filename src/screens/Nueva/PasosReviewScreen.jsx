import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasosViewer from '../../components/PasosViewer';
import { useReceta } from '../../hooks/receta-context';

function PasosReviewScreen({ navigation }) {
  const { value: receta } = useReceta();

  function handleCerrarPress() {
    navigation.goBack();
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
      <PasosViewer pasosReceta={receta.pasosReceta} />
    </SafeAreaView>
  )
}

export default PasosReviewScreen;
