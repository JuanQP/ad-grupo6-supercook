import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

interface Props {
  label: string;
  mode: "date" | "time";
  value?: Date;
  style: StyleProp<TextStyle>;
  placeholder: string;
  onChangeDate: (date: Date | undefined) => void;
}

function FechaPicker({
  label, mode, value, style, placeholder, onChangeDate,
}: Props) {

  const { colors } = useTheme();

  function handleCalendarClick() {
    DateTimePickerAndroid.open({
      mode,
      onChange: (_, date) => {
        onChangeDate(date);
      },
      value: value ?? new Date(),
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
          icon="calendar"
          color={colors.primary}
          onPress={handleCalendarClick}
        />
      )}
    />
  );
}

export default FechaPicker;
