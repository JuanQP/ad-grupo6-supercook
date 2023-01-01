import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { nullImageColor } from '../styles/colors';
import ImagePlaceholder from './ImagePlaceholder';

const PAGE_WIDTH = Dimensions.get('window').width;

interface Props {
  data: string[];
  editable?: boolean;
  textoVacio?: string;
  onChangeMultimedia?: (multimedias: string[]) => void;
}

export function CarouselMultimedia({
  data,
  editable = false,
  textoVacio = "No hay contenido para mostrar",
  onChangeMultimedia,
}: Props) {

  const { colors } = useTheme();

  function handleRemoveMultimedia(index: number) {
    const nuevoMultimedia = data.filter((_, i) => i !== index);
    onChangeMultimedia?.(nuevoMultimedia);
  }

  function renderCarouselItem({ item, index }: { item: string, index: number }) {
    const isVideo = !!item?.match(/\.mp4$/i);

    if(isVideo) {
      return (
        <View>
          <Video
            style={styles.image}
            source={{ uri: item }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
          />
          {editable && <IconButton
            style={{...styles.floating, backgroundColor: colors.surface, elevation: 4, marginLeft: 'auto'}}
            iconColor={colors.onSurface}
            icon="video-off-outline"
            size={20}
            onPress={() => handleRemoveMultimedia(index)}
          />}
        </View>
      );
    }

    return (
      <ImageBackground
        style={styles.image}
        source={item ? { uri: item } : undefined}
      >
        {editable && <IconButton
          style={{backgroundColor: colors.surface, elevation: 4, marginLeft: 'auto'}}
          iconColor={colors.onSurface}
          icon="image-off-outline"
          size={20}
          onPress={() => handleRemoveMultimedia(index)}
        />}
      </ImageBackground>
    );
  }

  return (
    <Carousel
      data={data}
      renderItem={renderCarouselItem}
      ListEmptyComponent={<ImagePlaceholder texto={textoVacio} />}
      sliderWidth={PAGE_WIDTH}
      itemWidth={PAGE_WIDTH * 0.78}
    />
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
