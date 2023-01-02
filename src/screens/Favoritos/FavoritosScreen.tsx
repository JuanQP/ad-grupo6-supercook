import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as favoritesApi from '../../api/favorites';
import * as userApi from '../../api/user';
import RecipeCard from '../../components/RecipeCard';
import HomeLayout from '../../layouts/HomeLayout';
import { HomeStackParamList, TabsParamList } from '../../types/navigation';

type Props = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Favoritos">,
  NativeStackScreenProps<HomeStackParamList>
>;

function FavoritosScreen({ navigation }: Props) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    select: (data) => data.usuario,
  });

  const queryClient = useQueryClient();

  const { data: favoritos } = useQuery('favorites', favoritesApi.favoritos, {
    placeholderData: [],
  });

  function handleIconPress() {
    navigation.navigate('PerfilStack', { screen: 'Perfil' });
  }

  const { mutate } = useMutation(favoritesApi.agregarFavorito, {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
      queryClient.invalidateQueries(['recomendados']);
      queryClient.invalidateQueries(['recetasUltimas']);
      queryClient.invalidateQueries(['ingredienteDeLaSemana']);
    },
  });

  function handleRecipePress(recipe: WithId) {
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  function handleFavoritoPress(recipe: WithId) {
    mutate ({
      id: recipe.id
    })
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario?.nombre ?? 'Invitado'}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <Title>Recetas Favoritas</Title>
      <ScrollView style={{marginTop: 10}}>
        {favoritos?.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={handleRecipePress}
            onFavoritoPress={handleFavoritoPress}
          />
        ))}
      </ScrollView>
    </HomeLayout>
  );
}

export default FavoritosScreen;
