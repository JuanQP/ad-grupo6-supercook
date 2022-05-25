import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { backgroundColor } from '../../styles/colors';

export default function HomeScreen({ route }) {
  return (
    <View style={styles.container}>
      <Paragraph style={styles.paragraph}>
        {`Bienvenido usuario ${route.params.name}!`}
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
