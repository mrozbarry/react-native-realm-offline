import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { selectFromState } from '../../router';

const middleware = createReactNavigationReduxMiddleware(
  state => selectFromState(state)
);

export default middleware;
