/* eslint-disable linebreak-style */
import React from 'react';
import { View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { CarouselMultimedia } from './CarouselMultimedia';

const PAGE_WIDTH = Dimensions.get('window').width;

function CargaImagen({mediaType='Images', fotosPortada, onChangeFotosPortada }) {
  const { colors } = useTheme();

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[mediaType],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const nuevaImagen = result.uri;
      onChangeFotosPortada([
        ...fotosPortada,
        nuevaImagen,
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View style={{
        marginTop: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 260, width: PAGE_WIDTH * 0.9,
      }}
      >
        <CarouselMultimedia
          data={fotosPortada}
          editable
          textoVacio="Seleccioná contenido para mostrar 😁"
          onChangeMultimedia={onChangeFotosPortada}
        />
      </View>
      <Button onPress={openGallery} style={{backgroundColor: colors.primary }} mode="contained">
        Subir {mediaType === 'Images' ? 'imagen' : mediaType === 'Videos' ? 'video' : 'contenido'}
      </Button>
    </SafeAreaView>
  );
}

export default CargaImagen;
