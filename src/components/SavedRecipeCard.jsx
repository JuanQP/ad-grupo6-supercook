import React from 'react';
import {
  Image, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import {
  Avatar, Caption, IconButton, Title,
  useTheme,
} from 'react-native-paper';
import { nullImageColor, trashCanColor } from '../styles/colors';

function SavedRecipeCard({ recipe, onPress, onBorrarGuardadaPress }) {
  const { colors } = useTheme();
  function handleImagePressed() {
    onPress(recipe);
  }

  function handleBorrarGuardadaPress() {
    console.log('handleBorrarGuardadaPress');
    onBorrarGuardadaPress(recipe.id);
    
  }

  const imagenUrl = recipe?.fotosPortada?.[0]?.imagen;

  return (
    <View style={{ flexDirection: 'column', marginHorizontal: 10, width: 280, marginTop: 15}}>
      <TouchableWithoutFeedback onPress={handleImagePressed}>
        <Image 
          style={styles.imageContent}
          source={imagenUrl ? {uri: imagenUrl} : undefined}
        />
      </TouchableWithoutFeedback>
      <Title numberOfLines={1}>{recipe.nombre}</Title>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={24} theme={{ colors: { primary: nullImageColor } }} />
          <Caption style={{ marginLeft: 5 }}>
            By
            {' '}
            {recipe.usuario.nombre}
          </Caption>
        </View>
        <IconButton
          color={trashCanColor}
          icon="trash-can-outline"
          onPress={handleBorrarGuardadaPress}
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

export default SavedRecipeCard;
