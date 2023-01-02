import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Snackbar, Text, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { getReceta } from '../../api/recipes';
import { CarouselMultimedia } from '../../components/CarouselMultimedia';
import { AppNavigatorStackParamList, HomeStackParamList } from '../../types/navigation';
import { addLocalRecipe, updateWithRatio } from '../../utils/utils';
import ButtonGroup, { ButtonGroupValue } from './ButtonGroup';
import Comentarios from './Comentarios';
import IngredientesCalculator from './IngredientesCalculator';
import PasosView from './PasosView';
import UserDetail from './UserDetail';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, "Receta">,
  NativeStackScreenProps<AppNavigatorStackParamList>
>;

type ScreenReceta = Awaited<ReturnType<typeof getReceta>>

function RecetaScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<ButtonGroupValue>("Ingredientes");
  const [ingredientes, setIngredientes] = useState<Omit<Ingrediente, "id">[]>([]);
  const [porciones, setPorciones] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
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

  function handleButtonPress(selected: ButtonGroupValue) {
    setSelectedTab(selected);
  }

  function handleIngredientesChange(ratio: number) {
    if(!receta) return
    const { newPorciones, newIngredientes } = updateWithRatio(receta, ratio);
    setPorciones(newPorciones);
    setIngredientes(newIngredientes);
  }

  function handlePasoAPasoPress() {
    if(!receta) return
    navigation.navigate('Paso', { recetaId: receta.id });
  }

  async function handleSavePress() {
    if(!receta) return
    const ratio = porciones / receta.porciones;
    try {
      await addLocalRecipe(receta, ratio);
      setSnackbarMessage('Receta guardada localmente 😌')
    } catch (error) {
      setSnackbarMessage((error as Error).message);
    } finally {
      setVisible(true);
    }
  }

  if (isLoading || !receta) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} color={'gray'} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 15 }}>
        <CarouselMultimedia data={receta.fotosPortada.map(f => f.imagen)} />
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Title>{receta.nombre}</Title>
          <View style={{ ...styles.container2, backgroundColor: colors.background }}>
            <Text style={{ marginTop: 1 }}>{'Categoria: ' + receta.categoria["descripcion"]}</Text>
          </View>
          <UserDetail user={receta.usuario} />
          <Text style={{ marginTop: 5 }}>{receta.descripcion}</Text>
          <ButtonGroup
            mostrarComentarios
            selected={selectedTab}
            onPress={handleButtonPress}
          />
          {selectedTab === "Ingredientes" && (
            <IngredientesCalculator
              ingredientes={ingredientes}
              porciones={porciones}
              receta={receta}
              onChange={handleIngredientesChange}
            />
          )}
          {selectedTab === "Instrucciones" && (
            <PasosView receta={receta} onPasoAPasoPress={handlePasoAPasoPress} />
          )}
          {selectedTab === "Comentarios" && (
            <Comentarios receta={receta} />
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
      <Snackbar
        visible={visible}
        duration={4000}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Cerrar',
          onPress: onDismissSnackBar,
        }}>
        {snackbarMessage}
      </Snackbar>
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
  },
  container2: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'flex-start',
    marginTop: 2,
    paddingVertical: 3,
    marginLeft: 6,
  },
});

export default RecetaScreen;
