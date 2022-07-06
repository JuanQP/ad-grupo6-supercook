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

  function handleImagePressed() {
    onPress(recipe);
  }

  function handleBorrarGuardadaPress() {
    onBorrarGuardadaPress(recipe.id);
  }

  const imagenUrl = recipe?.imagenUrl;

  return (
    <View style={{ flexDirection: 'column', marginHorizontal: 0, width: '100%', marginTop: 15}}>
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
            {recipe.usuarioNombre}
          </Caption>
        </View>
        <IconButton
          color={trashCanColor}
          icon="trash-can-outline"
          onPress={handleBorrarGuardadaPress}
        />
      </View>
      <View>
        <Caption>
          Para {recipe.porciones} porciones en lugar de {recipe.porcionesOriginales} porciones
        </Caption>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContent: {
    backgroundColor: nullImageColor,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default SavedRecipeCard;
