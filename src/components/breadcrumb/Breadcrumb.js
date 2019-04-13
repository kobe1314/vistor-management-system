import React, { Component } from 'react';
import './Breadcrumb.css';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            props:this.props
        };
    }
    render() {
        return (
            <div className="breadcrumb">
                <strong>考勤记录</strong>
            </div>
        );
    }
}

export default Breadcrumb;