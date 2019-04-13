import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Breadcrumb.css';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            props:this.props
        };
    }
    render() {
        console.log('bread-props:', this.props);
        return (
            <div className="breadcrumb">
                <strong>{this.props.breadText}</strong>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('store changed state:', state);
    return {
        breadText:state.changeBread.breadText
    }
}

export default connect(mapStateToProps)(Breadcrumb);