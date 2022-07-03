import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function BusquedaTipoScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Búsqueda tipo</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BusquedaTipoScreen;
