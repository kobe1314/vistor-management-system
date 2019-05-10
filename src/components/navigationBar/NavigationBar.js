import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeBread } from '../../actions/action';
import './navigatinoBar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    clickNav = (e) => {
        this.props.changeBread(e.currentTarget.attributes.linkname.value);
        const linkArr = document.getElementsByClassName('tab-btn');
        for(let i=0; i<linkArr.length;i++){
            linkArr[i].setAttribute('active','false')
        }
        e.target.setAttribute('active','true');
    }
    render() {
        return (
            <ul className="navBar">
                <li className="navBar-item">
                    <Link className="tab-btn" active="true" to="/attendance/records" linkname="考情记录" onClick={this.clickNav}><i className="iconfont">&#xe645;</i> 考情记录</Link>
                </li>
                <li className="navBar-item">
                    <Link className="tab-btn" active="false" to="/attendance/summaries" linkname="考情汇总" onClick={this.clickNav}><i className="iconfont">&#xe6dc;</i> 考情汇总</Link>
                </li>
            </ul>
        );
    }
}

export default connect(
    null,
    { changeBread }
  )(NavigationBar);