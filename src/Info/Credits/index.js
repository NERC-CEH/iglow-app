import React from 'react';
import { IonContent, IonList, IonItem, IonLabel, IonPage } from '@ionic/react';
import AppHeader from 'Components/Header';
import appModel from 'app_model';
import species from 'common/data/species.data.json';
import './styles.scss';

export default () => {
  const { language } = appModel.attrs;
  const showKarolina = !['mk_MK', 'sr_RS'].includes(language);

  return (
    <IonPage>
      <AppHeader title={t('Credits')} />
      <IonContent id="credits" class="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              {t('This App was produced through MammalNet and funded by EFSA.')}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              {`${t('Maps produced')} © Societas Europaea Mammalogica 2019`}
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              {t(`Icons made by`)}{' '}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>{' '}
              {t('from')}{' '}
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
                {t(
                  'We are very grateful for all the people that helped to create this app:'
                )}
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
              <b>{t('Photo credits:')}</b>
            </IonLabel>
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
