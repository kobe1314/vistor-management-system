import React, { Component } from 'react';
import Header from './Header';
import Records from './Records';
import Summaries from './Summaries';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Header/>
                <Records/>
                <Summaries/>
            </div>
        );
    }
}

export default Attendance;