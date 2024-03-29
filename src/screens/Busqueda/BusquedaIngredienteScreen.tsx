import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Chip, Menu, Switch, Text, TextInput, Title, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import * as recetasApi from "../../api/recipes";
import FilterButtonGroup, { ButtonValue } from '../../components/FilterButtonGroup';
import RecipeCard from '../../components/RecipeCard';
import { BusquedaStackParamList, HomeStackParamList } from '../../types/navigation';

export type OrdenamientoItem = {
  nombre: string;
  sort: Ordenamientos;
  icon: string;
  menuLabel: string;
}

const ORDENAMIENTOS: OrdenamientoItem[] = [
  {nombre: 'Nombre', sort: undefined, icon: 'sort-alphabetical-ascending', menuLabel: 'Nombre'},
  {nombre: 'Fecha', sort: 1, icon: 'sort-calendar-descending', menuLabel: 'Fecha'},
  {nombre: 'Usuario', sort: 2, icon: 'sort-alphabetical-ascending', menuLabel: 'Usuario'},
];

export type Ordenamientos = 1 | 2 | undefined

type Props = CompositeScreenProps<
  NativeStackScreenProps<BusquedaStackParamList, "BusquedaIngrediente">,
  NativeStackScreenProps<HomeStackParamList>
>;

function BusquedaIngredienteScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [selectedButton] = useState<ButtonValue>("BusquedaIngrediente");
  const [ingrediente, setIngrediente] = useState('');
  const [queryIngrediente, setQueryIngrediente] = useState('');
  const [sort, setSort] = useState<Ordenamientos>(undefined);
  const [visible, setVisible] = useState(false);
  const [conIngrediente, setConIngrediente] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { data: recetas, isLoading } = useQuery(
    ['recetas-busqueda', queryIngrediente, sort, conIngrediente], // Cuando alguno de estos cambia, hace refetch
    () => recetasApi.getRecetaPorIngrediente({ ingrediente: queryIngrediente, sort }, conIngrediente),
    {
      enabled: true,
      initialData: [],
    },
  );

  function handleSelectButton(url: ButtonValue) {
    navigation.navigate(url);
  }

  function handleRecipePress(recipe: WithId) {
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  function handleRemoveSort() {
    setSort(undefined);
  }

  function handleRemoveSearch() {
    setIngrediente('');
    setQueryIngrediente('');
  }

  function handleSearch() {
    setQueryIngrediente(ingrediente);
  }

  function handleSortPress(sort: Ordenamientos) {
    setSort(sort);
    closeMenu();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title style={{ marginTop: 15, marginLeft: 15 }}>Búsqueda</Title>
      <FilterButtonGroup selected={selectedButton} onPress={handleSelectButton} />
      <TextInput
        style={{ marginLeft: 8, marginRight: 8, marginTop: 5}}
        label="Búsqueda"
        mode="outlined"
        placeholder="¿Qué vas a buscar hoy? 😋"
        returnKeyType='search'
        value={ingrediente}
        left={<TextInput.Icon icon="magnify" />}
        onChangeText={setIngrediente}
        onSubmitEditing={handleSearch}
      />
      <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
        <Text style={{textAlignVertical: 'center'}}>Sin ingrediente</Text>
        <Switch value={conIngrediente} onValueChange={() => setConIngrediente(!conIngrediente)} />
        <Text style={{textAlignVertical: 'center'}}>Con ingrediente</Text>
      </View>
      <Title style={{marginLeft: 15 }}>Resultados</Title>
      <View style={{flexDirection: 'row'}}>
        <Chip
          onClose={handleRemoveSearch}
          disabled={queryIngrediente === ''}
        >
          {`${conIngrediente ? 'Con' : 'Sin'} ingrediente: ${queryIngrediente}`}
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
                leadingIcon={o.icon}
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
          {recetas?.length === 0 && (
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

export default BusquedaIngredienteScreen;
