import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Chip, Menu, Text, TextInput, Title, useTheme } from 'react-native-paper';
import FilterButtonGroup, { BUTTON_VALUES } from '../../components/FilterButtonGroup';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';
import * as recetasApi from "../../api/recipes";
import RecipeCard from '../../components/RecipeCard';

const ORDENAMIENTOS = [
  {nombre: 'Nombre', sort: undefined, icon: 'sort-alphabetical-ascending', menuLabel: 'Nombre'},
  {nombre: 'Fecha', sort: 1, icon: 'sort-calendar-descending', menuLabel: 'Fecha'},
  {nombre: 'Usuario', sort: 2, icon: 'sort-alphabetical-ascending', menuLabel: 'Usuario'},
];

function BusquedaTipoScreen({ navigation }) {
  const { colors } = useTheme();
  const [selectedButton] = useState(BUTTON_VALUES.Categorias);
  const [tipo, setTipo] = useState('');
  const [queryTipo, setQueryTipo] = useState('');
  const [sort, setSort] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { data: recetas, isLoading } = useQuery(
    ['recetas-busqueda', queryTipo, sort], // Cuando alguno de estos cambia, hace refetch
    () => recetasApi.getRecetaPorCategoria({ tipo: queryTipo, sort }),
    {
      enabled: true,
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
  }

  function handleRemoveSearch() {
    setTipo('');
    setQueryTipo('');
  }

  function handleSearch() {
    setQueryTipo(tipo);
  }

  function handleSortPress(sort) {
    setSort(sort);
    closeMenu();
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
        value={tipo}
        left={<TextInput.Icon name="magnify" />}
        onChangeText={setTipo}
        onSubmitEditing={handleSearch}
      />
      <Title>Resultados</Title>
      <View style={{flexDirection: 'row'}}>
        <Chip
          onClose={handleRemoveSearch}
          disabled={queryTipo === ''}
        >
          Nombre: {queryTipo}
        </Chip>
        <View style={{marginLeft: 'auto'}}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={(
              <Chip
                icon={ORDENAMIENTOS[sort ?? 0].icon}
                onPress={openMenu}
                onClose={handleRemoveSort}
              >
                {ORDENAMIENTOS[sort ?? 0].nombre}
              </Chip>
            )}
          >
            {ORDENAMIENTOS.map((o, i) => (
              <Menu.Item
                key={i}
                icon={o.icon}
                onPress={() => handleSortPress(o.sort)}
                title={o.menuLabel}
              />
            ))}
          </Menu>
        </View>
      </View>
      {isLoading && (
        <ActivityIndicator animating={isLoading} color={colors.primary} />
      )}
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingVertical: 10}}>
          {recetas.length === 0 && (
            <View>
              <Text style={{textAlign: 'center'}}>Sin resultados 🤔</Text>
            </View>
          )}
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

export default BusquedaTipoScreen;
