import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  IconButton, Modal, Portal, Text, TextInput, Title, useTheme,
} from 'react-native-paper';
import * as yup from 'yup';
import { modalStyle, transparentColor } from '../styles/colors';

const reviewSchema = yup.object({
  descripcion: yup.string().max(200).required(),
});

function ProfileDetails({ user, loading, onSubmit }) {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const initialValues = {
    descripcion: user.descripcion,
  };

  function handleFormikSubmit(values, actions) {
    hideModal();
    onSubmit(values, actions);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Sobre Mí</Text>
        <IconButton color={colors.backdrop} icon="pencil-circle" onPress={showModal} />
        <ActivityIndicator animating={loading} />
      </View>
      <Text style={{ color: colors.primary }}>{user.descripcion}</Text>
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
                        onBlur={handleBlur('descripcion')}
                        error={touched.descripcion && errors.descripcion}
                        value={values.descripcion}
                        onChangeText={handleChange('descripcion')}
                        style={{ backgroundColor: transparentColor }}
                      />
                      <Caption style={{ alignSelf: 'flex-end' }}>
                        {`${values.descripcion.length}/200`}
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
                        onPress={handleSubmit}
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
