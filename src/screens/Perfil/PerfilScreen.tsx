import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button, Caption, Modal, Portal, Title
} from 'react-native-paper';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as userApi from '../../api/user';
import ProfileDetails, { UsuarioData } from '../../components/ProfileDetails';
import ProfileHeader from '../../components/ProfileHeader';
import ProfilePreferences from '../../components/ProfilePreferences';
import HomeLayout from '../../layouts/HomeLayout';
import { modalStyle } from '../../styles/colors';
import { PerfilStackParamList, RootStackParamList } from '../../types/navigation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<PerfilStackParamList, "Perfil">,
  NativeStackScreenProps<RootStackParamList>
>;

function PerfilScreen({ navigation }: Props) {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const queryClient = useQueryClient();
  const { data } = useQuery('user', userApi.getUser);
  const { mutate, isLoading } = useMutation(userApi.patchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['recomendados']);
    },
  });

  function handleDetailsSubmit(values: UsuarioData) {
    if(!data) throw new Error("No data")
    mutate({
      id: data.usuario.id,
      sobre_mi: values.sobre_mi,
    });
  }

  function handlePreferenceesSubmit(preferencias: WithId[]) {
    if(!data) throw new Error("No data")
    mutate({
      id: data.usuario.id,
      preferenciaIds: preferencias.map((p) => p.id),
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

  if(!data) return <Caption>Cargando...</Caption>

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${data?.usuario.nombre ?? 'Invitado'}`}
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
