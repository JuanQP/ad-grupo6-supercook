import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Badge, IconButton, Text, Title, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { nullImageColor } from '../../styles/colors';
import Carousel from 'react-native-snap-carousel';
import { getReceta } from '../../api/recipes';

const PAGE_WIDTH = Dimensions.get('window').width;
const EMPTY_MEDIA = [
  {img_multimedia: 'Sin imágenes'},
];

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

function PasoScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { recetaId } = route.params;
  const [index, setIndex] = useState(0);
  const { data: pasos, isLoading } = useQuery('receta',
    () => getReceta(recetaId),
    {
      select: (receta) => receta.pasos,
    },
  );

  function handleSiguientePress() {
    if(index === pasos.length - 1) return;
    setIndex(index + 1);
  }

  function handleAnteriorPress() {
    if(index === 0) return;
    setIndex(index - 1);
  }

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
      <View style={{marginVertical: 10, paddingHorizontal: 20}}>
        <Text>{index+1} de {pasos.length}</Text>
      </View>
      <View style={{marginVertical: 10}}>
        <Carousel
          data={pasos[index].media.length === 0 ? EMPTY_MEDIA : pasos[index].media}
          renderItem={renderCarouselItem}
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH*0.9}
        />
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <Badge style={{alignSelf: 'center', marginRight: 10}}>{index+1}</Badge>
        <View>
          <Text style={{fontWeight: 'bold'}}>PASO {index+1}</Text>
          <Text>{pasos[index].descripcion}</Text>
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
          disabled={index === pasos.length - 1}
          onPress={handleSiguientePress}
        />
      </View>
    </SafeAreaView>
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

export default PasoScreen;
