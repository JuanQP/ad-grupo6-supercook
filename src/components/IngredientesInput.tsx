import React, { useRef, useState } from 'react';
import { TextInput as TextInputType, View } from "react-native";
import { Caption, IconButton, Text, TextInput, Title } from 'react-native-paper';
import { formatNumber } from '../utils/utils';

interface Props {
  mode: "flat" | "outlined" | undefined;
  ingredientes: Omit<Ingrediente, "id">[];
  onIngredientesChange: (ingredientes: Omit<Ingrediente, "id">[]) => void;
}

function IngredientesInput({ mode, ingredientes, onIngredientesChange }: Props) {

  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState('');
  const itemInput = useRef<TextInputType>(null);
  const cantidadInput = useRef<TextInputType>(null);
  const unidadInput = useRef<TextInputType>(null);

  function handleSubmit() {
    if(descripcion === '' || cantidad === '' || unidad === null) return;
    const nuevoIngrediente = {
      descripcion,
      cantidad: Number(cantidad),
      unidad
    };
    onIngredientesChange([...ingredientes, nuevoIngrediente]);
    setDescripcion('');
    setCantidad('');
    setUnidad('');
    itemInput.current?.focus();
  }

  function handleRemove(index: number) {
    onIngredientesChange(ingredientes.filter((_, i) => i !== index));
  }

  return (
    <View>
      <Title style={{marginTop:10}}>Ingredientes</Title>
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
          onSubmitEditing={() => cantidadInput.current?.focus()}
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
        <TextInput
          style={{flexGrow: 1}}
          label="Unidad"
          mode={mode}
          value={unidad}
          ref={unidadInput}
          placeholder="Unidad"
          onChangeText={setUnidad}
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
