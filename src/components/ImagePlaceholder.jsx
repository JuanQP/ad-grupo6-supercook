import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { nullImageColor } from "../styles/colors";

const PAGE_WIDTH = Dimensions.get('window').width;

export default function ImagePlaceholder({ texto }) {
  return (
    <View style={styles.image}>
      <Text>{texto}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: nullImageColor,
    width: PAGE_WIDTH*0.8,
    height: 200
  },
});