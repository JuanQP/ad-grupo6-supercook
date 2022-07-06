import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, Divider, FAB, Modal, Portal, Text, Title, useTheme } from "react-native-paper";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useQuery, useMutation } from 'react-query';
import UserDetail from '../Receta/UserDetail';
import ButtonGroup, { BUTTON_VALUES } from '../Receta/ButtonGroup';
import IngredientesCalculator from '../Receta/IngredientesCalculator';
import PasosView from '../Receta/PasosView';
import { useReceta } from '../../hooks/receta-context';
import { getUser } from '../../api/user';
import * as recipesApi from '../../api/recipes';
import { CarouselMultimedia } from '../../components/CarouselMultimedia';
import * as Network from 'expo-network';
import { deleteRecetaLocal, saveRecetaLocal } from '../../utils/utils';

function NuevaRecetaReviewScreen({ navigation }) {
  const { colors } = useTheme();
  const { data: usuario, isLoading: isUsuarioLoading } = useQuery('usuario', getUser, {
    select: (data) => data.usuario,
  });
  const { value: receta } = useReceta();
  const [selectedTab, setSelectedTab] = useState(BUTTON_VALUES.Ingredientes);
  const [ingredientes, setIngredientes] = useState([]);
  const [porciones, setPorciones] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: colors.surface, padding: 20, margin: 20, borderRadius: 10};

  const { mutate, isLoading } = useMutation(recipesApi.crearReceta, {
    onSuccess: () => {
      deleteRecetaLocal(); // Se borra la receta local, siempre
      navigation.navigate('RecetaEnviada');
    },
    onError: (error) => {
      Alert.alert('😞', error.response?.data?.message ?? 'Algo salió mal');
    },
    onSettled: () => {
      setVisible(false);
    },
  });

  useEffect(() => {
    setPorciones(Number(receta.porciones));
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

  function handleEnviarIgual() {
    mutate(receta);
  }

  async function handleGuardarLocalmente() {
    await saveRecetaLocal(receta);
    navigation.popToTop();
    navigation.navigate('Home');
    Alert.alert("Receta guardada localmente", "Podés recuperarla si vas nuevamente a la pantalla de agregar receta 😊")
  }

  async function handleSavePress() {
    const networkState = await Network.getNetworkStateAsync();
    if(networkState.type === Network.NetworkStateType.WIFI) {
      mutate(receta);
      return;
    }
    showModal();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 15 }}>
        <CarouselMultimedia data={receta.fotosPortada} />
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Title>{receta.nombre}</Title>
          {!isUsuarioLoading && <UserDetail user={usuario} />}
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
        loading={isLoading}
      />
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar.Icon color={colors.primary} icon="alert-circle" style={{backgroundColor: 'transparent'}} />
            <Title>Aviso!</Title>
          </View>
          <Text style={{textAlign: 'center'}}>No estás conectado a una red Wifi.</Text>
          <Text style={{textAlign: 'center'}}>¿Querés enviar de todas formas la receta? 🤔</Text>
          <Divider style={{marginVertical: 10}} />
          <Button mode='contained' onPress={handleEnviarIgual}>
            Enviar usando datos móviles
          </Button>
          <Button mode='outlined' style={{marginTop: 10}} onPress={handleGuardarLocalmente}>
            Guardar y enviar más tarde
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
