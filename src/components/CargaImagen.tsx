/* eslint-disable linebreak-style */
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CarouselMultimedia } from './CarouselMultimedia';

const PAGE_WIDTH = Dimensions.get('window').width;

interface Props {
  mediaType: "Images" | "Videos" | "All";
  multimedia: string[];
  onChangeMultimedia: (multimedias: string[]) => void;
}

function CargaImagen({mediaType='Images', multimedia, onChangeMultimedia }: Props) {
  const { colors } = useTheme();

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[mediaType],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.cancelled && result.uri) {
      const nuevaImagen = result.uri;
      onChangeMultimedia([
        ...multimedia,
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
          data={multimedia}
          editable
          textoVacio="Seleccioná contenido para mostrar 😁"
          onChangeMultimedia={onChangeMultimedia}
        />
      </View>
      <Button onPress={openGallery} style={{backgroundColor: colors.primary }} mode="contained">
        Subir {mediaType === 'Images' ? 'imagen' : mediaType === 'Videos' ? 'video' : 'contenido'}
      </Button>
    </SafeAreaView>
  );
}

export default CargaImagen;
