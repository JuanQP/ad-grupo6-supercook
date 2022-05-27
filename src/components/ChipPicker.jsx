import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

function ChipPicker({
  items, selectedItems, labelKey, onChange,
}) {
  function handleItemPress(pressedItem) {
    const wasSelectedBefore = selectedItems.some((i) => i.id === pressedItem.id);
    if (wasSelectedBefore) {
      onChange(selectedItems.filter((i) => i.id !== pressedItem.id));
      return;
    }
    onChange([
      ...selectedItems,
      pressedItem,
    ]);
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((i) => (
        <Chip
          key={i.id}
          mode="outlined"
          selected={selectedItems.some((selected) => selected.id === i.id)}
          onPress={() => handleItemPress(i)}
          style={{ margin: 1 }}
        >
          {i[labelKey]}
        </Chip>
      ))}
    </View>
  );
}

export default ChipPicker;
