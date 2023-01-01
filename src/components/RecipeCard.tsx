import React from 'react';
import {
  Image, StyleSheet, TouchableWithoutFeedback, View
} from 'react-native';
import {
  Avatar, Caption, IconButton, Title,
  useTheme
} from 'react-native-paper';
import { nullImageColor, starColor } from '../styles/colors';

export type RecipeCardData = Pick<Receta, "nombre"> & {
  esFavorita: boolean;
  usuario: { nombre: string };
  fotosPortada: { imagen: string }[];
}

interface Props<T> {
  recipe: T;
  onPress: (recipe: T) => void;
  onFavoritoPress: (recipe: T) => void;
}

function RecipeCard<T extends RecipeCardData>({ recipe, onPress, onFavoritoPress }: Props<T>) {
  const { colors } = useTheme();
  function handleImagePressed() {
    onPress(recipe);
  }

  function handleFavoritaPress() {
    onFavoritoPress(recipe);
  }

  const imagenUrl = recipe?.fotosPortada?.[0]?.imagen;

  return (
    <View style={{ flexDirection: 'column', marginHorizontal: 10, width: 280}}>
      <TouchableWithoutFeedback onPress={handleImagePressed}>
        <Image
          style={styles.imageContent}
          source={imagenUrl ? {uri: imagenUrl} : undefined}
        />
      </TouchableWithoutFeedback>
      <Title numberOfLines={1}>{recipe.nombre}</Title>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Text label='' size={24} theme={{ colors: { primary: nullImageColor } }} />
          <Caption style={{ marginLeft: 5 }}>
            By
            {' '}
            {recipe.usuario.nombre}
          </Caption>
        </View>
        <IconButton
          iconColor={recipe.esFavorita ? starColor : colors.onSurfaceDisabled}
          icon="star"
          onPress={handleFavoritaPress}
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
