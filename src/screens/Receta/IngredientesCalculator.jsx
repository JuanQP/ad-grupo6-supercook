import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Divider, IconButton, Modal, Portal, Surface, Text, TextInput, Title } from 'react-native-paper';
import { formatNumber } from '../../utils/utils';

function IngredientesCalculator({ porciones, ingredientes, receta, onChange }) {
  const [selectedIngrediente, setSelectedIngrediente] = useState(null);
  const [selectedIngredienteIndex, setSelectedIngredienteIndex] = useState(null);
  const [cantidad, setCantidad] = useState("0");
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function handlePersonasChange(newPersonas) {
    if(newPersonas < 0) return;
    if(newPersonas > 20) return;
    const ratio = newPersonas / receta.porciones;
    const newIngredientes = receta.ingredientes.map(
      i => ({...i, cantidad: i.cantidad * ratio})
    );
    onChange(newPersonas, newIngredientes);
  }

  function handleIngredienteChange() {
    if(isNaN(cantidad) || cantidad < 1) return;
    const ingredienteOriginal = receta.ingredientes[selectedIngredienteIndex];
    const ratio = Number(cantidad) / ingredienteOriginal.cantidad;
    const newPersonas = receta.porciones * ratio;
    const newIngredientes = receta.ingredientes.map(
      i => ({...i, cantidad: i.cantidad * ratio})
    );
    onChange(newPersonas, newIngredientes);
    hideModal();
  }

  function handleRestore() {
    onChange(receta.porciones, receta.ingredientes.slice());
  }

  function handleCantidadChange(value) {
    setCantidad(value);
  }

  function handleEditIngrediente(ingrediente, index) {
    setCantidad(String(ingrediente.cantidad));
    setSelectedIngrediente(ingrediente);
    setSelectedIngredienteIndex(index);
    showModal();
  }

  return (
    <Surface style={styles.surface}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Text>Ingredientes para</Text>
          <Text style={{fontWeight: 'bold'}}>{formatNumber(porciones)} porciones</Text>
        </View>
        <View>
          <TextInput
            mode='outlined'
            left={<TextInput.Icon name="plus" onPress={() => handlePersonasChange(porciones+1)} />}
            right={<TextInput.Icon name="minus" onPress={() => handlePersonasChange(porciones-1)} />}
            value={formatNumber(porciones)}
            editable={false}
            style={{textAlign: 'center'}}
          />
        </View>
        <IconButton
          icon="restore"
          size={20}
          onPress={handleRestore}
        />
      </View>
      <Divider style={{marginVertical: 5}} />
      <View>
        {ingredientes.map((ingrediente, i) => (
          <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{ingrediente.descripcion}</Text>
            <View style={{marginLeft: 'auto', width: 100, alignItems: 'center'}}>
              <Text>
                {`${formatNumber(ingrediente.cantidad)} ${ingrediente.unidad}`}
              </Text>
            </View>
            <IconButton
              icon="square-edit-outline"
              size={20}
              onPress={() => handleEditIngrediente(ingrediente, i)}
            />
          </View>
        ))}
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Title style={{textAlign: 'center'}}>Modificar ingrediente</Title>
          <Text>El resto de los ingredientes se van a acomodar a esta cantidad</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              mode="outlined"
              value={selectedIngrediente?.nombre || ''} disabled
            />
            <TextInput
              mode='outlined'
              value={cantidad || ''}
              keyboardType="decimal-pad"
              style={{flexGrow: 1, textAlign: 'center', marginHorizontal: 5, borderRadius: 10}}
              onChangeText={handleCantidadChange}
            />
            <TextInput
              mode="outlined"
              value={selectedIngrediente?.unidad || ''} disabled
            />
          </View>
          <Divider />
          <Button
            mode='contained'
            style={{marginLeft: 'auto', marginTop: 10}}
            onPress={handleIngredienteChange}
            disabled={isNaN(cantidad) || cantidad == 0}
          >
            Guardar
          </Button>
        </Modal>
      </Portal>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    elevation: 3,
    borderRadius: 6,
    padding: 6,
    marginTop: 10,
  },
  modal: {
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default IngredientesCalculator;
