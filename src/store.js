import { createStore, applyMiddleware,compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
// import Perf from 'react-addons-perf';

const sagaMiddleware=createSagaMiddleware();
const win = window;
// win.Perf = Perf;


const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(require('redux-immutable-state-invariant')());
    // middlewares.push(require('redux-immutable-state-invariant').default())
}
middlewares.push(sagaMiddleware);

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension(): (f) => f )
const store = createStore(rootReducer,{},storeEnhancers);

sagaMiddleware.run(rootSaga);

export { store };