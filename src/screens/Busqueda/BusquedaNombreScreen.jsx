import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Chip, Text, TextInput, Title, useTheme } from 'react-native-paper';
import FilterButtonGroup, { BUTTON_VALUES } from '../../components/FilterButtonGroup';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import * as recetasApi from "../../api/recipes";
import RecipeCard from '../../components/RecipeCard';

function BusquedaNombreScreen({ navigation }) {
  const { colors } = useTheme();
  const [selectedButton] = useState(BUTTON_VALUES.Nombre);
  const [nombre, setNombre] = useState('');
  const [sort, setSort] = useState(undefined);
  const queryClient = useQueryClient();
  const { data: recetas, isLoading, refetch } = useQuery(
    'recetas-busqueda',
    () => recetasApi.getRecetaPorNombre({ nombre, sort }),
    {
      enabled: false,
      initialData: [],
    },
  );

  function handleSelectButton(url) {
    navigation.navigate(url);
  }

  function handleRecipePress(recipe) {
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  function handleRemoveSort() {
    setSort(undefined);
    queryClient.fetchQuery(
      'recetas-busqueda',
      () => recetasApi.getRecetaPorNombre({ nombre, sort: undefined }),
    );
  }

  function handleRemoveSearch() {
    setNombre('');
    setSort(undefined);
    queryClient.fetchQuery(
      'recetas-busqueda',
      () => recetasApi.getRecetaPorNombre({ nombre: '', sort: undefined }),
    );
  }

  function handleToggleSort() {
    const newSort = sort === 'asc' ? 'desc' : 'asc';
    setSort(newSort);
    queryClient.fetchQuery(
      'recetas-busqueda',
      () => recetasApi.getRecetaPorNombre({ nombre, sort: newSort }),
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>Búsqueda</Title>
      <FilterButtonGroup selected={selectedButton} onPress={handleSelectButton} />
      <TextInput
        label="Búsqueda"
        mode="outlined"
        placeholder="¿Qué vas a buscar hoy? 😋"
        returnKeyType='search'
        value={nombre}
        left={<TextInput.Icon name="magnify" />}
        onChangeText={setNombre}
        onSubmitEditing={() => refetch()}
      />
      <Title>Resultados</Title>
      <View style={{flexDirection: 'row'}}>
        {nombre !== '' && <Chip onClose={handleRemoveSearch}>Nombre: {nombre}</Chip>}
        <Chip
          icon={sort === 'asc' ? 'arrow-up' : sort === 'desc' ? 'arrow-down' : 'null'}
          onClose={handleRemoveSort}
          onPress={handleToggleSort}
        >
          Ordenar por: Nombre
        </Chip>
      </View>
      {isLoading && (
        <ActivityIndicator animating={isLoading} color={colors.primary} />
      )}
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingVertical: 10}}>
          {recetas?.map(receta => (
            <RecipeCard
              key={receta.id}
              recipe={receta}
              onPress={handleRecipePress}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BusquedaNombreScreen;
