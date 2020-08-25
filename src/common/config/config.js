/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */
import Indicia from 'indicia';
import DateHelp from 'helpers/date';

const HOST =
  process.env.APP_INDICIA_API_HOST || 'https://www.brc.ac.uk/irecord/';

const CONFIG = {
  // variables replaced on build
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,
  name: process.env.APP_NAME,

  environment: __ENV__,
  experiments: process.env.APP_EXPERIMENTS,
  training: process.env.APP_TRAINING,

  gps_accuracy_limit: 100,

  site_url: HOST,

  // use prod logging if testing otherwise full log
  log: !__TEST__,

  // error analytics
  sentry: {
    key: !__TEST__ && process.env.APP_SENTRY_KEY,
    project: '5312704',
  },

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER + Indicia.API_REPORTS_PATH}`,
    timeout: 80000,
  },

  // mapping
  map: {
    os_api_key: process.env.APP_OS_MAP_KEY,
    mapbox_api_key: process.env.APP_MAPBOX_MAP_KEY,
    mapbox_osm_id: 'cehapps.0fenl1fe',
    mapbox_satellite_id: 'cehapps.0femh3mh',
  },

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: process.env.APP_INDICIA_API_KEY,
    website_id: 23,
    id: 580,
    webForm: 'enter-app-record',
    attrs: {
      smp: {
        location: {
          values(location) {
            return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
              location.longitude
            ).toFixed(7)}`;
          },
        },
        location_accuracy: { id: 282 },
        location_altitude: { id: 283 },
        location_altitude_accuracy: { id: 284 },
        location_source: { id: 760 },
        location_gridref: { id: 335 },

        access: {
          label: 'Is location publicly?',
          type: 'radio',
          info: 'Is the location publicly accessible?',
          id: 727,
          values: {
            Yes: 5790,
            No: 5791,
            Partly: 5793,
            'Don\'t know': 5794,
          },
        },

        device: {
          id: 273,
          values: {
            iOS: 2398,
            Android: 2399,
          },
        },
        device_version: { id: 759 },
        app_version: { id: 1139 },

        date: {
          label: 'Date',
          values(date) {
            return DateHelp.print(date);
          },
          isValid: val => val && val.toString() !== 'Invalid Date',
          type: 'date',
          max: () => new Date(),
        },

        time: {
          label: 'Time',
          id: 34,
          type: 'time',
        },

        condition: {
          label: 'Conditions',
          type: 'radio',
          info: 'Please specify the weather condition.',
          id: 631,
          values: {
            Dry: 5281,
            Raining: 5282,
            'Wet ground': 5283,
            Windy: 5284,
          },
        },

        temprature: {
          label: 'Temprature (Celcius):',
          id: 2,
          type: 'number',
        },

        site: {
          label: 'Type of site',
          type: 'checkbox',
          info: 'Please specify the type.',
          id: 624,
          values: {
            'Nature Reserve': 5219,
            Garden: 5220,
            Roadside: 5221,
            'Railway used or dismantled': 5222,
            Waterside: 5223,
            'Sea cliff': 5224,
            Quarry: 5225,
            Grassland: 5226,
            Woodland: 5227,
            Other: 5789,
          },
        },

        chemical: {
          label: 'Aware of any chemicals?',
          type: 'checkbox',
          info: 'Are you aware of any chemicals used on the land?',
          id: 627,
          values: {
            'Definitely not': 5242,
            'Yes: weedkillers': 5243,
            'Yes: insecticides': 5244,
            'Yes: slug pellets': 5245,
            'Don\'t know': 5246,
          },
        },

        grazed: {
          label: 'Is the area grazed?',
          type: 'checkbox',
          info: 'Please specify the grazed area.',
          id: 626,
          values: {
            No: 5247,
            Sheep: 5248,
            Cattle: 5249,
            Horses: 5250,
            Rabbits: 5251,
            Deer: 5252,
            'Something else': 5253,
          },
        },

        lights: {
          label: 'Is there any lighting visible?',
          type: 'checkbox',
          info: 'Please specify the artificial lights.',
          id: 628,
          values: {
            None: 5254,
            'Distant lights: over 200m': 5255,
            'Distant lights: 50-200m': 5257,
            'Bright lights nearby': 5258,
            'House lights': 5259,
            'Lights from passing traffic': 5260,
          },
        },
      },

      occ: {
        training: {
          id: 'training',
        },
        taxon: {
          values() {
            return 125837; // Lampyris noctiluca
          },
        },

        female: {
          label: 'Females?',
          id: 509,
          type: 'number',
        },

        male: {
          label: 'Males?',
          id: 510,
          type: 'number',
        },

        larvae: {
          label: 'Larvae?',
          id: 511,
          type: 'number',
        },

        'number-ranges': {
          type: 'radio',
          id: 320,
          values: {
            1: 3808,
            '2-5': 3809,
            '6-9': 38010,
            '10-19': 3811,
            '20-49': 3812,
            '50+': 3813,
          },
        },

        certainty: {
          label: 'Certainty',
          type: 'radio',
          info: 'Please specifiy the identification.',
          id: 395,
          values: {
            Certain: 859,
            Likely: 860,
            Uncertain: 861,
          },
        },

        position: {
          label: 'Position of glow worms',
          type: 'checkbox',
          info: 'Please specify the position.',
          id: 429,
          values: {
            'Short grass': 5228,
            'Long grass': 5229,
            'Under tree': 5230,
            'In hedge': 5231,
            'On path': 5232,
            'On gravel or stones': 5233,
            Other: 5234,
          },
        },

        comment: {
          label: 'Anything else?',
          type: 'textarea',
        },
      },
    },
  },
};

export default CONFIG;