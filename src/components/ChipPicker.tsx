import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

interface Props<T extends { id: number }> {
  items: T[];
  labelKey: keyof T;
  selectedItems: T [];
  onChange: (items: T[]) => void;
}

function ChipPicker<T extends { id: number }>({
  items, selectedItems, labelKey, onChange,
}: Props<T>) {
  function handleItemPress(pressedItem: T) {
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
          {String(i[labelKey])}
        </Chip>
      ))}
    </View>
  );
}

export default ChipPicker;
