import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as favoritesApi from '../../api/favorites';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';
import RecipeSideScroller from '../../components/RecipeSideScroller';
import HomeLayout from '../../layouts/HomeLayout';
import { HomeStackParamList, TabsParamList } from '../../types/navigation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, "Home">,
  MaterialBottomTabScreenProps<TabsParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { data: usuarioData } = useQuery('user', userApi.getUser);
  const queryClient = useQueryClient();
  const {data: recomendadosData} = useQuery('recomendados', recipesApi.recomendados, {
    initialData: [],
  })
  const {data: recetasUltimasData} = useQuery('recetasUltimas', recipesApi.recetasUltimas, {
    initialData: [],
  })
  const {data: ingredienteDeLaSemanaData} = useQuery('ingredienteDeLaSemana', recipesApi.ingredienteDeLaSemana, {
    initialData: [],
  })

  const { mutate } = useMutation(favoritesApi.agregarFavorito, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recomendados']);
      queryClient.invalidateQueries(['recetasUltimas']);
      queryClient.invalidateQueries(['ingredienteDeLaSemana']);
      queryClient.invalidateQueries(['favorites']);
    },
  });

  function handleIconPress() {
    navigation.jumpTo('PerfilStack', { screen: 'Perfil' });
  }

  function handleRecipePress(recipe: WithId) {
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  function handleRecomendadosPress() {
    navigation.navigate('Recomendados');
  }

  function handleUltimasRecetasPress() {
    navigation.navigate('UltimasRecetas');
  }

  function handleIngredienteDeLaSemanaPress() {
    navigation.navigate('IngredienteDeLaSemana');
  }

  function handleFavoritoPress(recipe: WithId) {
    mutate ({
      id: recipe.id
    })
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuarioData?.usuario.nombre ?? 'Invitado'}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <ScrollView>
        <RecipeSideScroller
          title="Recomendados para vos"
          items={recomendadosData}
          onVerTodosPress={handleRecomendadosPress}
          onItemPress={handleRecipePress}
          onFavoritoPress={handleFavoritoPress}
        />
        <RecipeSideScroller
          title="Últimas recetas añadidas"
          items={recetasUltimasData}
          onVerTodosPress={handleUltimasRecetasPress}
          onItemPress={handleRecipePress}
          onFavoritoPress={handleFavoritoPress}
        />
        <RecipeSideScroller
          title="Ingrediente de la semana"
          items={ingredienteDeLaSemanaData}
          onVerTodosPress={handleIngredienteDeLaSemanaPress}
          onItemPress={handleRecipePress}
          onFavoritoPress={handleFavoritoPress}
        />
      </ScrollView>
    </HomeLayout>
  );
}
