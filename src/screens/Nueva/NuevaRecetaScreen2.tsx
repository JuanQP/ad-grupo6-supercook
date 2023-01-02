import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, View } from "react-native";
import { Button, TextInput, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import * as categoriesApi from '../../api/categories';
import CargaImagen from '../../components/CargaImagen';
import IngredientesInput from '../../components/IngredientesInput';
import SingleDropdown, { DropdownItem } from '../../components/SingleDropdown';
import TagInput from '../../components/TagInput';
import { useReceta } from '../../hooks/receta-context';
import { NuevaStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<NuevaStackParamList, "CrearReceta2">

function NuevaRecetaScreen2({ navigation, route }: Props) {
  const { nombre } = route.params;
  const { value: receta, onChange: setRecetaContext } = useReceta()!;
  if(!receta) return null
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
  const [descripcion, setDescripcion] = useState(receta.descripcion);
  const [porciones, setPorciones] = useState(String(receta.porciones));
  const [tiempo_coccion, setTiempo_Coccion] = useState(String(receta.tiempo_coccion));
  const [categoria, setCategoria] = useState<DropdownItem>({ label: '', value: receta.categoria});
  const [etiquetas, setEtiquetas] = useState(receta.etiquetas);
  const [ingredientes, setIngredientes] = useState(receta.ingredientes);
  const [fotosPortada, setFotosPortada] = useState(receta.fotosPortada);

  function handleEtiquetasChange(etiquetas: string[]) {
    setEtiquetas(etiquetas);
  }

  function handleIngredientesChange(ingredientes: Omit<Ingrediente, "id">[]) {
    setIngredientes(ingredientes);
  }

  function handleFotosPortadaChange(fotos: string[]) {
    setFotosPortada(fotos);
  }

  function handleSiguientePress() {
    const recetaModificada = {
      ...receta!,
      nombre,
      descripcion,
      porciones: Number(porciones),
      tiempo_coccion: Number(tiempo_coccion),
      categoria: categoria.value,
      etiquetas,
      ingredientes,
      pasosReceta: receta?.pasosReceta ?? [],
      fotosPortada,
    };
    setRecetaContext(recetaModificada);
    navigation.navigate('CrearReceta3');
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Title style={{ marginTop: 15 }}>{nombre}</Title>
        <View style={{ marginTop: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 260 }}>
          <CargaImagen
            mediaType='Images'
            multimedia={fotosPortada ?? []}
            onChangeMultimedia={handleFotosPortadaChange}
          />
        </View>
        <TextInput
          label="Descripción"
          placeholder="Agregar descripción..."
          mode="outlined"
          multiline
          numberOfLines={2}
          value={descripcion}
          onChangeText={setDescripcion}
          style={{ marginTop: 50 }}
        />
        <TextInput
          label="Porciones"
          mode="outlined"
          placeholder="4"
          keyboardType='decimal-pad'
          value={porciones}
          onChangeText={setPorciones}
          left={<TextInput.Icon icon="account-outline" />}
        />
        <TextInput
          label="Tiempo de preparacion (Minutos)"
          mode="outlined"
          placeholder="45"
          keyboardType='decimal-pad'
          value={tiempo_coccion}
          onChangeText={setTiempo_Coccion}
          left={<TextInput.Icon icon="clock-outline" />}
        />
        <SingleDropdown
          label="Categoría"
          mode="outlined"
          list={categorias ?? []}
          value={categoria}
          setValue={setCategoria}
        />
        <TagInput
          label="Etiquetas"
          mode="outlined"
          tags={etiquetas ?? []}
          onTagsChange={handleEtiquetasChange}
        />
        <IngredientesInput
          mode="outlined"
          ingredientes={ingredientes ?? []}
          onIngredientesChange={handleIngredientesChange}
        />
        <Button
          style={{ marginTop: 10 }}
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
