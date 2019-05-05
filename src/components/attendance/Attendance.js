import React, { Component } from 'react';
import Records from '../records/RecordsContainer';
import Summaries from '../summaries/SummariesContainer';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount() {
        this.props.fetchDepartmentInfo();
    }

    render() {
        console.log('Attendance',this.props);
        return (
            <div>
                <Records/>
                <Summaries/>
            </div>
        );
    }
}

export default Attendance;