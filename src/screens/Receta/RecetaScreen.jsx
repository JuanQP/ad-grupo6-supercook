import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { useQuery } from 'react-query';
import { getReceta } from '../../api/recipes';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { nullImageColor } from '../../styles/colors';
import UserDetail from './UserDetail';
import ButtonGroup, { BUTTON_VALUES } from './ButtonGroup';
import IngredientesCalculator from './IngredientesCalculator';
import PasosView from './PasosView';

const PAGE_WIDTH = Dimensions.get('window').width;

function renderCarouselItem({ item, index }) {
  return (
    <View style={styles.imagePlaceholder}>
      <Title>{`#${index}: "${item}"`}</Title>
    </View>
  )
}

function RecetaScreen({ route }) {
  const { data: receta, isLoading } = useQuery('receta',
    () => getReceta(route.params.recetaId),
    {
      onSuccess: (receta) => {
        setPersonas(receta.personas);
        setIngredientes(receta.ingredientes.slice());
      }
    }
  );
  const [selectedTab, setSelectedTab] = useState(BUTTON_VALUES.Ingredientes);
  const [ingredientes, setIngredientes] = useState([]);
  const [personas, setPersonas] = useState(1);

  function handleButtonPress(selected) {
    setSelectedTab(selected);
  }

  function handleIngredientesChange(personas, ingredientes) {
    setPersonas(personas);
    setIngredientes(ingredientes);
  }

  if(isLoading) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating={true} color={'gray'} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Carousel
          data={receta.fotos}
          renderItem={renderCarouselItem}
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH*0.8}
        />
      </View>
      <ScrollView style={{marginTop: 10}} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Title>{receta.nombre}</Title>
          <UserDetail user={receta.user} />
          <Text style={{ marginTop: 10 }}>{receta.descripcion}</Text>
          <ButtonGroup selected={selectedTab} onPress={handleButtonPress} />
          {selectedTab === BUTTON_VALUES.Ingredientes && (
            <IngredientesCalculator
              ingredientes={ingredientes}
              personas={personas}
              receta={receta}
              onChange={handleIngredientesChange}
            />
          )}
          {selectedTab === BUTTON_VALUES.Instrucciones && (
            <PasosView receta={receta} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    backgroundColor: nullImageColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: PAGE_WIDTH*0.8,
    height: 200
  },
  container: {
    paddingHorizontal: 30,
    marginVertical: 10,
  }
});

export default RecetaScreen;