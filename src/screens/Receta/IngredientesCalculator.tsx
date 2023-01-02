import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Divider, IconButton, Modal, Portal, Surface, Text, TextInput, Title } from 'react-native-paper';
import { formatNumber } from '../../utils/utils';

interface Props {
  porciones: number;
  editable?: boolean;
  ingredientes: Omit<Ingrediente, "id">[];
  receta: Omit<Receta, "id" | "verificada" | "fecha"> & { ingredientes: Omit<Ingrediente, "id">[] };
  onChange: (ratio: number) => void;
}

function IngredientesCalculator({ porciones, editable=true, ingredientes, receta, onChange }: Props) {
  const [selectedIngrediente, setSelectedIngrediente] = useState<Omit<Ingrediente, "id"> | null>(null);
  const [selectedIngredienteIndex, setSelectedIngredienteIndex] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState("0");
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function handlePersonasChange(newPersonas: number) {
    if(newPersonas < 0) return;
    if(newPersonas > 20) return;
    const ratio = newPersonas / receta.porciones;
    onChange(ratio);
  }

  function handleIngredienteChange() {
    if(isNaN(Number(cantidad)) || Number(cantidad) < 1) return;
    if(!selectedIngredienteIndex) return

    const ingredienteOriginal = receta.ingredientes[selectedIngredienteIndex];
    const ratio = Number(cantidad) / ingredienteOriginal.cantidad;
    onChange(ratio);
    hideModal();
  }

  function handleRestore() {
    const defaultRatio = 1;
    onChange(defaultRatio);
  }

  function handleCantidadChange(value: string) {
    setCantidad(value);
  }

  function handleEditIngrediente(ingrediente: Omit<Ingrediente, "id">, index: number) {
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
            left={<TextInput.Icon icon="plus" onPress={() => handlePersonasChange(porciones+1)} />}
            right={<TextInput.Icon icon="minus" onPress={() => handlePersonasChange(porciones-1)} />}
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
              disabled={!editable}
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
              value={selectedIngrediente?.descripcion || ''} disabled
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
            disabled={isNaN(Number(cantidad)) || Number(cantidad) == 0}
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
