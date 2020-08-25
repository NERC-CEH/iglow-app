import React from 'react';
import {
  IonContent,
  IonList,
  IonItemDivider,
  IonIcon,
  IonPage,
} from '@ionic/react';
import { settings, undo, person, add } from 'ionicons/icons';
import Collapse from 'Components/Collapse/index';
import './styles.scss';

export default () => (
  <IonPage>
    <IonContent id="help" class="ion-padding">
      <IonList lines="none">
        <IonItemDivider>Records</IonItemDivider>
        <Collapse title='How to start a record'>
          <p>
            To start a new record you can press the plus button
            <IonIcon icon={add} />
            in the home page footer.
            <br />
            <br />
            When finished, set for submission by pressing the Finish button in the header.
          </p>
        </Collapse>
        <Collapse title='Sync. with the website'>
          <p>
            All your saved records will be shown on your account page.
            <IonIcon icon={person} />
            <br />
            <br />
            <a href="https://www.brc.ac.uk/irecord">
              https://www.brc.ac.uk/irecord
            </a>
            <br />
            <br />By default a record is in a &aposdraft&apos mode which will not be sent to the database until the &aposFinish&apos button in the header is clicked. The application will try to submit your record once there is a good network connection.
            <br />
            <br />
            <b>Note:</b>you have to be signed in to your website account and have a network connection, for the records to be automatically synchronised in the background.
            <br />
          </p>
        </Collapse>
        <Collapse title='Delete a record'>
          <p>
            To delete a record, swipe it left in your account page and click the delete button.
          </p>
        </Collapse>
        <IonItemDivider>User</IonItemDivider>
        <Collapse title='Sign in/out or register'>
          <p>
            To login, open the main menu page click Login or Register buttons and follow the instructions.
            <br />
            <br />To logout, visit the main menu page and click the logout button.
            <br />
            <br />
            <b>Note:</b>after registering a new account you must verify your email address by clicking on a verification link sent to your email
          </p>
        </Collapse>
        <IonItemDivider>Other</IonItemDivider>
        <Collapse title='Reset the application'>
          <p>
            Go to the application settings page
            <IonIcon icon={settings} /> and click on the Reset
            <IonIcon icon={undo} />
            button.
          </p>
        </Collapse>
      </IonList>
    </IonContent>
  </IonPage>
);