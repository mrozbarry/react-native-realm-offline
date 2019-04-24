import createSagaMiddleware from 'redux-saga';
import saga from '../../sagas';

const middleware = createSagaMiddleware();

export default middleware;
export const runSaga = () => middleware.run(saga);
