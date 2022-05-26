import React from 'react';
import {
  Image, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import {
  Avatar, Caption, IconButton, Title,
  useTheme,
} from 'react-native-paper';
import { nullImageColor, starColor } from '../styles/colors';

function RecipeCard({ recipe, onPress }) {
  const { colors } = useTheme();
  function handleImagePressed() {
    onPress(recipe);
  }

  return (
    <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
      <TouchableWithoutFeedback onPress={handleImagePressed}>
        <Image style={styles.imageContent} />
      </TouchableWithoutFeedback>
      <Title>{recipe.nombre}</Title>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={24} theme={{ colors: { primary: nullImageColor } }} />
          <Caption style={{ marginLeft: 5 }}>
            By
            {' '}
            {recipe.user.nombre}
          </Caption>
        </View>
        <IconButton
          color={recipe.esFavorita ? starColor : colors.disabled}
          icon="star"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContent: {
    backgroundColor: nullImageColor,
    width: 280,
    height: 180,
    borderRadius: 10,
  },
});

export default RecipeCard;
