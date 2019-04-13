import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import rootReducer from './reducers';
import Records from './components/content/Records';
import Summaries from './components/content/Summaries';
import Registration from './components/visitor/Registration';
import Attendance from './router/App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './assets/css/common.css';

const browserHistory = createBrowserHistory();
const store = createStore(() => {});

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Switch>
                <Route path="/vistor" component={Registration}></Route>
                <Attendance path="/attendance" component={Attendance}>
                    <Route path="/attendance/records" component={Records}></Route>
                    <Route path="/attendance/summaries" component={Summaries}></Route>
                </Attendance>
                <Route path="/" component={Registration}></Route>
            </Switch>
        </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
