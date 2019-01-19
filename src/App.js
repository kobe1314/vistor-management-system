import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Router,Link} from 'react-router';
// import { BrowserRouter, Route } from 'react-router-dom'


import Home from './components/Home';
import Product from './components/Product';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <a href='/abc'>This is Home</a><br/>
          <a href='/abc1'>This is Product</a><br/>
          <a href='/abc2'>This is About</a><br/>
          <Link to='/abc'>This is Home</Link><br/>
          <Link to='/abc1'>This is Product</Link><br/>
          <Link to='/abc2'>This is About</Link><br/>
          <Router path='/abc/' Component={Home}></Router>
          <Router path='/abc1/' Component={Product}></Router>
          <Router path='/abc2/' Component={About}></Router>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
