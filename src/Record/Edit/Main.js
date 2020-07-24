import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IonList, IonListHeader, IonItem, IonIcon, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import { map, calendar, clipboard, clock, sunny, thermometer, pin, flask, flower, flashlight} from 'ionicons/icons';
import { observer } from 'mobx-react';
import dateHelp from 'helpers/date';
import './styles.scss';
import './footprint.svg';
import './larvae.svg';
import './male.svg';
import './woman.svg';

const { print: prettyDate } = dateHelp;

@observer
class Record extends Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  render() {
    const { sample } = this.props;
    const occ = sample.occurrences.at(0);
    const { location, date, time, condition, temprature, site, chemical, grazed, lights } = sample.attributes;
    const { taxon, female, male, larvae, certainity, position, comment } = occ.attributes;
    const species = taxon.english && t(taxon.english);

    const isGPSTracking = sample.isGPSRunning();
    let prettyLocation;
    if (isGPSTracking) {
      prettyLocation = (
        <span className="warn">
          Locating
          ...
        </span>
      );
    } else if (location && location.latitude) {
      const { latitude, longitude } = location || {};
      prettyLocation = (
        <span>{`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`}</span>
      );
    }
    const { source } = location || {};

    const locationAccuracy =
      isGPSTracking || source === 'gps'
        ? ''
        : sample.get('manual_location_accuracy');

    return (
      <IonContent id="record-edit">
        <IonList lines="full">
          <IonItem
            class="record-location"
            routerLink={`/record/${sample.cid}/edit/location`}
            detail
          >
            <IonIcon icon={map} slot="start" />
            <IonLabel>Location</IonLabel>
            <IonLabel slot="end">
              {prettyLocation}
              {locationAccuracy && (
                <span className="record-location-accuracy">
                  {locationAccuracy}
                </span>
              )}
            </IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/date`} detail>
            <IonIcon icon={calendar} slot="start" />
            <IonLabel>Date</IonLabel>
            <IonLabel slot="end">{prettyDate(date, true)}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/time`} detail>
            <IonIcon icon={clock} slot="start" />
            <IonLabel>Time</IonLabel>
            <IonLabel slot="end">{time}</IonLabel>
          </IonItem>
          </IonList>
          <IonList>          
          <IonItem routerLink={`/record/${sample.cid}/edit/condition`} detail>
            <IonIcon icon={sunny} slot="start" />
            <IonLabel>Conditions</IonLabel>
            <IonLabel slot="end">{condition}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/temprature`} detail>
            <IonIcon icon={thermometer} slot="start" />
            <IonLabel>Temprature (Celsius)</IonLabel>
            <IonLabel slot="end">{temprature}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/female`} detail>
            <IonIcon icon="/images/woman.svg" slot="start" />
            <IonLabel>Female?</IonLabel>
            <IonLabel slot="end">{female}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/male`} detail>
            <IonIcon icon="/images/male.svg" slot="start" />
            <IonLabel>Male?</IonLabel>
            <IonLabel slot="end">{male}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/larvae`} detail>
            <IonIcon icon="/images/larvae.svg" slot="start" />
            <IonLabel>Larvae?</IonLabel>
            <IonLabel slot="end">{larvae}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/site`} detail>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>Type of site</IonLabel>
            <IonLabel slot="end">{site}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/position`} detail>
            <IonIcon icon={flower} slot="start" />
            <IonLabel>Position of glow worms</IonLabel>
            <IonLabel slot="end">{position}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/chemical`} detail>
            <IonIcon icon={flask} slot="start" />
            <IonLabel>Any chemicals use on land?</IonLabel>
            <IonLabel slot="end">{chemical}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/grazed`} detail>
            <IonIcon src="/images/footprint.svg" slot="start" />
            <IonLabel>Is the area grazed?</IonLabel>
            <IonLabel slot="end">{grazed}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/lights`} detail>
            <IonIcon icon={flashlight} slot="start" />
            <IonLabel>Is there any atificial lights?</IonLabel>
            <IonLabel slot="end">{lights}</IonLabel>
          </IonItem>
          <IonItem routerLink={`/record/${sample.cid}/edit/comment`} detail>
            <IonIcon icon={clipboard} slot="start" />
            <IonLabel>Comment</IonLabel>
            <IonLabel slot="end">{comment}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    );
  }
}

export default Record;
