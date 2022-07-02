/* eslint-disable linebreak-style */
import React from 'react';
import {
  View, ImageBackground, Dimensions, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { nullImageColor } from '../styles/colors';
import ImagePlaceholder from './ImagePlaceholder';
import { Video } from 'expo-av';

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

  function handleRemoveImage(index) {
    const nuevasImagenes = fotosPortada.filter((_, i) => i !== index);
    onChangeFotosPortada(nuevasImagenes);
  }

  function renderCarouselItem({ item, index }) {
    const isVideo = !!item.match(/\.mp4$/i);

    if(isVideo) {
      return (
        <View>
          <Video
            style={styles.image}
            source={{ uri: item }}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
          <IconButton
            style={{...styles.floating, backgroundColor: colors.surface, elevation: 4, marginLeft: 'auto'}}
            color={colors.text}
            icon="video-off-outline"
            size={20}
            onPress={() => handleRemoveImage(index)}
          />
        </View>
      );
    }

    return (
      <ImageBackground
        style={styles.image}
        source={item ? { uri: item } : undefined}
      >
        <IconButton
          style={{backgroundColor: colors.surface, elevation: 4, marginLeft: 'auto'}}
          color={colors.text}
          icon="image-off-outline"
          size={20}
          onPress={() => handleRemoveImage(index)}
        />
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView>
      <View style={{
        marginTop: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 260, width: PAGE_WIDTH * 0.9,
      }}
      >
        <Carousel
          data={fotosPortada}
          renderItem={renderCarouselItem}
          ListEmptyComponent={<ImagePlaceholder texto="Seleccioná contenido para mostrar 😁" />}
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH * 0.78}
        />
      </View>
      <Button onPress={openGallery} style={{backgroundColor: colors.primary }} mode="contained">
        Subir {mediaType === 'Images' ? 'imagen' : mediaType === 'Videos' ? 'video' : 'contenido'}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: nullImageColor,
    width: PAGE_WIDTH * 0.8,
    height: 200,
  },
  floating: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default CargaImagen;
