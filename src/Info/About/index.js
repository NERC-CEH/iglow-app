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
    <AppHeader title='About' />
    <IonContent id="about" class="ion-padding">
      <IonList lines="none">
        <IonItem>
          <IonLabel>            
             The iGlow App is designed to encourage recording of firefly or glow-worm in the wild.            
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            Sightings can be recorded anywhere, with or without photos, and all records will be verified by experts and made available to help with mapping the distribution. You can check and update your records online. 
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            iGlow is designed to make recording easy. 
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
              Users must first register, and can then log into a web site to view and correct records.
            <br />
            <br />
            <a href="https://www.firefliesandglow-worms.co.uk" target="_blank">
              https://www.firefliesandglow-worms.co.uk
            </a>
          </IonLabel>
        </IonItem>
        <IonListHeader color="light" mode="ios">
          <IonLabel>App Development</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel>
            {'This app was hand crafted with love by'}
            <a href="https://www.ceh.ac.uk/staff/biren-rathod" style={{ whiteSpace: 'nowrap' }}>
              {' '}
              Biren Rathod.
            </a>{' '}
            {'For suggestions and feedback please do not hesitate to'}{' '}
            <a href="mailto:brc%40ceh.ac.uk?subject=iGlow%20App">
              {'contact us'}
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
