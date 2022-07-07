import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StyleSheet, View } from "react-native";
import { Button, Caption, Divider, Modal, Paragraph, Portal, Text, TextInput, Title, useTheme } from 'react-native-paper';
import * as recipesApi from '../../api/recipes';


function Comentarios({ receta }) {
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [comentario, setComentario] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { data: comentarios, isLoading: isComentariosLoading } = useQuery(
    'comentarios',
    () => recipesApi.getComentarios(receta.id),
    {
      placeholderData: [],
    }
  );
  const { mutate, isLoading } = useMutation(
    recipesApi.crearComentario,
    {
      onSuccess: () => {
        setComentario('');
        hideModal();
        queryClient.invalidateQueries(['comentarios']);
      },
    }
  );

  const containerStyle = {
    backgroundColor: colors.surface,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  };

  function handleEnviar() {
    mutate({
      descripcion: comentario,
      recetaId: receta.id,
    });
  }

  return (
    <View style={styles.container}>
      {isComentariosLoading && (
        <ActivityIndicator
          animating={isComentariosLoading}
          color={colors.primary}
        />
      )}
      {comentarios.map((c, i) => (
        <View key={i} style={styles.comentario}>
          <Paragraph>{c.descripcion}</Paragraph>
        </View>
      ))}
      <Button
        mode='contained'
        onPress={showModal}
      >
        Agregar comentario
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Title>Agregar comentario</Title>
          <Caption>¿Qué te gustaría contarnos?</Caption>
          <Divider style={{marginVertical: 10}} />
          <TextInput
            style={{backgroundColor: 'transparent'}}
            maxLength={200}
            mode='flat'
            value={comentario}
            placeholder="Este plato estaba delicioso 😋"
            onChangeText={setComentario}
          />
          <Text style={{color: colors.disabled, textAlign: 'right'}}>
            {`${comentario.length}/200`}
          </Text>
          <Divider style={{marginVertical: 10}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              mode='outlined'
              onPress={hideModal}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              mode='contained'
              onPress={handleEnviar}
              disabled={isLoading || comentario === ''}
              loading={isLoading}
            >
              Enviar
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    marginTop: 10,
  },
  comentario: {
    backgroundColor: '#e5e6ea',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default Comentarios;
