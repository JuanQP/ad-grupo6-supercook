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
  email: yup.string().email().required(),
});
const initialValues = {
  email: '',
};

export default function Recupero1Screen({ navigation }) {
  const { mutate, isLoading } = useMutation(userApi.recuperarPassword, {
    onSuccess: (data) => {
      navigation.navigate('Recupero2', { email: data.email });
    },
    onError: (error) => {
      Alert.alert('😞', error.response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values) {
    mutate(values);
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Se enviará el código de verificación al siguiente e-mail
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
              mode="outlined"
              style={styles.textInput}
              label="E-mail"
              keyboardType="email-address"
              textContentType="emailAddress"
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              value={values.email}
              onChangeText={handleChange('email')}
              onSubmitEditing={handleSubmit}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid || isLoading}
            >
              Obtener código
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
