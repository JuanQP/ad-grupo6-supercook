import React from 'react';
import { StyleSheet, View } from "react-native";
import { Badge, Button, Paragraph, Text } from 'react-native-paper';

function PasosView({ receta, navigation }) {

  function handlePasoAPasoPress() {
    navigation.navigate('Paso', { recetaId: receta.id });
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>Preparación</Text>
      <Button onPress={handlePasoAPasoPress}>Cambiar a modo paso a paso</Button>
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
