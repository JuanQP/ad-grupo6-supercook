import React from 'react';
import { View } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';

function RecetaEnviadaScreen({ navigation }) {

  function handleHomePress() {
    navigation.popToTop();
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Title>SuperCook</Title>
        <Text style={{paddingHorizontal: 40, textAlign: 'center'}}>
          Tu receta va a ser validada. Cuando finalicemos te avisamos!!!
        </Text>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end', marginBottom: 10}}>
        <Button
          mode="contained"
          onPress={handleHomePress}
        >
          Volver al home
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default RecetaEnviadaScreen;
