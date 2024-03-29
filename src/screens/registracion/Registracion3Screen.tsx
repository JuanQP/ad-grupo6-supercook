import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { Alert, StyleSheet, TextInput as TextInputType, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import * as userApi from '../../api/user';
import FechaPicker from '../../components/FechaPicker';
import { surface } from '../../styles/colors';
import { RootStackParamList } from '../../types/navigation';

const reviewSchema = yup.object({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  fechaNacimiento: yup.date().required(),
  telefono: yup.string().matches(/[0-9]/).min(8).max(10)
    .required(),
});
const initialValues = {
  nombre: '',
  apellido: '',
  fechaNacimiento: new Date(),
  telefono: '',
};

type SchemaType = yup.InferType<typeof reviewSchema>

type Props = NativeStackScreenProps<RootStackParamList, "Registracion3">

export default function Registracion3Screen({ navigation }: Props) {
  const apellidoTextInput = useRef<TextInputType>(null);
  const { mutate, isLoading } = useMutation(userApi.patchUser, {
    onSuccess: () => {
      navigation.navigate('Registracion4');
    },
    onError: (error) => {
      Alert.alert('😞', (error as any).response?.data?.message ?? 'Algo salió mal');
    },
  });

  function handleFormikSubmit(values: SchemaType) {
    mutate(values);
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={handleFormikSubmit}
      >
        {({
          handleChange, handleBlur, handleSubmit, setFieldValue, isValid, errors, touched, values,
        }) => (
          <>
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Nombre/s"
              textContentType="name"
              returnKeyType="next"
              onBlur={handleBlur('nombre')}
              error={!!touched.nombre && !!errors.nombre}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              onSubmitEditing={() => apellidoTextInput.current?.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Apellido/s"
              textContentType="familyName"
              returnKeyType="next"
              onBlur={handleBlur('apellido')}
              error={!!touched.apellido && !!errors.apellido}
              value={values.apellido}
              onChangeText={handleChange('apellido')}
              ref={apellidoTextInput}
            />
            <FechaPicker
              style={styles.textInput}
              label="Fecha de Nacimiento"
              value={values.fechaNacimiento}
              mode="date"
              placeholder="DD/MM/YYYY"
              onChangeDate={(date) => setFieldValue('fechaNacimiento', date)}
            />
            <TextInput
              mode="outlined"
              style={styles.textInput}
              keyboardType="phone-pad"
              label="Teléfono"
              textContentType="telephoneNumber"
              returnKeyType="send"
              maxLength={10}
              onBlur={handleBlur('telefono')}
              error={!!touched.telefono && !!errors.telefono}
              value={values.telefono}
              onChangeText={handleChange('telefono')}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={!isValid || isLoading}
            >
              Siguiente
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
