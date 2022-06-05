import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Badge, Button, Divider, IconButton, Paragraph, Surface, Text, TextInput } from 'react-native-paper';

function PasosView({ receta }) {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>Preparación</Text>
      <Button>Cambiar a modo paso a paso</Button>
      {receta.pasos.map((p, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          <Badge style={{alignSelf: 'center', marginRight: 5}}>{i+1}</Badge>
          <Paragraph>{p.descripcion}</Paragraph>
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