import React from 'react';
import { ScrollView, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { keyExtractor } from 'react-native/Libraries/Lists/VirtualizeUtils';
import {
  Button, Caption, Modal, Portal, Title,
} from 'react-native-paper';
import HomeLayout from '../../layouts/HomeLayout';
import * as userApi from '../../api/user';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileDetails from '../../components/ProfileDetails';
import ProfilePreferences from '../../components/ProfilePreferences';
import { modalStyle } from '../../styles/colors';

function PerfilScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const queryClient = useQueryClient();
  const { data } = useQuery('user', userApi.getUser, {
    placeholderData: {
      usuario: {
        nombre: 'Invitado',
        apellido: 'Invitado',
        sobre_mi: 'Una descripción...',
        recetas: [],
        preferencias: [],
      },
    },
  });
  const { mutate, isLoading } = useMutation(userApi.patchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['recomendados']);
    },
  });

  function handleDetailsSubmit(values) {
    mutate({
      id: data.usuario.id,
      sobre_mi: values.sobre_mi,
    });
  }

  function handlePreferenceesSubmit(preferencias) {
    mutate({
      id: data.usuario.id,
      preferenciaIds: preferencias.map(keyExtractor),
    });
  }

  function handleLogOutButtonPress() {
    showModal();
  }

  function handleLogOut() {
    navigation.navigate('Login');
  }

  function handleOnPressRecGuardadas() {
    navigation.navigate('RecetasGuardadas');
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${data.usuario.nombre}`}
      onIconPress={() => {}}
      padding={0}
    >
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ProfileHeader user={data.usuario} onLogOutPress={handleLogOutButtonPress} />
          <View style={{ flex: 2, paddingHorizontal: 20 }}>
            <ProfileDetails
              user={data.usuario}
              onSubmit={handleDetailsSubmit}
              loading={isLoading}
              onPressRecetasGuardadas={handleOnPressRecGuardadas}
            />
            <ProfilePreferences
              user={data.usuario}
              onSubmit={handlePreferenceesSubmit}
              loading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle}
        >
          <View style={{ alignItems: 'center' }}>
            <Title>
              Log Out
            </Title>
            <Caption>
              ¿Está seguro que desea desloguearse?
            </Caption>
            <View style={{ alignSelf: 'stretch' }}>
              <Button
                mode="contained"
                style={{ marginVertical: 10 }}
                onPress={handleLogOut}
              >
                Confirmar
              </Button>
              <Button
                mode="outlined"
                style={{ marginVertical: 10 }}
                onPress={hideModal}
              >
                Cancelar
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </HomeLayout>
  );
}

export default PerfilScreen;
