import React from "react";
import { View } from "react-native";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";

export default function Paso({ index, paso, onEditPress }) {
  const { colors } = useTheme();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <Badge>{index+1}</Badge>
      </View>
      <View style={{marginLeft: 10, flexShrink: 1}}>
        <Text>
          {paso.descripcion}
        </Text>
      </View>
      <IconButton
        icon="pencil"
        style={{backgroundColor: colors.disabled, marginLeft: 'auto'}}
        size={20}
        onPress={() => onEditPress(index)}
      />
    </View>
  )
}
