import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { nullImageColor } from "../styles/colors";
import ImagePlaceholder from "./ImagePlaceholder";

const PAGE_WIDTH = Dimensions.get('window').width;

function renderCarouselItem({ item, index }) {
  if(!item.img_multimedia.match(/http/)) {
    return (
      <View style={styles.imagePlaceholder}>
        <Title>Sin imágenes</Title>
      </View>
    );
  }

  return (
    <View style={styles.imagePlaceholder}>
      <Title>{`#${index}`}</Title>
    </View>
  );
}

export default function PasosViewer({ pasosReceta }) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  
  function handleSiguientePress() {
    if(index === pasosReceta.length - 1) return;
    setIndex(index + 1);
  }

  function handleAnteriorPress() {
    if(index === 0) return;
    setIndex(index - 1);
  }
  return (
    <>
      <View style={{marginVertical: 10, paddingHorizontal: 20}}>
        <Text>{index+1} de {pasosReceta.length}</Text>
      </View>
      <View style={{marginVertical: 10}}>
        <Carousel
          data={pasosReceta?.[index]?.media ?? []}
          renderItem={renderCarouselItem}
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH*0.9}
          ListEmptyComponent={<ImagePlaceholder texto="Sin imágenes" />}
        />
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <Badge style={{alignSelf: 'center', marginRight: 10}}>{pasosReceta[index].numero_paso}</Badge>
        <View>
          <Text style={{fontWeight: 'bold'}}>PASO {index+1}</Text>
          <Text>{pasosReceta[index].descripcion_paso}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 'auto'}}>
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
    width: PAGE_WIDTH*0.9,
    height: 200
  },
});