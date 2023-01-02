import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import * as userApi from '../../api/user';
import { surface } from '../../styles/colors';
import { RootStackParamList } from '../../types/navigation';

const reviewSchema = yup.object({
  codigo: yup.string().length(6).required(),
});
const initialValues = {
  codigo: '',
};

type SchemaType = yup.InferType<typeof reviewSchema>

type Props = NativeStackScreenProps<RootStackParamList, "Recupero2">

export default function Recupero2Screen({ navigation, route }: Props) {
  const { mutate, isLoading } = useMutation(userApi.codigoCambioPassword, {
    onSuccess: (data) => {
      navigation.navigate('Recupero3', { email: data.email });
    },
    onError: (error) => {
      Alert.alert('😞', (error as any).response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values: SchemaType) {
    mutate({ ...values, email: route.params.email });
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Ingrese el código de 6 dígitos enviado a
        {' '}
        {route.params.email}
      </Paragraph>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={handleFormikSubmit}
      >
        {({
          handleChange, handleBlur, handleSubmit, isValid, errors, touched, values,
        }) => (
          <>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Código"
              keyboardType="number-pad"
              maxLength={6}
              onBlur={handleBlur('codigo')}
              error={!!touched.codigo && !!errors.codigo}
              value={values.codigo}
              onChangeText={handleChange('codigo')}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button
              style={styles.button}
              mode="contained"
              disabled={!isValid || isLoading}
              onPress={() => handleSubmit()}
            >
              Enviar
            </Button>
          </>
        )}
      </Formik>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    surface,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginTop: 20,
  },
  textInput: {
    marginTop: 20,
  },
});
