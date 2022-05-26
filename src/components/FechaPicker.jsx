import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';

function FechaPicker({
  label, mode, value, style, placeholder, onChangeDate,
}) {
  const { colors } = useTheme();
  function handleCalendarClick() {
    DateTimePickerAndroid.open({
      mode,
      onChange: (event, date) => {
        onChangeDate(date);
      },
      value,
      maximumDate: new Date(),
    });
  }

  return (
    <TextInput
      mode="outlined"
      style={style}
      label={label}
      editable={false}
      placeholder={placeholder}
      value={value?.toDateString() || ''}
      left={(
        <TextInput.Icon
          name="calendar"
          color={colors.primary}
          onPress={handleCalendarClick}
        />
      )}
    />
  );
}

export default FechaPicker;
