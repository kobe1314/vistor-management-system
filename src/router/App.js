import React, { Component } from 'react';
import NavigationBar from '../components/navigationBar/NavigationBar';
import Header from '../components/header/Header';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="page">
                <div className="page-header">
                    <Header/>
                </div>
                <div className="page-main">
                    <div className="page-main-left">
                        <NavigationBar/>
                    </div>
                    <div className="page-main-right">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;