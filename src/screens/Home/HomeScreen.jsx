import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { backgroundColor } from '../../styles/colors';
import { test } from '../../api/user';

export default function HomeScreen() {
  const [nombre, setNombre] = useState('');
  useEffect(() => {
    test().then((data) => {
      setNombre(data.user.nombre);
    });
  });

  return (
    <View style={styles.container}>
      <Paragraph style={styles.paragraph}>
        {`Bienvenido ${nombre}!`}
      </Paragraph>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    justifyContent: 'center',
    padding: 16,
  },
  paragraph: {
    alignSelf: 'center',
  },
});
