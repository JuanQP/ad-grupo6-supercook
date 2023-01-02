import React from 'react';
import { StyleSheet, View } from "react-native";
import { Badge, Button, Paragraph } from 'react-native-paper';

interface Props {
  receta: {
    pasosReceta: Pick<Paso, "descripcion_paso">[];
  };
  onPasoAPasoPress: () => void;
}

function PasosView({ receta, onPasoAPasoPress }: Props) {

  return (
    <View style={styles.container}>
      <Button onPress={onPasoAPasoPress} disabled={receta.pasosReceta.length === 0}>
        Cambiar a modo paso a paso
      </Button>
      {receta.pasosReceta.map((p, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          <Badge style={{alignSelf: 'center', marginRight: 5}}>{i+1}</Badge>
          <Paragraph>{p.descripcion_paso}</Paragraph>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    marginTop: 10,
  }
});

export default PasosView;
