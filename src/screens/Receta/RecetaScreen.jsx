import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { useQuery } from 'react-query';
import { getReceta } from '../../api/recipes';
import { ScrollView, StyleSheet, View } from "react-native";
import UserDetail from './UserDetail';
import ButtonGroup, { BUTTON_VALUES } from './ButtonGroup';
import IngredientesCalculator from './IngredientesCalculator';
import PasosView from './PasosView';
import { CarouselMultimedia } from '../../components/CarouselMultimedia';

function RecetaScreen({ navigation, route }) {
  const { data: receta, isLoading } = useQuery('receta',
    () => getReceta(route.params.recetaId),
    {
      onSuccess: (receta) => {
        setPorciones(receta.porciones);
        setIngredientes(receta.ingredientes.slice());
      },
    }
  );
  const [selectedTab, setSelectedTab] = useState(BUTTON_VALUES.Ingredientes);
  const [ingredientes, setIngredientes] = useState([]);
  const [porciones, setPorciones] = useState(1);

  function handleButtonPress(selected) {
    setSelectedTab(selected);
  }

  function handleIngredientesChange(porciones, ingredientes) {
    setPorciones(porciones);
    setIngredientes(ingredientes);
  }

  function handlePasoAPasoPress() {
    navigation.navigate('Paso', { recetaId: receta.id });
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
      <View style={{marginTop:15}}>
        <CarouselMultimedia data={receta.fotosPortada.map(f => f.imagen)} />
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Title>{receta.nombre}</Title>
          <UserDetail user={receta.usuario} />
          <Text style={{ marginTop: 10 }}>{receta.descripcion}</Text>
          <ButtonGroup selected={selectedTab} onPress={handleButtonPress} />
          {selectedTab === BUTTON_VALUES.Ingredientes && (
            <IngredientesCalculator
              ingredientes={ingredientes}
              porciones={porciones}
              receta={receta}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginVertical: 10,
  }
});

export default RecetaScreen;
