import React, { Component } from 'react';
import NavigationBar from '../attendance/NavigationBar'
class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                {this.props.children}
            </div>
        );
    }
}

export default App;