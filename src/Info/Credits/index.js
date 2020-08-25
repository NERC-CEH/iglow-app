import React from 'react';
import { IonContent, IonList, IonItem, IonLabel, IonPage } from '@ionic/react';
import AppHeader from 'Components/Header';
import species from 'common/data/species.data.json';
import './styles.scss';

export default () => {
  return (
    <IonPage>
      <AppHeader title='Credits' />
      <IonContent id="credits" class="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              This App was produced through iRecord and funded by ______ .
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Maps produced © _________________ .
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              Icons made by
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>
              from
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonItem lines="inset">
            <IonLabel>
              <b>
                We are very grateful for all the people that helped to create this app:
              </b>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>John Day</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Biren Rathod</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel>
              <b>Photo credits:</b>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Welcome screen : Kip Loades</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Home screen : Julian Hodson</IonLabel>
          </IonItem>
          {/* <IonItem> */}
          {species
            .filter(s => s.photoAttribution)
            .map(s => (
              <IonItem key={s.id} lines="none">
                <IonLabel>
                  <i>{`${s.taxon}: `}</i>
                  <span
                    dangerouslySetInnerHTML={{ __html: s.photoAttribution }}
                  />
                </IonLabel>
              </IonItem>
            ))}
          {/* </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};