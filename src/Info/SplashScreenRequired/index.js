import React from 'react';
import { observer } from 'mobx-react';
import { IonSlides, IonSlide, IonButton } from '@ionic/react';
import Log from 'helpers/log';
import appModel from 'app_model';
import './styles.scss';
import './images/firefly.jpg';

const SplashScreen = () => {
  function exit() {
    Log('Info:Welcome:Controller: exit.');
    appModel.set('showedWelcome', true);
    appModel.save();
  }

  return (
    <IonSlides id="welcome" pager="true">
      <IonSlide class="fourth">
        <div className="message">
          <p>To record a glow worm / firefly species anywhere in the UK.</p>
          <p>Photo: Kip Loades</p>
        </div>
        <IonButton color="primary" strong="true" onClick={exit}>Get Started</IonButton>
      </IonSlide>
    </IonSlides>
  );
};

SplashScreen.propTypes = {};

const Component = observer(props => {
  if (!appModel.get('showedWelcome')) {
    return <SplashScreen appModel={appModel} />;
  }

  return props.children;
});

Component.propTypes = {};

export default Component;
