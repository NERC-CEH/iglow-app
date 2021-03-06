import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  IonIcon,
  IonContent,
  IonLifeCycleContext,
} from '@ionic/react';
import { locate } from 'ionicons/icons';
import CONFIG from 'config';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import LeafletControl from 'react-leaflet-control';
import { observer } from 'mobx-react';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.imagePath = '/images/';

const DEFAULT_POSITION = [53.7326306, -2.6546124];
const DEFAULT_ZOOM = 6;
const OS_ZOOM_DIFF = 6;
const DEFAULT_LOCATED_ZOOM = 1 + OS_ZOOM_DIFF;

@observer
class LocationAttr extends Component {
  static contextType = IonLifeCycleContext;

  static propTypes = {
    isGPSTracking: PropTypes.bool.isRequired,
    toggleGPStracking: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.selectRef = React.createRef();
  }

  componentDidMount() {
    const { location } = this.props;
    const map = this.map.current.leafletElement;

    if (location && location.latitude) {
      map.setView(
        [location.latitude, location.longitude],
        DEFAULT_LOCATED_ZOOM
      );
    } else {
      map.panTo(new L.LatLng(...DEFAULT_POSITION));
    }

    this.context.onIonViewDidEnter(() => {
      // map.whenReady(() => {
      map.invalidateSize();
      // });
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const prevLocation = prevProps.location || {};

    if (
      location &&
      location.latitude &&
      (location.latitude !== prevLocation.latitude ||
        location.longitude !== prevLocation.longitude)
    ) {
      const map = this.map.current.leafletElement;
      map.setView(
        [location.latitude, location.longitude],
        DEFAULT_LOCATED_ZOOM
      );
    }
  }

  handleClick = ({ latlng }) => {
    const { setLocation } = this.props;
    const { lat, lng } = latlng;
    setLocation([lng, lat]);
    setTimeout(() => this.selectRef.current.open(), 50); // for some reason without a delay the options aren't present the first time
  };

  render() {
    const { isGPSTracking, toggleGPStracking, location } = this.props;

    let markerPosition;
    if (location && location.latitude) {
      markerPosition = { lat: location.latitude, lon: location.longitude };
    }

    return (
      <IonContent>
        <Map ref={this.map} zoom={DEFAULT_ZOOM} onClick={this.handleClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={CONFIG.map.mapbox_api_key}
          />
          <LeafletControl position="topleft">
            <button
              className={`geolocate-btn ${isGPSTracking ? 'spin' : ''}`}
              onClick={toggleGPStracking}
            >
              <IonIcon icon={locate} mode="md" size="large" />
            </button>
          </LeafletControl>

          {markerPosition && <Marker position={markerPosition} />}
        </Map>
      </IonContent>
    );
  }
}

export default LocationAttr;