import React from 'react';
import PropTypes from 'prop-types';
import { IonPage } from '@ionic/react';
import Log from 'helpers/log';
import Device from 'helpers/device';
import alert from 'common/helpers/alert';
import loader from 'common/helpers/loader';
import AppHeader from 'Components/Header';
import Main from './Main';

async function onLogin(userModel, details, onSuccess) {
  const { name, password } = details;
  if (!Device.isOnline()) {
    alert({
      header: 'Offline',
      message: "Sorry, looks like you're offline.",
      buttons: ['OK'],
    });
    return;
  }
  await loader.show({
    message: 'Please wait...',
  });

  const loginDetails = {
    name: name.trim(),
    password,
  };

  try {
    await userModel.logIn(loginDetails);

    onSuccess && onSuccess();
    window.history.back();
  } catch (err) {
    Log(err, 'e');
    alert({
      header: 'Sorry',
      message: err.message,
      buttons: ['OK'],
    });
  }

  loader.hide();
}

export default function LoginContainer({ userModel, onSuccess }) {
  return (
    <IonPage>
      <AppHeader title='Login' />
      <Main
        schema={userModel.loginSchema}
        onSubmit={details => onLogin(userModel, details, onSuccess)}
      />
    </IonPage>
  );
}

LoginContainer.propTypes = {
  userModel: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};
