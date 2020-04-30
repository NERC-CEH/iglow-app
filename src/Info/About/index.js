import React from 'react';
import {
  IonContent,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonPage,
} from '@ionic/react';
import AppHeader from 'Components/Header';
import './styles.scss';

const Component = () => (
  <IonPage>
    <AppHeader title={t('About')} />
    <IonContent id="about" class="ion-padding">
      <IonList lines="none">
        <IonItem>
          <IonLabel>
            {t(
              `The iGlow App is designed to encourage recording of firefly or glow-worm in the wild. It is set up to easily record glow-worm. Sightings can be recorded from other countries across Europe, but currently the species list is limited to larger glowworm found in UK.`
            )}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            {t(
              `Sightings can be recorded anywhere, with or without photos, and all records will be verified by experts and made available to help with mapping the distribution of gloworm. You can check and update your records online.`
            )}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            {t(
              `iGlow is designed to make glowworm recording easy.`
            )}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            {t(
              `Users must first register, and can then log into a web site to view and correct records.`
            )}
            <br />
            <br />
            <a href="https://www.brc.ac.uk/irecord/">
              https://www.brc.ac.uk/irecord
            </a>
          </IonLabel>
        </IonItem>
        <IonListHeader color="light" mode="ios">
          <IonLabel>{t('App Development')}</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel>
            {t('This app was developed by')}
            <a href="https://www.ceh.ac.uk" style={{ whiteSpace: 'nowrap' }}>
              {' '}
              UKCEH
            </a>{' '}
            {t('For suggestions and feedback please do not hesitate to')}{' '}
            <a href="mailto:brc0ceh.ac.uk?subject=iGlow%20App">
              {t('contact us')}
            </a>
            .
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
);

Component.propTypes = {};

export default Component;
