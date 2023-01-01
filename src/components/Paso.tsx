import React from "react";
import { View } from "react-native";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";

interface Props {
  paso: Pick<Paso, "numero_paso" | "descripcion_paso">;
  onEditPress: (numeroPaso: number) => void;
}

export default function Paso({ paso, onEditPress }: Props) {
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
        style={{backgroundColor: colors.onSurfaceDisabled, marginLeft: 'auto'}}
        size={20}
        onPress={() => onEditPress(paso.numero_paso-1)}
      />
    </View>
  )
}
