import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as favoritesApi from '../../api/favorites';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';
import RecipeCard from '../../components/RecipeCard';
import HomeLayout from '../../layouts/HomeLayout';
import { HomeStackParamList, TabsParamList } from '../../types/navigation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, "UltimasRecetas">,
  MaterialBottomTabScreenProps<TabsParamList>
>;

export default function UltimasRecetasScreen({ navigation }: Props) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    select: (data) => data.usuario,
  });
  const { data: ultimos } = useQuery('recetasUltimas', recipesApi.recetasUltimas, {
    initialData: [],
  });

  function handleIconPress() {
    navigation.navigate('PerfilStack', { screen: 'Perfil' });
  }

  function handleRecipePress(recipe: WithId) {
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  const queryClient = useQueryClient();
  const { mutate } = useMutation(favoritesApi.agregarFavorito, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recetasUltimas']);
      queryClient.invalidateQueries(['favorites']);
    },
  });

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
      <Title>Últimas recetas</Title>
      <ScrollView>
        {ultimos?.map(r => (
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
