import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, Title, FAB } from "react-native-paper";
import { useQuery } from 'react-query';
import { getReceta } from '../../api/recipes';
import { ScrollView, StyleSheet, View } from "react-native";
import UserDetail from './UserDetail';
import ButtonGroup, { BUTTON_VALUES } from './ButtonGroup';
import IngredientesCalculator from './IngredientesCalculator';
import PasosView from './PasosView';
import { CarouselMultimedia } from '../../components/CarouselMultimedia';
import Comentarios from './Comentarios';
import { addLocalRecipe } from '../../utils/utils';

function RecetaScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState(BUTTON_VALUES.Ingredientes);
  const [ingredientes, setIngredientes] = useState([]);
  const [porciones, setPorciones] = useState(1);
  const queryKey = route.params.ratio ? 'receta-with-ratio' : 'receta';
  const { data: receta, isLoading } = useQuery(queryKey,
    () => getReceta(route.params.recetaId),
    {
      onSuccess: (receta) => {
        const { newPorciones, newIngredientes } = updateWithRatio(receta, route.params.ratio ?? 1);
        setPorciones(newPorciones);
        setIngredientes([...newIngredientes]);
      },
    }
  );

  function updateWithRatio(receta, ratio) {
    const newPorciones = receta.porciones * ratio;
    const newIngredientes = receta.ingredientes.map(
      i => ({...i, cantidad: i.cantidad * ratio})
    );
    return { newPorciones, newIngredientes };
  }

  function handleButtonPress(selected) {
    setSelectedTab(selected);
  }

  function handleIngredientesChange(ratio) {
    const { newPorciones, newIngredientes } = updateWithRatio(receta, ratio);
    setPorciones(newPorciones);
    setIngredientes(newIngredientes);
  }

  function handlePasoAPasoPress() {
    navigation.navigate('Paso', { recetaId: receta.id });
  }

  function handleComentariosPress(){
    console.log('handleComentariosPress');
  }

  async function handleSavePress() {
    const ratio = porciones / receta.porciones;
    try {
      await addLocalRecipe(receta, ratio);
      console.log("Receta guardada localmente");
    } catch (error) {
      console.error(error);
    }
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
          {selectedTab === BUTTON_VALUES.Comentarios && (
            <Comentarios
              navigation={navigation}
              receta={receta}
              onComentariosPress={handleComentariosPress}
            />
          )}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="notebook-plus"
        onPress={handleSavePress}
        loading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default RecetaScreen;
