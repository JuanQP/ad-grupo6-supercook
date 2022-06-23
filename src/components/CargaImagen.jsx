import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Avatar, Button } from 'react-native-paper';
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { nullImageColor } from '../styles/colors';

const PAGE_WIDTH = Dimensions.get('window').width;



function CargaImagen() {
    const { colors } = useTheme();
    const [image, setImage] = useState(null);

    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);

        }
        
    }


    return (
        <SafeAreaView>
            <View style={{ marginTop: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 260, width: PAGE_WIDTH * 0.9 }}>
                {image ?
                    <Image source={{ uri: image }} style={{ marginTop: 10, backgroundColor: colors.background, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 220, width: PAGE_WIDTH * 0.9 }} />
                    : <Avatar.Icon icon="camera" color={colors.disabled} style={{ backgroundColor: colors.background, height: 220 , width: PAGE_WIDTH * 0.9}} />}

            </View>
            <Button onPress={openGallery} style={{ marginTop: 5, backgroundColor: colors.primary }} mode="contained">
                    Subir imagen
            </Button>

        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     image: {
//         borderRadius: 10,
//         backgroundColor: nullImageColor,
//         width: PAGE_WIDTH * 0.8,
//         height: 200
//     },
//     container: {
//         paddingHorizontal: 30,
//         marginVertical: 10,
//     }
// });

export default CargaImagen;

