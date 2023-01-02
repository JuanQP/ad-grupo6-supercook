import React from 'react';
import { StyleSheet, View } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";

export type ButtonGroupValue = "Ingredientes" | "Instrucciones" | "Comentarios"

interface Props {
  selected: ButtonGroupValue;
  mostrarComentarios?: boolean;
  onPress: (value: ButtonGroupValue) => void;
}

function ButtonGroup({ selected, mostrarComentarios = false, onPress }: Props) {
  const { colors } = useTheme();
  function handleIngredientesPress() {
    onPress("Ingredientes");
  }

  function handleInstruccionesPress() {
    onPress("Instrucciones");
  }

  function handleComentariosPress() {
    onPress("Comentarios");
  }

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Button
        onPress={handleIngredientesPress}
        mode={selected === "Ingredientes" ? 'contained' : 'outlined'}
      >
        Ingredientes
      </Button>
      <Button
        onPress={handleInstruccionesPress}
        mode={selected === "Instrucciones" ? 'contained' : 'outlined'}>
         Preparacion
       </Button>
      {mostrarComentarios && (
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.onSurfaceDisabled,
            borderRadius: 10,
            backgroundColor: selected === "Comentarios" ? colors.primary : 'transparent',
          }}
        >
          <IconButton
            icon="comment-text-multiple"
            iconColor={selected === "Comentarios" ? colors.background : colors.primary}
            size={20}
            mode={selected === "Comentarios" ? 'contained' : 'outlined'}
            onPress={handleComentariosPress}
          />
        </View>
      )}
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
