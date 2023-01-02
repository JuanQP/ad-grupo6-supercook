import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { Alert, StyleSheet, TextInput as TextInputType, View } from 'react-native';
import {
  Button, HelperText, Paragraph, TextInput
} from 'react-native-paper';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import * as userApi from '../../api/user';
import { surface } from '../../styles/colors';
import { RootStackParamList } from '../../types/navigation';

const reviewSchema = yup.object({
  password: yup.string().required(),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required(),
});
const initialValues = {
  password: '',
  repeatPassword: '',
};

type SchemaType = yup.InferType<typeof reviewSchema>

type Props = NativeStackScreenProps<RootStackParamList, "Registracion4">

export default function Registracion4Screen({ navigation }: Props) {
  const repeatPasswordTextInput = useRef<TextInputType>(null);
  const { mutate, isLoading } = useMutation(userApi.patchUser, {
    onSuccess: () => {
      Alert.alert('✅', 'La contraseña fue actualizada. Ya podés ingresar a la app 😄');
      navigation.navigate('Login');
    },
    onError: (error) => {
      Alert.alert('😞', (error as any).response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values: SchemaType) {
    mutate({
      password: values.password,
      registrado: true,
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
              returnKeyType="next"
              onBlur={handleBlur('password')}
              error={!!touched.password && !!errors.password}
              value={values.password}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => repeatPasswordTextInput.current?.focus()}
              blurOnSubmit={false}
            />
            <View>
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Repetir contraseña"
                secureTextEntry
                textContentType="password"
                onBlur={handleBlur('repeatPassword')}
                error={!!touched.repeatPassword && !!errors.repeatPassword}
                value={values.repeatPassword}
                onChangeText={handleChange('repeatPassword')}
                ref={repeatPasswordTextInput}
                onSubmitEditing={() => handleSubmit()}
              />
              <HelperText
                type="error"
                visible={!!errors.repeatPassword}
              >
                {errors.repeatPassword}
              </HelperText>
            </View>
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
