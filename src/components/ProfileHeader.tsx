import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {
  Avatar, Button, Caption, Text, Title, useTheme
} from 'react-native-paper';
import {
  avatarPlaceholder, profileBackground, shadowColor, surface
} from '../styles/colors';

interface Props {
  user: Pick<Usuario, "img_perfil" | "nombre" | "apellido"> & { recetas: Receta[] };
  onLogOutPress: () => void;
}

function ProfileHeader({ user, onLogOutPress }: Props) {

  const { colors } = useTheme();
  return (
    <ImageBackground
      style={styles.imageBackground}
      imageStyle={{ opacity: 0.50, backgroundColor: colors.onSurface }}
      source={profileBackground}
      resizeMode="cover"
    >
      <Button mode="contained" style={{ alignSelf: 'flex-end' }} onPress={onLogOutPress}>
        Log out
      </Button>
      <Avatar.Image
        size={60}
        source={user.img_perfil === '' ? avatarPlaceholder : {
          uri: user.img_perfil
        }}
      />
      <Title style={styles.headerText}>{`${user.nombre} ${user.apellido}`}</Title>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...styles.headerText, fontWeight: 'bold' }}>{user.recetas.length}</Text>
        <Caption style={styles.headerText}>RECETAS CREADAS</Caption>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    color: surface,
    textShadowColor: shadowColor,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default ProfileHeader;
