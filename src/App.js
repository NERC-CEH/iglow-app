import 'helpers/system_checkup';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'common/styles/app.scss';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import Menu from 'Settings/Menu';
import Home from './Home';
import Login from './User/Login';
import Register from './User/Register';
import Reset from './User/Reset';
import InfoMenu from './Info/Menu';
import About from './Info/About';
import Credits from './Info/Credits';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Record from './Record';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <Route exact path="/" render={() => <Redirect to="/home/species" />} />
      <SplashScreenRequired>
        <IonPage id="main">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/record" component={Record} />
            <IonRouterOutlet>
              <Route
                path="/user/login"
                exact
                render={() => <Login userModel={userModel} />}
              />
              <Route
                path="/user/register"
                exact
                render={() => <Register userModel={userModel} appModel={appModel} />}
              />
              <Route
                path="/user/reset"
                exact
                render={() => <Reset userModel={userModel} />}
              />
              <Route
                path="/info/menu"
                render={props => (
                  <InfoMenu
                    userModel={userModel}
                    appModel={appModel}
                    savedSamples={savedSamples}
                    {...props}
                  />
                )}
              />
              <Route path="/info/about" component={About} />
              <Route path="/info/credits" component={Credits} />
              <Route
                path="/settings/menu"
                exact
                render={() => (
                  <Menu appModel={appModel} userModel={userModel} />
                )}
              />
            </IonRouterOutlet>
          </Switch>
        </IonPage>
      </SplashScreenRequired>
    </IonReactRouter>
  </IonApp>
);

export default App;