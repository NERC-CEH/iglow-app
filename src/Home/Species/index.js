import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import {
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonPage,
  IonCol,
} from '@ionic/react';
import ModalHeader from 'Components/ModalHeader';
import { funnel } from 'ionicons/icons';
import alert from 'common/helpers/alert';
import species from 'common/data/species.data.json';
import SpeciesProfile from './components/SpeciesProfile';
import UserFeedbackRequest from './components/UserFeedbackRequest';
import './images';
import './thumbnails';
import './maps';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    appModel: PropTypes.object.isRequired,
    savedSamples: PropTypes.object.isRequired,
    onSpeciesClick: PropTypes.func,
  };

  state = { showModal: false, species: null };

  showSpeciesModal = id => {
    this.setState({ showModal: true, species: species[id - 1] });
  };

  hideSpeciesModal = () => {
    this.setState({ showModal: false });
  };

  getSpecies = () => {
    const { appModel, onSpeciesClick } = this.props;

    const isRecordingMode = !!onSpeciesClick;

    const speciesFilter = appModel.get('speciesFilter');
    const shouldFilter = speciesFilter.length && !isRecordingMode;
    const byEnabledFilters = sp =>
      shouldFilter ? speciesFilter.find(filter => sp[filter]) : true;
    const bySpeciesId = (sp1, sp2) => sp1.sort_id - sp2.sort_id;

    const filteredSpecies = [...species]
      .filter(byEnabledFilters)
      .sort(bySpeciesId);

    return isRecordingMode
      ? [...filteredSpecies, ...speciesGroups]
      : filteredSpecies;
  };

  getSpeciesGrid() {
    const { onSpeciesClick } = this.props;

    const speciesList = this.getSpecies();

    const getSpeciesElement = sp => {
      const { id, english, group, taxon = '' } = sp;

      const onClick = onSpeciesClick
        ? () => onSpeciesClick(sp)
        : () => this.showSpeciesModal(id);

      const backgroundImage = group
        ? `url('/images/${taxon.toLowerCase()}_thumbnail.png')`
        : `url('/images/lampyris-noctiluca.jpg'`;

      return (
        <IonRow
          key={id}
          className="species-list-item"
          onClick={onClick}
          size="6"
          size-lg
          class="ion-no-padding ion-no-margin">
          <div
            style={{
              backgroundImage,
            }}
          >
            <span className="label">{t(english)}</span>
          </div>
          </IonRow>
      );
    };

    const speciesColumns = speciesList.map(getSpeciesElement);

    return (
      <IonGrid class="ion-no-padding ion-no-margin">{speciesColumns}</IonGrid>
    );
  }

  getList = () => {
    const { savedSamples, onSpeciesClick } = this.props;

    const isNotRecordingMode = !onSpeciesClick;
    const samplesLength = savedSamples.length;

    return (
      <IonContent id="home-species" class="ion-padding">
        {isNotRecordingMode && (
          <UserFeedbackRequest
            samplesLength={samplesLength}
            appModel={this.props.appModel}
          />
        )}

        {this.getSpeciesGrid()}

        <IonModal isOpen={this.state.showModal} backdropDismiss={false}>
          <ModalHeader title={t('Species')} onClose={this.hideSpeciesModal} />
          {this.state.showModal && (
            <SpeciesProfile species={this.state.species} />
          )}
        </IonModal>
      </IonContent>
    );
  };

  render() {
    const { onSpeciesClick } = this.props;

    const isRecordingMode = !!onSpeciesClick;
    if (isRecordingMode) {
      return this.getList();
    }

    return (
      <IonPage>
        {this.getList()}
      </IonPage>
    );
  }
}

export default Component;
