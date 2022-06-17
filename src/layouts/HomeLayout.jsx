import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { surface } from '../styles/colors';

function HomeLayout({
  children, icon, title, onIconPress, padding,
}) {
  return (
    <>
      <Appbar.Header theme={{ colors: { primary: surface } }}>
        <Appbar.Action icon={icon} onPress={onIconPress} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <View style={{ ...styles.container, paddingHorizontal: padding }}>
        {children}
        <StatusBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: surface,
    justifyContent: 'center',
  },
});

export default HomeLayout;
