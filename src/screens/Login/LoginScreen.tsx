import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Formik, FormikHelpers } from 'formik';
import React, { useRef, useState } from 'react';
import {
  Alert, Image, ScrollView, StyleSheet, TextInput as TextInputType, View
} from 'react-native';
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import * as loginApi from '../../api/login';
import { superCook, surface } from '../../styles/colors';
import { RootStackParamList } from '../../types/navigation';

const reviewSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const initialValues = {
  email: '',
  password: '',
};

type SchemaType = yup.InferType<typeof reviewSchema>

type Props = NativeStackScreenProps<RootStackParamList, "Login">

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [recordarme, setRecordarme] = useState(false);
  const passwordTextInput = useRef<TextInputType>(null);

  const { mutate, isLoading } = useMutation(loginApi.login, {
    onError: (error) => {
      Alert.alert('😞', (error as any).response?.data?.message ?? 'Algo salió mal');
    },
  });

  async function handleFormikSubmit(values: SchemaType, actions: FormikHelpers<SchemaType>) {
    actions.setFieldValue('password', '');
    mutate(values, {
      onSuccess: (data) => {
        if (!recordarme) {
          actions.setFieldValue('email', '');
        }
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        if (!data.registrado) {
          navigation.navigate('Registracion3');
        } else {
          navigation.navigate('AppNavigator');
        }
      },
    });
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
    <SafeAreaView style={{flex: 1, flexGrow: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.formView}>
          <Text style={{ fontSize: 55, marginBottom: 5, fontFamily: 'WendyOne' }}>
            SuperCook
          </Text>
          <Image source={superCook} style={{width: '25%',  height: '25%'}} />
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
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onBlur={handleBlur('email')}
                  error={!!touched.email && !!errors.email}
                  value={values.email}
                  onSubmitEditing={() => passwordTextInput.current?.focus()}
                  onChangeText={handleChange('email')}
                />
                <TextInput
                  mode="flat"
                  label="Contraseña"
                  style={styles.textInput}
                  secureTextEntry
                  textContentType="password"
                  ref={passwordTextInput}
                  onBlur={handleBlur('password')}
                  error={!!touched.password && !!errors.password}
                  value={values.password}
                  onSubmitEditing={() => handleSubmit()}
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
                    style={{ marginTop: 20, alignSelf: 'stretch' }}
                    disabled={!isValid || isLoading}
                    loading={isLoading}
                    onPress={() => handleSubmit()}
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
              color={colors.onSurface}
              compact
            >
              Olvidaste tu contraseña?
            </Button>
            <Button
              mode="text"
              onPress={onRegistrateButtonClick}
              uppercase={false}
              color={colors.onSurface}
              compact
            >
              No tenés una cuenta? Registrate
            </Button>
          </View>
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    surface,
  },
  formView: {
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
