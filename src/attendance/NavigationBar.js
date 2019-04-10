import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../visitor/css/navigatinoBar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <NavLink className="tab-btn" to="/attendance/records">考情记录</NavLink>
                <NavLink className="tab-btn" to="/attendance/summaries">考情汇总</NavLink>
            </div>
        );
    }
}

export default NavigationBar;