import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StyleSheet, View } from "react-native";
import { Badge, Button, Paragraph, Text } from 'react-native-paper';
import * as recipesApi from '../../api/recipes';


function Comentarios({ receta, onPasoAPasoPress }) {

  const { data: comentarios } = useQuery('comentarios', recipesApi.getComentarios(receta.id), {
    placeholderData: [],
  });


  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>Comentarios</Text>
      <Button onPress={onPasoAPasoPress} disabled={receta.pasosReceta.length === 0}>
        Comentarios
      </Button>
      {console.log(comentarios)}
      {comentarios.map((p, i) => (
        {/* <View key={i} style={{flexDirection: 'row'}}>
          <Badge style={{alignSelf: 'center', marginRight: 5}}>{i+1}</Badge>
          <Paragraph>{p.descripcion_paso}</Paragraph>
        </View> */}
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

export default Comentarios;
