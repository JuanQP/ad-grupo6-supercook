import React from 'react';
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

export const BUTTON_VALUES = {
  Nombre: 'BusquedaNombre',
  Categorias: 'BusquedaTipo',
  Ingredientes: 'BusquedaIngrediente',
  Usuarios: 'BusquedaUsuario',
};

function FilterButtonGroup({ selected, onPress }) {

  const { colors } = useTheme();

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress(BUTTON_VALUES.Nombre)}
        mode={selected === BUTTON_VALUES.Nombre ? 'contained' : 'outlined'}
      >
        Nombre
      </Button>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress(BUTTON_VALUES.Categorias)}
        mode={selected === BUTTON_VALUES.Categorias ? 'contained' : 'outlined'}
      >
        Categorías
      </Button>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress(BUTTON_VALUES.Ingredientes)}
        mode={selected === BUTTON_VALUES.Ingredientes ? 'contained' : 'outlined'}
      >
        Ingredientes
      </Button>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress(BUTTON_VALUES.Usuarios)}
        mode={selected === BUTTON_VALUES.Usuarios ? 'contained' : 'outlined'}
      >
        Usuarios
      </Button>
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
    marginLeft:4,
    marginRight:4,
  },
});

export default FilterButtonGroup;
