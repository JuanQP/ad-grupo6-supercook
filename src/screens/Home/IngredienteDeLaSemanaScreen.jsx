import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { useQuery } from 'react-query';
import HomeLayout from '../../layouts/HomeLayout';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';
import RecipeCard from '../../components/RecipeCard';

export default function IngredienteDeLaSemanaScreen({ navigation }) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    placeholderData: { nombre: 'Invitado' },
    select: (data) => data.usuario,
  });
  const { data: ultimas } = useQuery('ingredienteDeLaSemana', recipesApi.ingredienteDeLaSemana);

  function handleIconPress() {
    navigation.navigate('Perfil');
  }

  function handleRecipePress(recipe) {
    const { user, ...receta } = recipe;
    Alert.alert('🍔', JSON.stringify(receta));
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario.nombre}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <Title>Ingredientes de la Semana</Title>
      <ScrollView>
        {ultimas.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={handleRecipePress}
          />
        ))}
      </ScrollView>
    </HomeLayout>
  );
}
