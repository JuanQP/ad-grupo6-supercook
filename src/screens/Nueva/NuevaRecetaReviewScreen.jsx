import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Text, Title } from "react-native-paper";
import Carousel from 'react-native-snap-carousel';
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { nullImageColor } from '../../styles/colors';
import UserDetail from '../Receta/UserDetail';
import ButtonGroup, { BUTTON_VALUES } from '../Receta/ButtonGroup';
import IngredientesCalculator from '../Receta/IngredientesCalculator';
import PasosView from '../Receta/PasosView';
import { useReceta } from '../../hooks/receta-context';
import { useQuery } from 'react-query';
import { getUser } from '../../api/user';
import ImagePlaceholder from '../../components/ImagePlaceholder';

const PAGE_WIDTH = Dimensions.get('window').width;

function renderCarouselItem({ item }) {
  const imagenUrl = item?.imagen;
  return (
    <Image
      style={styles.image}
      source={imagenUrl ? {uri: imagenUrl} : undefined}
    />
  )
}

function NuevaRecetaReviewScreen({ navigation }) {
  const { data: usuario, isLoading: isUsuarioLoading } = useQuery('usuario', getUser, {
    select: (data) => data.usuario,
  });
  const { value: receta } = useReceta();
  const [selectedTab, setSelectedTab] = useState(BUTTON_VALUES.Ingredientes);
  const [ingredientes, setIngredientes] = useState([]);
  const [porciones, setPorciones] = useState(1);

  useEffect(() => {
    setPorciones(receta.porciones);
    setIngredientes(receta.ingredientes.slice());
  }, []);
    
  function handleButtonPress(selected) {
    setSelectedTab(selected);
  }

  function handleIngredientesChange(porciones, ingredientes) {
    setPorciones(porciones);
    setIngredientes(ingredientes);
  }

  function handlePasoAPasoPress() {
    navigation.navigate('PasosReview');
  }

  function handleSavePress() {
    navigation.navigate('RecetaEnviada');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Carousel
          data={receta.fotosPortada}
          renderItem={renderCarouselItem}
          ListEmptyComponent={ <ImagePlaceholder texto="Sin imágenes" /> }
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH*0.8}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Title>{receta.nombre}</Title>
          { !isUsuarioLoading  && <UserDetail user={usuario} />}
          <Text style={{ marginTop: 10 }}>{receta.descripcion}</Text>
          <ButtonGroup selected={selectedTab} onPress={handleButtonPress} />
          {selectedTab === BUTTON_VALUES.Ingredientes && (
            <IngredientesCalculator
              ingredientes={ingredientes}
              porciones={porciones}
              receta={receta}
              editable={false}
              onChange={handleIngredientesChange}
            />
          )}
          {selectedTab === BUTTON_VALUES.Instrucciones && (
            <PasosView
              navigation={navigation}
              receta={receta}
              onPasoAPasoPress={handlePasoAPasoPress}
            />
          )}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="content-save"
        onPress={handleSavePress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    backgroundColor: nullImageColor,
    width: PAGE_WIDTH*0.8,
    height: 200
  },
  container: {
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default NuevaRecetaReviewScreen;
