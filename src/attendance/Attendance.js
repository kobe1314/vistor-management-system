import React, { Component } from 'react';
import Records from './content/Records';
import Summaries from './content/Summaries';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Records/>
                <Summaries/>
            </div>
        );
    }
}

export default Attendance;