import React from 'react';
import { StyleSheet, View } from "react-native";
import { Button, useTheme, IconButton } from "react-native-paper";


export const BUTTON_VALUES = {
  Ingredientes: 'Ingredientes',
  Instrucciones: 'Instrucciones',
  Comentarios: 'Comentarios'
};

function ButtonGroup({ selected, onPress }) {
  const { colors } = useTheme();
  function handleIngredientesPress() {
    onPress(BUTTON_VALUES.Ingredientes);
  }

  function handleInstruccionesPress() {
    onPress(BUTTON_VALUES.Instrucciones);
  }

  function handleComentariosPress() {
    onPress(BUTTON_VALUES.Comentarios);
  }

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Button
        onPress={handleIngredientesPress}
        mode={selected === BUTTON_VALUES.Ingredientes ? 'contained' : 'outlined'}
      >
        Ingredientes
      </Button>
      <Button
        onPress={handleInstruccionesPress}
        mode={selected === BUTTON_VALUES.Instrucciones ? 'contained' : 'outlined'}>
         Preparacion
       </Button>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.disabled,
          borderRadius: 10,
          backgroundColor: selected === BUTTON_VALUES.Comentarios ? colors.primary : 'transparent',
        }}
      >
        <IconButton
          icon="comment-text-multiple"
          color={selected === BUTTON_VALUES.Comentarios ? colors.background : colors.primary}
          size={20}
          mode={selected === BUTTON_VALUES.Comentarios ? 'contained' : 'outlined'}
          onPress={handleComentariosPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 4,
    marginLeft: 4,
  },
});

export default ButtonGroup;
