import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { useQuery } from 'react-query';
import HomeLayout from '../../layouts/HomeLayout';
import * as userApi from '../../api/user';
import SavedRecipeCard from '../../components/SavedRecipeCard';
import { useFocusEffect } from "@react-navigation/native";
import { getLocalRecipes, saveLocalRecipes } from '../../utils/utils';

function RecetasGuardadasScreen({ navigation }) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    placeholderData: { nombre: 'Invitado' },
    select: (data) => data.usuario,
  });
  const [recetas, setRecetas] = useState([]);

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
    navigation.navigate('PerfilStack', { screen: 'Perfil' });
  }

  function handleRecipePress(recipe) {
    const { id: recetaId, ratio } = recipe;
    navigation.navigate('Receta', { recetaId, ratio })
  }

  async function handleEliminarPress(id) {
    const nuevasRecetas = recetas.filter(receta => receta.id !== id);
    await saveLocalRecipes(nuevasRecetas);
    setRecetas(nuevasRecetas);
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario.nombre}`}
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
        {recetas.map(r => (
          <SavedRecipeCard
            key={r.id}
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
