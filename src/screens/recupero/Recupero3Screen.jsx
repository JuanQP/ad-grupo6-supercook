import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button, HelperText, Paragraph, TextInput,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { surface } from '../../styles/colors';
import * as userApi from '../../api/user';

const reviewSchema = yup.object({
  password: yup.string().length(6).required(),
  repeatPassword: yup.string().length(6).oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required(),
});
const initialValues = {
  codigo: '',
};

export default function Recupero3Screen({ navigation, route }) {
  const { mutate, isLoading } = useMutation(userApi.cambioPassword, {
    onSuccess: () => {
      navigation.navigate('Recupero4', {
        email: route.params.email,
      });
    },
    onError: (error) => {
      Alert.alert('😞', error.response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values) {
    mutate({
      email: route.params.email,
      password: values.password,
    });
  }

  return (
    <View style={styles.container}>
      <Paragraph>Ingrese la nueva contraseña</Paragraph>
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
              label="Nueva contraseña"
              secureTextEntry
              textContentType="newPassword"
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <View>
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Repetir contraseña"
                secureTextEntry
                textContentType="password"
                onBlur={handleBlur('repeatPassword')}
                error={touched.repeatPassword && errors.repeatPassword}
                value={values.repeatPassword}
                onChangeText={handleChange('repeatPassword')}
              />
              <HelperText
                type="error"
                visible={errors.repeatPassword}
              >
                {errors.repeatPassword}
              </HelperText>
            </View>
            <Button
              style={styles.button}
              mode="contained"
              disabled={!isValid || isLoading}
              onPress={handleSubmit}
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
