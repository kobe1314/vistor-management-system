import React, { Component } from 'react';
import Records from '../records/RecordsContainer';
import Summaries from '../summaries/Summaries';

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