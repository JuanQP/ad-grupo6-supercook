import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { surface } from '../../styles/colors';
import * as userApi from '../../api/user';

const reviewSchema = yup.object({
  codigo: yup.string().length(6).required(),
});
const initialValues = {
  codigo: '',
};

export default function Recupero2Screen({ navigation, route }) {
  const { mutate, isLoading } = useMutation(userApi.codigoCambioPassword, {
    onSuccess: (data) => {
      navigation.navigate('Recupero3', { email: data.email });
    },
    onError: (error) => {
      Alert.alert('😞', error.response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values) {
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
              error={touched.codigo && errors.codigo}
              value={values.codigo}
              onChangeText={handleChange('codigo')}
              onSubmitEditing={handleSubmit}
            />
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isLoading}
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
