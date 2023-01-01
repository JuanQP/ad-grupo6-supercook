import React from 'react';
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

type ButtonValue = "BusquedaNombre" | "BusquedaTipo" | "BusquedaIngrediente" | "BusquedaUsuario"

interface Props {
  selected: ButtonValue;
  onPress: (selected: ButtonValue) => void;
}

function FilterButtonGroup({ selected, onPress }: Props) {

  const { colors } = useTheme();

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress("BusquedaNombre")}
        mode={selected === "BusquedaNombre" ? 'contained' : 'outlined'}
      >
        Nombre
      </Button>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress("BusquedaTipo")}
        mode={selected === "BusquedaTipo" ? 'contained' : 'outlined'}
      >
        Categorías
      </Button>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress("BusquedaIngrediente")}
        mode={selected === "BusquedaIngrediente" ? 'contained' : 'outlined'}
      >
        Ingredientes
      </Button>
      <Button
        compact
        labelStyle={{fontSize: 12}}
        onPress={() => onPress("BusquedaUsuario")}
        mode={selected === "BusquedaUsuario" ? 'contained' : 'outlined'}
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
