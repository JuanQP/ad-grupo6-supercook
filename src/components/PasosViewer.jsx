import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { Badge, IconButton, Text, useTheme, Title } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { Alert } from "react-native-web";
import { nullImageColor } from "../styles/colors";
import ImagePlaceholder from "./ImagePlaceholder";

const PAGE_WIDTH = Dimensions.get('window').width;

function renderCarouselItem({ item, index }) {
  if (!item.img_multimedia.match(/http/)) {
    return (
      <View style={styles.imageContent}>
        <Title>Sin imágenes</Title>
      </View>
    );
  }
  return (
    <Image
      style={styles.imageContent}
      source={item.img_multimedia ? { uri: item.img_multimedia } : undefined}
    />
  );
}

export default function PasosViewer({ pasosReceta }) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  function handleSiguientePress() {
    if (index === pasosReceta.length - 1) return;
    Alert.alert(JSON.stringify(pasosReceta))
    setIndex(index + 1);
  }

  function handleAnteriorPress() {
    if (index === 0) return;
    setIndex(index - 1);
  }

  function dataMultimedia(pasosMultimedia) {
    const arreglo = pasosMultimedia?.map(item => {
      const imagenes = {
        "img_multimedia": item.img_multimedia
      };

      return imagenes;
    })
    return arreglo;
  }


  return (
    <>
      <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
        <Text>{index + 1} de {pasosReceta.length}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Carousel
          data={dataMultimedia(pasosReceta[index].pasosMultimedia) ?? []}
          renderItem={renderCarouselItem}
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH * 0.8}
          ListEmptyComponent={<ImagePlaceholder texto="Sin imágenes" />}
        />
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        <Badge style={{ alignSelf: 'center', marginRight: 10 }}>{pasosReceta[index].numero_paso}</Badge>
        <View>
          <Text style={{ fontWeight: 'bold' }}>PASO {index + 1}</Text>
          <Text>{pasosReceta[index].descripcion_paso}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 'auto' }}>
        <IconButton
          icon="arrow-left"
          color={colors.primary}
          size={40}
          disabled={index === 0}
          onPress={handleAnteriorPress}
        />
        <IconButton
          icon="arrow-right"
          color={colors.primary}
          size={40}
          disabled={index === pasosReceta.length - 1}
          onPress={handleSiguientePress}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    backgroundColor: nullImageColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: PAGE_WIDTH * 0.9,
    height: 200
  },
  imageContent: {
    backgroundColor: nullImageColor,
    width: 280,
    height: 180,
    borderRadius: 10,
  },
});