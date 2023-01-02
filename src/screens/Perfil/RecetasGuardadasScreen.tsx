import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { useQuery } from 'react-query';
import * as userApi from '../../api/user';
import SavedRecipeCard from '../../components/SavedRecipeCard';
import HomeLayout from '../../layouts/HomeLayout';
import { PerfilStackParamList, RootStackParamList } from '../../types/navigation';
import { getLocalRecipes, saveLocalRecipes } from '../../utils/utils';

type Props = CompositeScreenProps<
  NativeStackScreenProps<PerfilStackParamList, "RecetasGuardadas">,
  NativeStackScreenProps<RootStackParamList>
>;

function RecetasGuardadasScreen({ navigation }: Props) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    select: (data) => data.usuario,
  });
  const [recetas, setRecetas] = useState<LocalRecipe[]>([]);

  // Ejecutar al navegar a esta pantalla
  useFocusEffect(
    React.useCallback(() => {
      const leerDBLocal = async () => {
        const recetasGuardadas = await getLocalRecipes();
        setRecetas(recetasGuardadas);
      }
      leerDBLocal();
    }, [])
  );

  function handleIconPress() {
    navigation.navigate('Perfil');
  }

  function handleRecipePress(recipe: LocalRecipe) {
    const { id: recetaId, ratio } = recipe;
    navigation.navigate('Receta', { recetaId, ratio })
  }

  async function handleEliminarPress(id: number) {
    const nuevasRecetas = recetas.filter(receta => receta.id !== id);
    await saveLocalRecipes(nuevasRecetas);
    setRecetas(nuevasRecetas);
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario?.nombre ?? 'Invitado'}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <Title>Recetas Guardadas</Title>
      <ScrollView style={{marginTop: 10}}>
        {recetas.length === 0 && (
          <Text style={{textAlign: 'center'}}>
            Todavía no tenés recetas guardadas 😬
          </Text>
        )}
        {recetas.map((r, i) => (
          <SavedRecipeCard
            key={i}
            recipe={r}
            onPress={handleRecipePress}
            onBorrarGuardadaPress={handleEliminarPress}
          />
        ))}
      </ScrollView>
    </HomeLayout>
  );
}

export default RecetasGuardadasScreen;
