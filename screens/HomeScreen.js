import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';

export default function HomeScreen({ navigation, route }) {

  return (
    <View style={styles.container}>
      <Paragraph style={{alignSelf: 'center'}}>Bienvenido usuario {route.params.user}!</Paragraph>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
});
