import React from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Chip, IconButton, Modal, Portal, Text, Title, useTheme,
} from 'react-native-paper';
import { useQuery } from 'react-query';
import * as dropdownApi from '../api/dropdown';
import { modalStyle } from '../styles/colors';
import ChipPicker from './ChipPicker';

function ProfilePreferences({ user, loading, onSubmit }) {
  const { colors } = useTheme();
  const [userPreferences, setUserPreferences] = React.useState([]);
  const { data } = useQuery('etiquetas', dropdownApi.etiquetas, {
    placeholderData: {
      etiquetas: [],
    },
  });
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setUserPreferences([...user.preferencias]);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  function handlePreferencesChange(newPreferences) {
    setUserPreferences(newPreferences);
  }

  function handleSubmit() {
    hideModal();
    onSubmit(userPreferences);
  }

  return (
    <View style={{ flex: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Preferencias</Text>
        <IconButton
          color={colors.backdrop}
          icon="pencil-circle"
          onPress={showModal}
        />
        <ActivityIndicator animating={loading} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {user.preferencias.map((p) => (
          <Chip key={p.id} textStyle={{ color: colors.primary }}>
            {p.descripcion}
          </Chip>
        ))}
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modalStyle}>
          <View>
            <View>
              <Title>Preferencias</Title>
              <Caption>Seleccione las preferencias que desea agregar</Caption>
            </View>
            <ChipPicker
              items={data.etiquetas}
              selectedItems={userPreferences}
              labelKey="descripcion"
              onChange={handlePreferencesChange}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Button
                mode="outlined"
                onPress={hideModal}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit}
              >
                Agregar
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

export default ProfilePreferences;
