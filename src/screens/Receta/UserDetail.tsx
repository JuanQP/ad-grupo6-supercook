import React from "react";
import { View } from "react-native";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import {
  avatarPlaceholder
} from '../../styles/colors';

interface Props {
  user: Pick<Usuario, "img_perfil" | "nombre" | "apellido">
}

function UserDetail({ user }: Props) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <Avatar.Image
        size={48}
        source={user.img_perfil === '' ? avatarPlaceholder : {
          uri: user.img_perfil
        }}
      />
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon="account"
            size={20}
            iconColor={colors.onSurfaceDisabled}
            style={{padding: 0, margin: 0}}
          />
          <Text>{`${user.nombre} ${user.apellido}`}</Text>
        </View>
      </View>
    </View>
  )
}

export default UserDetail;
