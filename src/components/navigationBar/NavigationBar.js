import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navigatinoBar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <ul className="navBar">
                <li className="navBar-item">
                    <NavLink className="tab-btn" to="/attendance/records"><i className="iconfont">&#xe645;</i> 考情记录</NavLink>
                </li>
                <li className="navBar-item">
                    <NavLink className="tab-btn" to="/attendance/summaries"><i className="iconfont">&#xe6dc;</i> 考情汇总</NavLink>
                </li>
            </ul>
        );
    }
}

export default NavigationBar;