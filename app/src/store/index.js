import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers';

import saga, { runSaga } from './middleware/saga';
import navigation from './middleware/navigation';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(saga, navigation)),
);

runSaga();

export default store;
