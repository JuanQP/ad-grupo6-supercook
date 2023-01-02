import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  IconButton, Modal, Portal, Text, TextInput, Title, useTheme
} from 'react-native-paper';
import * as yup from 'yup';
import { modalStyle, transparentColor } from '../styles/colors';

const reviewSchema = yup.object({
  sobre_mi: yup.string().max(200).required(),
});

export type UsuarioData = Pick<Usuario, "sobre_mi">
type FormikActions = FormikHelpers<{sobre_mi: string}>

interface Props {
  user: UsuarioData;
  loading: boolean;
  onSubmit: (values: UsuarioData, actions: FormikActions) => void;
  onPressRecetasGuardadas: () => void;
}

function ProfileDetails({ user, loading, onSubmit, onPressRecetasGuardadas }: Props) {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const initialValues = {
    sobre_mi: user.sobre_mi,
  };

  function handleFormikSubmit(values: UsuarioData, actions: FormikActions) {
    hideModal();
    onSubmit(values, actions);
  }

  return (
    <View style={{ flex: 1 }}>
    <Button mode="contained" style= {{marginTop: 20, marginBottom: 10}} onPress={onPressRecetasGuardadas}>
      Mis recetas guardadas
    </Button>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Sobre Mí</Text>
        <IconButton iconColor={colors.backdrop} icon="pencil-circle" onPress={showModal} />
        <ActivityIndicator animating={loading} />
      </View>
      <Text style={{ color: colors.primary }}>{user.sobre_mi}</Text>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle}
        >
          <View>
            <View>
              <Title>Sobre mi</Title>
              <Caption>Escribinos algo sobre vos</Caption>
            </View>
            <View>
              <Formik
                initialValues={initialValues}
                validationSchema={reviewSchema}
                onSubmit={handleFormikSubmit}
                enableReinitialize
              >
                {({
                  handleChange, handleBlur, handleSubmit, isValid, errors, touched, values,
                }) => (
                  <>
                    <View>
                      <TextInput
                        label=""
                        onBlur={handleBlur('sobre_mi')}
                        error={!!touched.sobre_mi && !!errors.sobre_mi}
                        value={values.sobre_mi}
                        onChangeText={handleChange('sobre_mi')}
                        style={{ backgroundColor: transparentColor }}
                      />
                      <Caption style={{ alignSelf: 'flex-end' }}>
                        {`${values.sobre_mi.length}/200`}
                      </Caption>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Button
                        mode="outlined"
                        onPress={hideModal}
                      >
                        Cancelar
                      </Button>
                      <Button
                        mode="contained"
                        disabled={!isValid}
                        onPress={() => handleSubmit()}
                      >
                        Guardar
                      </Button>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

export default ProfileDetails;
