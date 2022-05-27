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
  const { data } = useQuery('user', userApi.test, {
    placeholderData: {
      user: {
        nombre: 'Invitado',
        apellido: 'Invitado',
        descripcion: 'Una descripción...',
        recetas: [],
        preferencias: [],
      },
    },
  });
  const { mutate, isLoading } = useMutation(userApi.patchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  function handleDetailsSubmit(values) {
    mutate({
      id: data.user.id,
      descripcion: values.descripcion,
    });
  }

  function handlePreferenceesSubmit(preferencias) {
    mutate({
      id: data.user.id,
      preferenciaIds: preferencias.map(keyExtractor),
    });
  }

  function handleLogOutButtonPress() {
    showModal();
  }

  function handleLogOut() {
    navigation.navigate('Login');
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${data.user.nombre}`}
      onIconPress={() => {}}
      padding={0}
    >
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ProfileHeader user={data.user} onLogOutPress={handleLogOutButtonPress} />
          <View style={{ flex: 2, paddingHorizontal: 20 }}>
            <ProfileDetails
              user={data.user}
              onSubmit={handleDetailsSubmit}
              loading={isLoading}
            />
            <ProfilePreferences
              user={data.user}
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
