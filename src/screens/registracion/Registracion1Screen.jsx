import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import * as userApi from '../../api/user';
import { backgroundColor } from '../../styles/colors';

const reviewSchema = yup.object({
  alias: yup.string().required(),
  email: yup.string().email().required(),
});
const initialValues = {
  alias: '',
  email: '',
};

export default function Registracion1Screen({ navigation }) {
  const [aliasDisponible, setAliasDisponible] = useState(true);
  const [emailDisponible, setEmailDisponible] = useState(true);
  const [emailEnviado, setEmailEnviado] = useState('');
  const [aliasEnviado, setAliasEnviado] = useState('');
  const aliasTextInput = useRef();
  const { mutate, isLoading } = useMutation(userApi.signup, {
    onSuccess: (data) => {
      navigation.navigate('Registracion2', { email: data.email, alias: data.alias });
    },
    onError: (error) => {
      setAliasDisponible(error.response?.data?.aliasDisponible ?? true);
      setEmailDisponible(error.response?.data?.emailDisponible ?? true);
      Alert.alert('😞', error.response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values) {
    mutate(values);
    setEmailEnviado(values.email);
    setAliasEnviado(values.alias);
  }

  return (
    <View style={styles.container}>
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
              onSubmitEditing={() => aliasTextInput.current.focus()}
              blurOnSubmit={false}
            />
            <HelperText type="error" visible={!emailDisponible}>
              {emailEnviado} no está disponible
            </HelperText>
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Alias"
              textContentType="nickname"
              onBlur={handleBlur('alias')}
              error={touched.alias && errors.alias}
              value={values.alias}
              onChangeText={handleChange('alias')}
              ref={aliasTextInput}
              onSubmitEditing={handleSubmit}
            />
            <HelperText type="error" visible={!aliasDisponible}>
              El alias {aliasEnviado} no está disponible
            </HelperText>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid || isLoading}
              loading={isLoading}
            >
              Validar
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
    backgroundColor,
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
