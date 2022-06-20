import React, { useRef, useState } from 'react';
import { View } from "react-native";
import { Caption, IconButton, Text, Title, TextInput } from 'react-native-paper';
import { formatNumber } from '../utils/utils';
import SingleDropdown from './SingleDropdown';

const UNIDADES = [
  {value: 1, label: "u"},
  {value: 2, label: "gr"},
]

function IngredientesInput({ mode, ingredientes, onIngredientesChange }) {

  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState(null);
  const itemInput = useRef(null);
  const cantidadInput = useRef(null);

  function handleSubmit() {
    if(descripcion === '' || cantidad === '' || unidad === null) return;
    const nuevoIngrediente = {
      descripcion,
      cantidad,
      unidadId: unidad,
      unidad: UNIDADES.find(u => u.value === unidad).label,
    };
    onIngredientesChange([...ingredientes, nuevoIngrediente]);
    setDescripcion('');
    setCantidad('');
    itemInput.current.focus();
  }

  function handleRemove(index) {
    onIngredientesChange(ingredientes.filter((_, i) => i !== index));
  }

  return (
    <View>
      <Title>Ingredientes</Title>
      <View>
        {ingredientes.length === 0 && (
          <Caption>
            Acá van aparecer los ingredientes que agregues...
          </Caption>
        )}
        {ingredientes.map((ingrediente, i) => (
          <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{ingrediente.descripcion}</Text>
            <View style={{marginLeft: 'auto', width: 100, alignItems: 'center'}}>
              <Text>
                {`${formatNumber(ingrediente.cantidad)} ${ingrediente.unidad}`}
              </Text>
            </View>
            <IconButton
              icon="minus-box-outline"
              size={20}
              onPress={() => handleRemove(i)}
            />
          </View>
        ))}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          style={{flexGrow: 1}}
          label="Item"
          mode={mode}
          value={descripcion}
          ref={itemInput}
          blurOnSubmit={true}
          returnKeyType="next"
          placeholder="Arroz Blanco"
          onSubmitEditing={() => cantidadInput.current.focus()}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={{flexGrow: 1}}
          label="Cantidad"
          mode={mode}
          value={cantidad}
          ref={cantidadInput}
          placeholder="500"
          keyboardType="decimal-pad"
          onChangeText={setCantidad}
        />
        <SingleDropdown
          label="Unidad"
          mode={mode}
          list={UNIDADES}
          value={unidad}
          setValue={setUnidad}
        />
        <IconButton
          icon="plus-box-outline"
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}

export default IngredientesInput;
