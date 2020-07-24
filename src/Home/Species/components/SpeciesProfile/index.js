import React from 'react';
import {
  IonContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonLifeCycleContext,
} from '@ionic/react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import MapBackground from '-!react-svg-loader!../../maps/background.svg'; //eslint-disable-line
import './styles.scss';
import { Map } from 'react-leaflet';
import L from 'leaflet';

const habitats = [
  'aquatic',
  'river',
  'tree',
  'underground',
  'forest',
  'shrubs',
  'alpine',
  'prairies',
  'farmlands',
];

const SPECIES_BASE_URL = 'https://www.firefliesandglow-worms.co.uk/species';

class Component extends React.Component {
  static contextType = IonLifeCycleContext;

  constructor(props) {
    super(props);

    this.map = React.createRef();
    this.speciesMap = React.createRef();
  }

  componentDidMount() {
    const map = this.map.current.leafletElement;
    map.invalidateSize();

    const svgElementBounds = [
      [0, 0],
      [300, 400],
    ];
    L.svgOverlay(this.speciesMap.current, svgElementBounds).addTo(map);
    map.fitBounds([
      [50, -200],
      [350, 200],
    ]);
    map.setMaxBounds([
      [50, -250],
      [350, 250],
    ]);
  }

  render() {
    const { species } = this.props;

    //const { mammalnet_website_path: webPath } = species;

    const url = `${SPECIES_BASE_URL}`;

    const habitatsString = habitats
      .filter(habitat => species[habitat])
      .map(habitat => habitat)
      .join(', ');

    return (
      <IonContent id="species-profile" class="ion-padding">
        <img src={`/images/lampyris-noctiluca.jpg`} alt="species" />

        <IonCardHeader>
          <IonCardTitle>{species.english}</IonCardTitle>
          <IonCardSubtitle>{species.taxon}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <h3 className="species-label">Description:</h3>
          {species.description}
        </IonCardContent>

        {habitatsString && (
          <IonCardContent className="species-habitats">
            <h3 className="species-label">Habitats:</h3>
            {habitatsString}
          </IonCardContent>
        )}

        <IonCardContent className="external-link">
          <h3 className="species-label">
            Glow-worm <a href={url}>Website</a>
          </h3>
        </IonCardContent>

        <IonCardContent>
          <h3 className="species-label">Distribution:</h3>
          <div style={{ display: 'none' }}>
            <MapBackground id="boundary" />
            <ReactSVG src={`/images/${species.taxon}.svg`} />
          </div>
          <svg
            ref={this.speciesMap}
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <use id="species-map-boundary" href="#boundary" />
            <use id="species-map-data" href="#map2svg" />
          </svg>
        </IonCardContent>

        <Map id="species-map" ref={this.map} crs={L.CRS.Simple} />
      </IonContent>
    );
  }
}

Component.propTypes = {
  species: PropTypes.object.isRequired,
};

export default Component;
