import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { surface } from '../styles/colors';

interface Props {
  children: JSX.Element[];
  icon: IconSource;
  title: string;
  padding: number;
  onIconPress: () => void;
}

function HomeLayout({
  children, icon, title, onIconPress, padding,
}: Props) {
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
