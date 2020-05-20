import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import { person, helpCircle, add, menu, home, map } from 'ionicons/icons';
import savedSamples from 'saved_samples';
import appModel from 'app_model';
import defaultSurvey from 'common/config/surveys/default';
import Sample from 'sample';
import Occurrence from 'occurrence';
import SurveysList from './List';
import SurveysMap from './Map';
import Help from './Help';
import Species from './Species';
import './styles.scss';

// const activity = this.props.appModel.getAttrLock('smp', 'activity');

// const training = this.props.appModel.attrs.useTraining;
// const activityTitle = activity ? activity.title : null;

async function createNewSampleWithPhoto(...args) {
  const sample = await defaultSurvey.createWithPhoto(
    Sample,
    Occurrence,
    ...args
  );
  await sample.save();
  // add to main collection
  savedSamples.push(sample);
}

class Component extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  constructor() {
    super();
  }

  render() {
    const activitiesOn = !!appModel.getAttrLock('smp', 'activity');
    const { useExperiments } = appModel.attrs;

    return (
      <>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              path="/home/surveys"
              render={props => (
                <SurveysList
                  appModel={appModel} savedSamples={savedSamples}
                  {...props}
                />
              )}
              exact
            />
            <Route
              path="/home/species"
              render={props => (
                <Species
                appModel={appModel} savedSamples={savedSamples} 
                {...props}
                />
              )}
              exact
            />
            <Route
              path="/home/map"
              render={props => (
                <SurveysMap
                  appModel={appModel}
                  savedSamples={savedSamples}
                  {...props}
                />
              )}
              exact
            />
            <Route path="/home/help" component={Help} exact />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home/surveys" href="/home/surveys">
              <IonIcon icon={home} />
              <IonLabel>{t('Records')}</IonLabel>
            </IonTabButton>

            <IonTabButton tab="home/species" href="/home/species">
              <IonIcon icon={person} />
              <IonLabel>{t('Species')}</IonLabel>
            </IonTabButton>

            <IonTabButton tab="record" class="add-record" href="/survey/default/new">
                <IonIcon icon={add} />
            </IonTabButton>

            {useExperiments ? (
              <IonTabButton tab="map" href="/home/map">
                <IonIcon icon={map} />
                <IonLabel>{t('Map')}</IonLabel>
              </IonTabButton>
            ) : (
              <IonTabButton tab="help" href="/home/help">
                <IonIcon icon={helpCircle} />
                <IonLabel>{t('Help')}</IonLabel>
             </IonTabButton>
            )}

            <IonTabButton tab="menu" href="/info/menu">
              <IonIcon icon={menu} />
              <IonLabel>{t('Menu')}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </>
    );
  }
}

export default Component;
