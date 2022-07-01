/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  View, ImageBackground, Dimensions, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Avatar, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { nullImageColor } from '../styles/colors';
import ImagePlaceholder from './ImagePlaceholder';

const PAGE_WIDTH = Dimensions.get('window').width;

function CargaImagen({ fotosPortada, onChangeFotosPortada }) {
  const { colors } = useTheme();
  const [image, setImage] = useState(null);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const nuevaImagen = result.uri;
      setImage(nuevaImagen);
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
    return (
      <ImageBackground
        style={styles.image}
        source={item ? { uri: item } : undefined}
      >
        <IconButton
          style={{backgroundColor: colors.surface, elevation: 4, marginLeft: 'auto'}}
          color={colors.text}
          icon="close"
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
        {image
          ? (
            <Carousel
              data={fotosPortada}
              renderItem={renderCarouselItem}
              ListEmptyComponent={<ImagePlaceholder texto="Sin imágenes" />}
              sliderWidth={PAGE_WIDTH}
              itemWidth={PAGE_WIDTH * 0.78}
            />
          )
          : <Avatar.Icon icon="camera" color={colors.disabled} style={{ backgroundColor: colors.background, height: 220, width: PAGE_WIDTH * 0.9 }} />}

      </View>
      <Button onPress={openGallery} style={{backgroundColor: colors.primary }} mode="contained">
        Subir imagen
      </Button>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    backgroundColor: nullImageColor,
    width: PAGE_WIDTH * 0.8,
    height: 200,
  },
});

export default CargaImagen;
