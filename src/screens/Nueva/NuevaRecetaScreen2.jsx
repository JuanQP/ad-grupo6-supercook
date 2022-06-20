import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ScrollView, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, TextInput, Title, useTheme } from 'react-native-paper';
import SingleDropdown from '../../components/SingleDropdown';
import TagInput from '../../components/TagInput';
import IngredientesInput from '../../components/IngredientesInput';
import { useReceta } from '../../hooks/receta-context';
import * as categoriesApi from '../../api/categories';

function NuevaRecetaScreen2 ({ navigation, route }) {
  const { colors } = useTheme();
  const { nombre } = route.params;
  const { value: receta, onChange: setRecetaContext } = useReceta();
  const { data: categorias } = useQuery(
    'categories',
    categoriesApi.categorias,
    {
      placeholderData: [],
      select: (categorias) => categorias.map(
        categoria => ({ value: categoria.id, label: categoria.descripcion })
      ),
    },
  );
  const [descripcion, setDescripcion] = useState('');
  const [porciones, setPorciones] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [etiquetas, setEtiquetas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);

  function handleEtiquetasChange(etiquetas) {
    setEtiquetas(etiquetas);
  }

  function handleIngredientesChange(ingredientes) {
    setIngredientes(ingredientes);
  }

  function handleSiguientePress() {
    setRecetaContext({
      nombre,
      descripcion,
      porciones: Number(porciones),
      tiempo,
      categoria,
      etiquetas,
      ingredientes,
      pasosReceta: receta?.pasosReceta ?? [],
      fotosPortada: receta?.fotosPortada ?? [],
    });
    navigation.navigate('CrearReceta3');
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Title>{nombre}</Title>
        <View style={{backgroundColor: colors.background, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 200}}>
          <Avatar.Icon icon="camera" color={colors.disabled} style={{backgroundColor: 'transparent'}} />
        </View>
        <TextInput
          label="Descripción"
          placeholder="Agregar descripción..."
          mode="outlined"
          multiline
          numberOfLines={2}
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          label="Porciones"
          mode="outlined"
          placeholder="4"
          keyboardType='decimal-pad'
          value={porciones}
          onChangeText={setPorciones}
          left={<TextInput.Icon name="account-outline" />}
        />
        <TextInput
          label="Tiempo de preparacion (Minutos)"
          mode="outlined"
          placeholder="45"
          keyboardType='decimal-pad'
          value={tiempo}
          onChangeText={setTiempo}
          left={<TextInput.Icon name="clock-outline" />}
        />
        <SingleDropdown
          label="Categoría"
          mode="outlined"
          list={categorias}
          value={categoria}
          setValue={setCategoria}
        />
        <TagInput
          label="Etiquetas"
          mode="outlined"
          tags={etiquetas}
          onTagsChange={handleEtiquetasChange}
        />
        <IngredientesInput
          mode="outlined"
          ingredientes={ingredientes}
          onIngredientesChange={handleIngredientesChange}
        />
        <Button
          style={{marginTop: 10}}
          mode="contained"
          onPress={handleSiguientePress}
        >
          Siguiente (2/3)
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NuevaRecetaScreen2;
