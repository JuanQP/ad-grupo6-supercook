import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const PAGE_WIDTH = Dimensions.get('window').width;



function CargaVideoPaso() {
    const { colors } = useTheme();
    const [image, setImage] = useState<string | null>(null);

    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled && result.uri) {
            setImage(result.uri);
        }
    }


    return (
        <SafeAreaView>
            <View>
                {image ?
                    <Image source={{ uri: image }} style={{ marginTop: -21, backgroundColor: colors.background, borderRadius: 10, height: 200, width: PAGE_WIDTH * 0.43 }} />
                    : <View style={{backgroundColor: colors.background}}>
                        <IconButton icon="video" size={40} onPress={openGallery}></IconButton>
                      </View>}

            </View>

        </SafeAreaView>
    );
}

export default CargaVideoPaso;
