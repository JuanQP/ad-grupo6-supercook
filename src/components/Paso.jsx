import React from "react";
import { View } from "react-native";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";

export default function Paso({ paso, onEditPress }) {
  const { colors } = useTheme();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <Badge>{paso.numero_paso}</Badge>
      </View>
      <View style={{marginLeft: 10, flexShrink: 1}}>
        <Text>
          {paso.descripcion_paso}
        </Text>
      </View>
      <IconButton
        icon="pencil"
        style={{backgroundColor: colors.disabled, marginLeft: 'auto'}}
        size={20}
        onPress={() => onEditPress(paso.numero_paso-1)}
      />
    </View>
  )
}
