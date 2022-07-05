import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { useMutation, useQuery, useQueryClient} from 'react-query';
import HomeLayout from '../../layouts/HomeLayout';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';
import * as favoritesApi from '../../api/favorites'
import RecipeCard from '../../components/RecipeCard';

export default function UltimasRecetasScreen({ navigation }) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    placeholderData: { nombre: 'Invitado' },
    select: (data) => data.usuario,
  });
  const { data: ultimos } = useQuery('recetasUltimas', recipesApi.recetasUltimas);

  function handleIconPress() {
    navigation.navigate('Perfil');
  }

  function handleRecipePress(recipe) {
    const { user, ...receta } = recipe;
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(favoritesApi.agregarFavorito, { 
    onSuccess: () => {
      queryClient.invalidateQueries(['recetasUltimas']);
    },
  });

  function handleFavoritoPress(recipe) {
    mutate ({
      id: recipe.id
    })
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario.nombre}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <Title>Últimas recetas</Title>
      <ScrollView>
        {ultimos.map(r => (
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
