import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import rootReducer from './reducers';
import Attendance from './attendance/Attendance';
import Registration from './visitor/Registration';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();
const store = createStore(() => {});

render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/vistor" component={Registration}></Route>
                <Route path="/attendance" component={Attendance}></Route>
                <Route path="/" component={Registration}></Route>
            </Switch>
        </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
