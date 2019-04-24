import { createStackNavigator } from 'react-navigation';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import Splash from './views/splash';
import Home from './views/home';

const selectFromState = state => state.navigation;

const routes = {
  Splash,
  Home,
};

const config = {
  initialRouteKey: 'Splash',
};

const Navigator = createStackNavigator(routes, config);
const App = createReduxContainer(Navigator);

const mapNavigationToProps = state => ({ state: selectFromState(state) });

const Connected = connect(mapNavigationToProps)(App);

export default Connected;
export { Navigator, selectFromState };
