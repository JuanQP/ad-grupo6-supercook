import React, { useState } from 'react';
import { View } from "react-native";
import { Caption, Chip, TextInput, useTheme } from 'react-native-paper';

function TagInput({ label, mode, tags, onTagsChange }) {
  const { colors } = useTheme();
  const [etiqueta, setEtiqueta] = useState('');

  function handleSubmit() {
    if(etiqueta === '') return;
    onTagsChange([...tags, etiqueta]);
    setEtiqueta('');
  }

  function handleRemove(index) {
    onTagsChange(tags.filter((_, i) => i !== index));
  }

  return (
    <View>
      <TextInput
        label={label}
        mode={mode}
        value={etiqueta}
        placeholder="Ingresar etiqueta y presionar ENTER para agregar"
        blurOnSubmit={false}
        onSubmitEditing={handleSubmit}
        onChangeText={setEtiqueta}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
        {tags.length === 0 ?
          (
            <View style={{borderRadius: 4, borderWidth: 1, borderColor: colors.disabled, width: '100%', alignItems: 'center'}}>
              <Caption>
                Acá van aparecer las etiquetas que agregues...
              </Caption>
            </View>
          ) : (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {tags.map((tag, i) => (
                <Chip
                  key={i}
                  mode="outlined"
                  style={{ margin: 1 }}
                  onClose={() => handleRemove(i)}
                >
                  {tag}
                </Chip>
              ))}
            </View>
          )}
      </View>
    </View>
  )
}

export default TagInput;
