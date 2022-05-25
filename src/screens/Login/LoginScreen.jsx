import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {
  Alert, ScrollView, StyleSheet, View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { surface } from '../../styles/colors';
import * as apiService from '../../helpers/api';

const reviewSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const initialValues = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const [recordarme, setRecordarme] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFormikSubmit(values, actions) {
    setLoading(true);
    try {
      const user = await apiService.login(values);
      navigation.navigate('Home', user);
    } catch (error) {
      Alert.alert('😞', error.response?.data?.errors?.[0] ?? 'Algo salió mal');
    } finally {
      actions.setFieldValue('password', '');
      setLoading(false);
    }
  }

  function onRecordarmeCheckboxClick() {
    setRecordarme(!recordarme);
  }

  function onRegistrateButtonClick() {
    navigation.navigate('Registracion1');
  }

  function onRecuperoButtonClick() {
    navigation.navigate('Recupero1');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.formView}>
        <Text style={{ fontSize: 18, marginBottom: 18 }}>
          Supercook 🍕
        </Text>
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
                mode="flat"
                label="Email"
                style={styles.textInput}
                textContentType="emailAddress"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <TextInput
                mode="flat"
                label="Contraseña"
                style={styles.textInput}
                secureTextEntry
                textContentType="password"
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                value={values.password}
                onChangeText={handleChange('password')}
              />
              {/* Checkbox */}
              <View style={styles.checkbox}>
                <Checkbox
                  status={recordarme ? 'checked' : 'unchecked'}
                  onPress={onRecordarmeCheckboxClick}
                />
                <Text style={{ fontWeight: 'bold' }}>Recordarme</Text>
              </View>
              <View style={{ flexDirection: 'column', alignSelf: 'stretch' }}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={{ marginTop: 20, alignSelf: 'stretch' }}
                  disabled={!isValid || loading}
                  loading={loading}
                >
                  Login
                </Button>
              </View>
            </>
          )}
        </Formik>
        <View style={styles.registerView}>
          <Button
            mode="text"
            onPress={onRecuperoButtonClick}
            style={{ marginTop: 20, alignSelf: 'flex-end' }}
            uppercase={false}
            color={colors.text}
            compact
          >
            Olvidaste tu contraseña?
          </Button>
          <Button
            mode="text"
            onPress={onRegistrateButtonClick}
            uppercase={false}
            color={colors.text}
            compact
          >
            No tenés una cuenta? Registrate
          </Button>
        </View>
      </View>
      <StatusBar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    surface,
  },
  formView: {
    flex: 1,
    padding: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  registerView: {
    flexDirection: 'column',
    marginTop: 20,
  },
  textInput: {
    marginVertical: 5,
    width: '100%',
  },
});
