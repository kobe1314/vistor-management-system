import React, { Component } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Breadcrumb />
                <div className="page-records">
                    
                </div>
            </div>
        );
    }
}

export default Records;