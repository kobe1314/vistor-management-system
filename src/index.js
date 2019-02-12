import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './components/App.js';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();
const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/' component={App}></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();