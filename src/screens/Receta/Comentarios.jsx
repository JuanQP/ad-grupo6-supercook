import React from 'react';
import { useQuery } from 'react-query';
import { StyleSheet, View } from "react-native";
import { Paragraph } from 'react-native-paper';
import * as recipesApi from '../../api/recipes';


function Comentarios({ receta }) {

  const { data: comentarios } = useQuery(
    'comentarios',
    () => recipesApi.getComentarios(receta.id),
    {
      placeholderData: [],
    }
  );

  return (
    <View style={styles.container}>
      {comentarios.map((c, i) => (
        <View key={i} style={styles.comentario}>
          <Paragraph>{c.descripcion}</Paragraph>
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
  },
  comentario: {
    backgroundColor: '#e5e6ea',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default Comentarios;
