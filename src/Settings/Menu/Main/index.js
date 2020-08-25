import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Toggle from 'Components/Toggle';
import {
  IonContent,
  IonIcon,
  IonList,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/react';
import { undo, school, share } from 'ionicons/icons';
import alert from 'common/helpers/alert';
import config from 'config';
import './styles.scss';

function resetDialog(resetApp) {
  alert({
    header: 'Reset',
    message: 'Are you sure you want to reset the application to its initial state? <p><b> This will wipe all the locally stored app data!</b></p>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Reset',
        cssClass: 'secondary',
        handler: resetApp,
      },
    ],
  });
}

@observer
class Component extends React.Component {
  static propTypes = {
    resetApp: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    useTraining: PropTypes.bool.isRequired,
    sendAnalytics: PropTypes.bool.isRequired,
  };

  render() {
    const {
      resetApp,
      onToggle,
      useTraining,
      sendAnalytics,
    } = this.props;

    return (
      <IonContent class="app-settings">
        <IonList lines="full">
          <IonItemDivider>Application</IonItemDivider>
          <IonItem>
            <IonIcon icon={school} size="small" slot="start" />
            <IonLabel>Training Mode</IonLabel>
            <Toggle
              onToggle={checked => onToggle('useTraining', checked)}
              checked={useTraining}
            />
          </IonItem>
          <IonItem>
            <IonLabel class="ion-text-wrap">
              <IonNote color="primary">Mark any new records as &apostraining&apos and exclude from all reports.</IonNote>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={share} size="small" slot="start" />
            <IonLabel>Share App Analytics</IonLabel>
            <Toggle
              onToggle={checked => onToggle('sendAnalytics', checked)}
              checked={sendAnalytics}
            />
          </IonItem>

          <IonItem id="app-reset-btn" onClick={() => resetDialog(resetApp)}>
            <IonIcon icon={undo} size="small" slot="start" />
            {'Reset'}
          </IonItem>
        </IonList>

        <p className="app-version">{`v${config.version} (${config.build})`}</p>
      </IonContent>
    );
  }
}

export default Component;